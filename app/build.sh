#!/usr/bin/env bash
# Build portable releases into ../dist-release (nothing to install):
#   Linux:   DiscoBreaker-linux-x86_64.AppImage    (chmod +x, run)
#   Windows: DiscoBreaker-windows-x64.zip         (unzip, run "Disco Breaker.exe"; needs the WebView2
#            runtime that ships with Windows 10/11)
# macOS can only be built on a Mac: see .github/workflows/build.yml.
set -euo pipefail
root="$(cd "$(dirname "$0")/.." && pwd)"
docker build -t discobreaker-builder "$root/app/build"
docker run --rm -v "$root:/work" -v discobreaker-cargo:/opt/cargo/registry -v discobreaker-xwin:/root/.cache \
  -e CARGO_TARGET_DIR=/work/app/src-tauri/target-docker -e NO_STRIP=true -e HOST_UID="$(id -u):$(id -g)" \
  discobreaker-builder bash -c '
    trap "chown -R $HOST_UID /work/app/src-tauri/target-docker /work/dist-release 2>/dev/null" EXIT
    set -e
    out=/work/dist-release; rm -rf $out; mkdir -p $out
    cargo tauri build --bundles appimage
    cp target-docker/release/bundle/appimage/*.AppImage $out/DiscoBreaker-linux-x86_64.AppImage
    # Windows: the app finds site/ next to its exe, so a folder zip is the whole release.
    cargo tauri build --runner cargo-xwin --target x86_64-pc-windows-msvc --no-bundle
    pkg=/tmp/win/"Disco Breaker"; rm -rf /tmp/win; mkdir -p "$pkg"
    cp target-docker/x86_64-pc-windows-msvc/release/disco-breaker.exe "$pkg/Disco Breaker.exe"
    cp -r /work/site "$pkg/site"
    (cd /tmp/win && zip -qr -0 $out/DiscoBreaker-windows-x64.zip "Disco Breaker")
  '
ls -la "$root/dist-release"
