# Disco Breaker (2011), restored

**Disco Breaker** was Bedük × Internet Explorer 9's HTML5 music-video experience ("Türkiye'nin ilk HTML5 klibi"), live at discobreaker.com in 2011–2013. The site opened dozens of real browser popups and moved them across your desktop in time with the song. Modern browsers block all of that, and most of its media was never archived, so the site can't be visited today.

This repo is a restoration that runs again, as a portable desktop app or in any modern browser.

## Download

Get the latest build from [Releases](../../releases). Nothing needs installing:

| Platform | File | Run |
|---|---|---|
| Windows 10/11 | `DiscoBreaker-windows-x64.zip` | Unzip, double-click `Disco Breaker.exe`. SmartScreen may warn about an unknown publisher: *More info → Run anyway*. |
| macOS | `DiscoBreaker-macOS.zip` | Unzip, then right-click `Disco Breaker.app` → *Open* the first time (the app is unsigned). |
| Linux | `DiscoBreaker-linux-x86_64.AppImage` | `chmod +x` it and run it. Some distros need `libfuse2`; otherwise use `--appimage-extract-and-run`. |

The app opens in Turkish; the switch at the bottom of the main page changes it to English.

## What was restored, and how

- **Site shell:** HTML, CSS, scripts, fonts and images mirrored from the Wayback Machine (snapshot of 2012-01-10).
- **Popups:** the original popups are now in-page windows, driven by the site's own cue table (`site/js/index.js`) and its ported shake, slide and logo-growth effects (`site/js/stage.js`).
- **Video and song:** the official *Bedük – Disco Breaker* TV-edit music video, with the 2.76 s intro that the TV edit lacks restored from a [screen recording of the original site](https://www.youtube.com/watch?v=P_JgvFzlqQ0). The intro audio is aligned to the sample.
- **Lost canvas scenes** (logo animation, crowd intro, friends' faces, 360° dance floor): their art was never archived, so those windows play the matching region of that screen recording, time-synced (`site/media/scenes.mp4`).
- **Popup lifetimes:** measured frame by frame from the recording.
- **Stand-ins:** Bedük's home-screen layer and the English home-screen buttons were recreated from surviving art.

Known gaps: Facebook login is gone, so the guest path is used. The TV edit is about 35 s shorter than the original song, so the last few popups never appear.

## Run in a browser

```sh
python3 serve.py        # http://127.0.0.1:8765/  (serves site/ with HTTP Range support)
```

## Build

- **Linux AppImage and Windows zip:** `app/build.sh` (needs Docker; builds on Ubuntu 22.04 and cross-compiles Windows).
- **All three platforms on GitHub:** push a `v*` tag; `.github/workflows/build.yml` builds them and attaches them to the release.
- The app (`app/src-tauri`) is a small [Tauri 2](https://tauri.app) program. It serves `site/` over `127.0.0.1` with HTTP Range support, because the webviews' built-in file protocols can't seek `<video>`. It doesn't contact the network.
- Media files are stored with Git LFS.

## Rights

Disco Breaker, its artwork and its code © Microsoft 2011. The song and music video © Bedük. This is an unofficial, non-commercial preservation project. If you are a rights holder and want something changed or removed, please open an issue.
