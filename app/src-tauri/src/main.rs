// Disco Breaker desktop app: serves the bundled `site/` folder over 127.0.0.1 with HTTP
// Range support and opens it in a native webview. Tauri's built-in asset protocol can't
// seek <video> on WebKit (Linux/macOS), a plain localhost origin can.
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::{
    fs::File,
    io::{BufRead, BufReader, Read, Seek, SeekFrom, Write},
    net::{TcpListener, TcpStream},
    path::{Path, PathBuf},
    thread,
};
use tauri::Manager;

// Fixed port so the origin (and the volume saved in localStorage) survives restarts.
const PORT: u16 = 47823;

fn mime(p: &Path) -> &'static str {
    match p.extension().and_then(|e| e.to_str()).unwrap_or("") {
        "html" => "text/html; charset=utf-8",
        "js" => "text/javascript",
        "css" => "text/css",
        "png" => "image/png",
        "jpg" | "jpeg" => "image/jpeg",
        "gif" => "image/gif",
        "ico" => "image/x-icon",
        "mp4" => "video/mp4",
        "woff" => "font/woff",
        "ttf" => "font/ttf",
        "eot" => "application/vnd.ms-fontobject",
        "svg" => "image/svg+xml",
        _ => "application/octet-stream",
    }
}

fn handle(mut s: TcpStream, root: PathBuf) {
    let Ok(clone) = s.try_clone() else { return };
    let mut r = BufReader::new(clone);
    loop {
        let mut line = String::new();
        if r.read_line(&mut line).unwrap_or(0) == 0 { return; }
        let mut parts = line.split_whitespace();
        let (method, target) = (parts.next().unwrap_or("").to_string(), parts.next().unwrap_or("/").to_string());
        let mut range = None;
        loop {
            let mut h = String::new();
            if r.read_line(&mut h).unwrap_or(0) == 0 { return; }
            let h = h.trim_end();
            if h.is_empty() { break; }
            if let Some(v) = h.to_ascii_lowercase().strip_prefix("range: bytes=") { range = Some(v.to_string()); }
        }
        let path = target.split('?').next().unwrap_or("/");
        let rel = match path.trim_start_matches('/') { "" => "index.html", p => p };
        let rel = rel.replace("%20", " ");
        if rel.contains("..") || (method != "GET" && method != "HEAD") {
            if s.write_all(b"HTTP/1.1 403 Forbidden\r\nContent-Length: 0\r\n\r\n").is_err() { return; }
            continue;
        }
        let fp = root.join(&rel);
        let Ok(mut f) = File::open(&fp) else {
            if s.write_all(b"HTTP/1.1 404 Not Found\r\nContent-Length: 0\r\n\r\n").is_err() { return; }
            continue;
        };
        let size = f.metadata().map(|m| m.len()).unwrap_or(0);
        let (start, end, status) = match range.as_deref().and_then(|v| v.split_once('-')) {
            Some((a, b)) => {
                let (a, b) = if a.is_empty() {
                    (size.saturating_sub(b.parse().unwrap_or(0)), size.saturating_sub(1))
                } else {
                    (a.parse().unwrap_or(0), b.parse().unwrap_or(size.saturating_sub(1)).min(size.saturating_sub(1)))
                };
                if a >= size || a > b {
                    let _ = write!(s, "HTTP/1.1 416 Range Not Satisfiable\r\nContent-Range: bytes */{size}\r\nContent-Length: 0\r\n\r\n");
                    continue;
                }
                (a, b, "206 Partial Content")
            }
            None => (0, size.saturating_sub(1), "200 OK"),
        };
        let len = if size == 0 { 0 } else { end - start + 1 };
        let mut hdr = format!(
            "HTTP/1.1 {status}\r\nContent-Type: {}\r\nContent-Length: {len}\r\nAccept-Ranges: bytes\r\nCache-Control: no-cache\r\n",
            mime(&fp)
        );
        if status.starts_with("206") { hdr += &format!("Content-Range: bytes {start}-{end}/{size}\r\n"); }
        hdr += "\r\n";
        if s.write_all(hdr.as_bytes()).is_err() { return; }
        if method == "HEAD" { continue; }
        if f.seek(SeekFrom::Start(start)).is_err() { return; }
        if std::io::copy(&mut f.take(len), &mut s).is_err() { return; } // client aborted: normal when seeking
    }
}

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            let root = app.path().resource_dir()?.join("site");
            // Bind only to loopback; fall back to any free port if ours is taken.
            let l = TcpListener::bind(("127.0.0.1", PORT)).or_else(|_| TcpListener::bind("127.0.0.1:0"))?;
            let port = l.local_addr()?.port();
            thread::spawn(move || {
                for s in l.incoming().flatten() {
                    let root = root.clone();
                    thread::spawn(move || handle(s, root));
                }
            });
            let url = format!("http://127.0.0.1:{port}/index.html").parse()?;
            // Native fullscreen from launch. The page must not use the HTML fullscreen API here:
            // WebKitGTK's element-fullscreen path aborts the app process on Wayland.
            tauri::WebviewWindowBuilder::new(app, "main", tauri::WebviewUrl::External(url))
                .title("Disco Breaker")
                .inner_size(1366.0, 768.0)
                .fullscreen(true)
                .initialization_script("window.__DISCO_APP__ = true;")
                .build()?;
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("failed to start Disco Breaker");
}
