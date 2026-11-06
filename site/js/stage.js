// Disco Breaker: modern in-page reconstruction of the popup experience.
//
// The 2011 site opened up to 56 real browser popups (popup.html + js/popup.js, never
// archived) and choreographed them with window.moveTo/resizeTo. Browsers block all of
// that today, so every entry of the original cue table (`windows` in index.js) becomes an
// in-page "window". Each window is a canvas that draws from ONE hidden master <video>:
// media/discobreaker.mp4 = the official TV-edit music video with the original 2.76 s
// intro (cut from a screen recording of the 2011 site) prepended, so media time IS the
// original music clock. One decoder keeps every window in sync for free.
//
// Scenes whose art was never archived (logo animation, crowd intro, faces, 360) are drawn
// from media/scenes.mp4: that screen recording (youtube.com/watch?v=P_JgvFzlqQ0), muted and
// trimmed so its time is also the music clock. Each such window shows the pixels the
// recording had at that window's position (REC_* mapping below).
//
// Sync: `?offset=SECONDS` (or the [ and ] keys during playback) shifts the clock if a
// different media file is used.

var stage = {
	REF_W: 1280, REF_H: 720,   // the cue table's coordinates are centres on a 1280x720 screen
	TITLE_H: 22,               // fake window title bar height (px)
	POPUP_LIFE: 3300,          // median popup lifetime measured in the recording (ms), for popups it couldn't measure
	SCENES_END: 98000,         // scenes.mp4 covers music 0..98 s
	REC_S: 0.937, REC_X: 43, REC_Y: 36.5, // recording px = REC_S * (cue-table px + REC_X/Y): a 1366x768 screen scaled to 1280x720
	// Close times (music ms) measured from the recording; popup.js, which decided these, is lost.
	CLOSES: {
		Popup_01: 17800, Popup_02: 23000, Popup_03: 22200, Popup_04: 26900, Popup_05: 26900, Popup_09: 41600, Popup_10: 41100,
		Popup_11: 53800, Popup_13: 62900, Popup_14: 64200, Popup_15: 68900, Popup_20: 109500, Popup_22: 120500, Popup_23: 124300,
		Popup_24: 124300, Popup_25: 128000, Popup_26: 135700, Popup_27: 137200, Popup_28: 137700, Popup_29: 143700, Popup_30: 142900,
		Popup_31: 154400, Popup_32: 161200, Popup_33: 161200, Popup_34: 168400, Popup_35: 170800, Popup_36: 190800, Popup_37: 199000,
		Popup_39: 203800, Popup_40: 203800, Popup_41: 208400, Popup_42: 209000, Popup_43: 216200, Main02: 66200,
		f1: 76100, f2: 76100, f3: 76100, f4: 76800
	},
	SHOWS: { Main03: 76100 }, // in the recording Main03 only appears once the faces windows close
	offset: parseFloat(new URLSearchParams(location.search).get("offset")) || 0,

	media: null, scenes: null, scenesOK: false, root: null, wins: [], layers: {}, raf: 0, spin: 0,
	time: 0, scale: 1, ox: 0, oy: 0, mouseX: 0, mouseY: 0, lastClose: 0, done: false,

	// Shake and slide cues ported from js/popup_effects.js (song ms, before offsetTime).
	SHAKES: { Main01_Render_xHD_beduk: [16240, 25760], Main04_Render_xHD_beduk: [111400] },
	SHAKE_POINTS: [11, 21, -7, -5, 20, 24, 23, -1, 2, 2, -13, -19, -17, -11, 2],
	MOVES: {
		Popup_06_xHD_beduk: { at: 31400, goX: 70, speed: .25 }, Popup_07_xHD_beduk: { at: 31400, goX: -70, speed: .25 },
		Popup_16_xHD_beduk: { at: 93560, goX: 140, speed: .52 }, Popup_17_xHD_beduk: { at: 93560, goX: -170, speed: .52 },
		Popup_37_xHD_beduk: { at: 193240, goX: -70, speed: .35 }, Popup_38_xHD_beduk: { at: 193240, goX: 70, speed: .35 }
	},
	// Logo window growth ported from js/logoAnim.js (raw song ms).
	LOGO_STEPS: [{t:480,w:250,h:117}, {t:920,w:270,h:120}, {t:1400,w:285,h:127}, {t:1880,w:300,h:134}, {t:2320,w:390,h:174}, {t:2800,w:500,h:222}, {t:3240,w:625,h:278}, {t:3720,w:900,h:400}],

	LOAD_TEXTS: {
		tr: ["Lütfen bekleyin, yükleniyor...", "Bu bir Internet Explorer 9 deneyidir.", "Farenizi elinizden bırakmayın.", "Bilgisayarınızın sesini açın, müziğin tadını çıkarın."],
		en: ["Please stay tuned. Loading...", "Disco Breaker is an Internet Explorer 9 Experiment.", "Don't let go of your mouse.", "Juice up the volume and enjoy the music."]
	},

	//////////////  loading screen: get the media, then hand back to index.js
	prepare: function (onReady) {
		["crowd", "ela", "lens1", "lens2", "lens3", "light", "logo"].forEach(function (n) {
			var img = new Image(); img.src = "img/prlx_" + n + ".png"; stage.layers[n] = img;
		});

		var v = this.media = document.createElement("video");
		v.preload = "auto";
		v.playsInline = true;
		var ready = function () {
			v.removeEventListener("canplaythrough", ready);
			cancelAnimationFrame(stage.spin);
			document.getElementById("media_pick").style.display = "none";
			onReady();
		};
		v.addEventListener("canplaythrough", ready);
		v.addEventListener("error", function () { stage.askForFile(); });
		v.src = "media/discobreaker.mp4";
		var sc = this.scenes = document.createElement("video");
		sc.muted = true; sc.preload = "auto"; sc.playsInline = true;
		sc.addEventListener("loadeddata", function () { stage.scenesOK = true; });
		sc.src = "media/scenes.mp4";
		this.spinner();
	},

	askForFile: function () {
		var box = document.getElementById("media_pick");
		box.style.display = "block";
		this.picking = true; // spinner hides its caption so the picker text has room
		box.querySelector("input").onchange = function () {
			if (this.files[0]) stage.media.src = URL.createObjectURL(this.files[0]);
		};
	},

	spinner: function () {
		var cv = document.getElementById("loader_canvas"), ctx = cv.getContext("2d"), img = new Image(), t0 = performance.now();
		var texts = this.LOAD_TEXTS[lang_en ? "en" : "tr"];
		cv.width = 350; cv.height = 171;
		img.src = "img/loader.png";
		(function draw(now) {
			var t = now - t0;
			ctx.clearRect(0, 0, cv.width, cv.height);
			ctx.save(); ctx.translate(175, 32); ctx.rotate(t / 400); ctx.drawImage(img, -img.width / 2, -img.height / 2); ctx.restore();
			ctx.font = "20px DINEngsbekRegular"; ctx.fillStyle = "#fff"; ctx.textAlign = "center";
			ctx.globalAlpha = stage.picking ? 0 : Math.min(1, Math.sin((t % 3000) / 3000 * Math.PI) * 3);
			ctx.fillText(texts[Math.floor(t / 3000) % texts.length], 175, 100);
			ctx.globalAlpha = 1;
			stage.spin = requestAnimationFrame(draw);
		})(t0);
	},

	//////////////  playback (must start from a click: fullscreen + audio need a user gesture)
	start: function () {
		var de = document.documentElement; // the desktop app window is already fullscreen
		if (!window.__DISCO_APP__ && de.requestFullscreen) de.requestFullscreen().catch(function () {});

		var root = this.root = document.createElement("div");
		root.id = "stage";
		root.innerHTML = '<div id="controller"><div id="btn_pause" class="btn"></div><div class="btn_sep"></div>' +
			'<div id="btn_volume" class="btn"></div><input id="volume_slider" type="range" min="0" max="1" step="0.01" />' +
			'<div class="btn_sep"></div><div id="btn_end" class="btn"></div></div><div id="stage_toast"></div>';
		document.body.appendChild(root);

		root.querySelector("#btn_pause").onclick = function () { stage.togglePause(); };
		var muteBtn = root.querySelector("#btn_volume"), slider = root.querySelector("#volume_slider");
		var setMuted = function (m) { stage.media.muted = m; muteBtn.className = m ? "btn up" : "btn"; };
		muteBtn.onclick = function () { setMuted(!stage.media.muted); };
		slider.value = this.media.volume = +(localStorage.getItem("db_volume") || 1);
		slider.oninput = function () {
			stage.media.volume = +this.value;
			localStorage.setItem("db_volume", this.value);
			setMuted(+this.value === 0);
		};
		root.querySelector("#btn_end").onclick = function () { stage.end(); };
		root.addEventListener("mousemove", function (e) {
			stage.mouseX = e.clientX / innerWidth * 2 - 1;
			stage.mouseY = e.clientY / innerHeight * 2 - 1;
		});
		addEventListener("keydown", this.onKey);
		addEventListener("resize", this.layout);

		this.buildWindows();
		this.layout();
		this.media.currentTime = Math.max(0, this.offset);
		this.media.play();
		this.raf = requestAnimationFrame(this.frame);
	},

	buildWindows: function () {
		var off = offsetTime;
		this.wins = windows.slice(2).map(function (d) {
			var el = document.createElement("div");
			el.className = "dbwin";
			el.innerHTML = '<div class="dbwin_title"><span>Disco Breaker</span><i></i></div><canvas></canvas>';
			stage.root.appendChild(el);
			return {
				d: d, el: el, cv: el.querySelector("canvas"), w: d.w, h: d.h, dx: 0, dy: 0, open: false,
				show: stage.SHOWS[stage.key(d)] || d.cue + off,
				close: d.endtime ? d.endtime + off : Infinity,
				main: d.w >= 700
			};
		});
		// popup.js decided when windows closed; it is lost. A window closes when a later
		// one covers more than 30% of it, at its explicit endtime, or after POPUP_LIFE.
		this.wins.forEach(function (a) {
			stage.wins.forEach(function (b) {
				if (b.show > a.show && b.show < a.close && stage.overlap(a.d, b.d) > .3 * a.d.w * a.d.h) a.close = b.show;
			});
			if (!a.main && a.close === Infinity) a.close = a.show + stage.POPUP_LIFE;
			if (stage.CLOSES[stage.key(a.d)]) a.close = stage.CLOSES[stage.key(a.d)];
		});
		this.lastClose = Math.max.apply(null, this.wins.map(function (w) { return w.close === Infinity ? w.show + stage.POPUP_LIFE : w.close; }));
	},

	key: function (d) { return d.id || (d.video || "").replace("_Render", "").replace("_xHD_beduk", ""); },

	// Keep scenes.mp4 on the music clock while a lost scene can be on screen.
	syncScenes: function (t) {
		var sc = this.scenes;
		if (!this.scenesOK || t >= this.SCENES_END) { if (!sc.paused) sc.pause(); return; }
		if (this.media.paused) { if (!sc.paused) sc.pause(); }
		else if (sc.paused) sc.play();
		if (Math.abs(sc.currentTime - t / 1000) > .15) sc.currentTime = Math.max(0, t / 1000);
	},

	overlap: function (a, b) {
		var x = Math.min(a.x + a.w / 2, b.x + b.w / 2) - Math.max(a.x - a.w / 2, b.x - b.w / 2);
		var y = Math.min(a.y + a.h / 2, b.y + b.h / 2) - Math.max(a.y - a.h / 2, b.y - b.h / 2);
		return x > 0 && y > 0 ? x * y : 0;
	},

	layout: function () {
		stage.scale = Math.min(innerWidth / stage.REF_W, (innerHeight - stage.TITLE_H) / stage.REF_H);
		stage.ox = (innerWidth - stage.REF_W * stage.scale) / 2;
		stage.oy = (innerHeight - stage.REF_H * stage.scale) / 2;
		stage.wins.forEach(function (w) { w.placed = null; });
	},

	place: function (w) {
		var s = this.scale, cw = Math.round(w.w * s), ch = Math.round(w.h * s);
		var left = Math.round(this.ox + (w.d.x + w.dx - w.w / 2) * s), top = Math.round(this.oy + (w.d.y + w.dy - w.h / 2) * s);
		var key = left + "," + top + "," + cw + "," + ch;
		if (w.placed === key) return;
		w.placed = key;
		w.el.style.left = left + "px";
		w.el.style.top = (top - this.TITLE_H) + "px";
		w.cv.style.width = cw + "px";
		w.cv.style.height = ch + "px";
		var dpr = Math.min(devicePixelRatio || 1, 2);
		w.cv.width = cw * dpr; w.cv.height = ch * dpr;
	},

	frame: function () {
		var s = stage, t = s.time = (s.media.currentTime - s.offset) * 1000;
		s.syncScenes(t);
		for (var i = 0; i < s.wins.length; i++) {
			var w = s.wins[i], vis = t >= w.show && t < w.close;
			if (vis !== w.open) { w.open = vis; w.el.classList.toggle("open", vis); }
			if (!vis) continue;
			s.effects(w, t);
			s.place(w);
			s.draw(w, t);
		}
		if (t > s.lastClose + 2000 || s.media.ended) { s.end(); return; }
		s.raf = requestAnimationFrame(s.frame);
	},

	effects: function (w, t) {
		var id = w.d.video, off = offsetTime, tick = 1000 / 15; // popup_effects.js ran at 15fps
		if (w.d.type === "parallax") {
			for (var i = 0; i < this.LOGO_STEPS.length && t >= this.LOGO_STEPS[i].t; i++) { w.w = this.LOGO_STEPS[i].w; w.h = this.LOGO_STEPS[i].h; }
		}
		w.dy = 0;
		(this.SHAKES[id] || []).forEach(function (at) {
			var k = Math.floor((t - at - off) / tick);
			if (k >= 0 && k < stage.SHAKE_POINTS.length) w.dy = stage.SHAKE_POINTS[k] * .5;
		});
		var m = this.MOVES[id];
		if (m && t >= m.at + off) w.dx = m.goX * (1 - Math.pow(1 - m.speed, (t - m.at - off) / tick));
	},

	draw: function (w, t) {
		var ctx = w.cv.getContext("2d"), cw = w.cv.width, ch = w.cv.height, v = this.media;
		var vw = v.videoWidth, vh = v.videoHeight;
		ctx.fillStyle = "#000710";
		ctx.fillRect(0, 0, cw, ch);

		if ({ parallax: 1, parallax360: 1, parallax360ek: 1, faces: 1 }[w.d.type] && this.scenesOK && t < this.SCENES_END) {
			var S = this.REC_S, rw = w.w * S, rh = w.h * S;
			ctx.drawImage(this.scenes, S * (w.d.x + w.dx + this.REC_X) - rw / 2, S * (w.d.y + w.dy + this.REC_Y) - rh / 2, rw, rh, 0, 0, cw, ch);
			return;
		}
		// Fallbacks when scenes.mp4 is unavailable.
		if (w.d.type === "parallax" || w.d.type === "parallax360ek") { this.drawLayers(ctx, cw, ch, w.d.type === "parallax", t); return; }
		if (!vw) return; // audio-only file: windows stay dark

		var sx, sy, sw, sh;
		if (w.main || w.d.type === "parallax360") {
			// Main windows show the whole frame; the 360 scene is a wider crop panned by the mouse.
			var zoom = w.d.type === "parallax360" ? 1.5 : 1;
			var c = Math.max(cw / vw, ch / vh) * zoom;
			sw = cw / c; sh = ch / c;
			sx = (vw - sw) / 2 * (1 - (w.d.type === "parallax360" ? this.mouseX : 0));
			sy = (vh - sh) / 2;
		} else {
			// Popups are holes into one full-stage copy of the frame, so together they tile the clip.
			var k = Math.max(this.REF_W / vw, this.REF_H / vh);
			sw = w.w / k; sh = w.h / k;
			sx = (w.d.x + w.dx - w.w / 2 - this.REF_W / 2) / k + vw / 2;
			sy = (w.d.y + w.dy - w.h / 2 - this.REF_H / 2) / k + vh / 2;
		}
		ctx.drawImage(v, sx, sy, sw, sh, 0, 0, cw, ch);
		if (w.d.type === "faces") { // the friends'-faces scene: strobe on the beat instead
			ctx.fillStyle = "rgba(255,255,255," + Math.max(0, Math.sin(t / 120)) * .25 + ")";
			ctx.fillRect(0, 0, cw, ch);
		}
	},

	// Intro logo window and the small 360 companion window, built from the surviving home-screen art.
	drawLayers: function (ctx, cw, ch, logo, t) {
		var L = this.layers, k = ch / 400, mx = this.mouseX, my = this.mouseY;
		var put = function (img, x, y, depth, scale) {
			if (!img.complete || !img.naturalWidth) return;
			var s = k * (scale || 1), iw = img.naturalWidth * s, ih = img.naturalHeight * s;
			ctx.drawImage(img, cw / 2 + (x + mx * depth) * k - iw / 2, ch / 2 + (y + my * depth) * k - ih / 2, iw, ih);
		};
		put(L.crowd, 0, 150, 8);
		put(L.light, -200, 150, 40, .8);
		if (logo) put(L.logo, 0, -20, 15, 1.2);
		else put(L.ela, 0, 40 + Math.sin(t / 230) * 8, 30, .7);
		put(L.lens1, 0, 120, -30);
		put(L.lens2, 60, 90, -90);
		put(L.lens3, -50, 60, -60);
	},

	togglePause: function () {
		var v = this.media;
		if (v.paused) v.play(); else v.pause();
		this.root.querySelector("#btn_pause").className = v.paused ? "btn play" : "btn";
	},

	onKey: function (e) {
		if (e.key === "[" || e.key === "]") {
			stage.offset = Math.max(0, stage.offset + (e.key === "]" ? .1 : -.1));
			var el = document.getElementById("stage_toast");
			el.textContent = lang_en ? "Sync offset: " + stage.offset.toFixed(1) + " s"
				: "Senkron kayması: " + stage.offset.toFixed(1).replace(".", ",") + " sn";
			el.style.opacity = 1;
			clearTimeout(stage.toastT);
			stage.toastT = setTimeout(function () { el.style.opacity = 0; }, 2500);
		} else if (e.key === " ") {
			e.preventDefault();
			stage.togglePause();
		}
	},

	end: function () {
		if (this.done) return;
		this.done = true;
		cancelAnimationFrame(this.raf);
		this.media.pause();
		this.scenes.pause();
		removeEventListener("keydown", this.onKey);
		removeEventListener("resize", this.layout);
		if (document.fullscreenElement) document.exitFullscreen().catch(function () {});
		this.root.remove();
		showEnd();
	}
};
