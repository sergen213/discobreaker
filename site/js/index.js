var sr = screen.width < 1500,
	 offsetTime = 2930,//3150,
	 windows = [
		 { x: 0, y: 0, w: screen.width, h: screen.height, type: "bg", cue: 0 },
		 { x: -666, y: -666, w: 254, h: 104, type: "controller", cue: 0 },
		 { x: 640, y: 360, w: 234, h: 114, type: "parallax", cue: -(offsetTime - 10), endtime: 14280 },
		 { x: 640, y: 360, w: 900, h: 400, type: "parallax360", cue: 75160, endtime: 94160 },
		 { x: 198, y: 600, w: 364, h: 186, type: "parallax360ek", cue: 75160 },
		 { x: 1100, y: 557, w: 400, h: 178, type: "video", video: "Popup_01_xHD_beduk", cue: 11240 },
		 { x: 640, y: 360, w: 752, h: 400, type: "video", video: "Main01_Render_xHD_beduk", cue: 14280 },
		 { x: 1014, y: 365, w: 320, h: 150, type: "video", video: "Popup_03_xHD_beduk", cue: 17360 },
		 { x: 1014, y: 198, w: 320, h: 150, type: "video", video: "Popup_02_xHD_beduk", cue: 16440 },
		 { x: 1014, y: 361, w: 368, h: 128, type: "video", video: "Popup_04_xHD_beduk", cue: 21200 },
		 { x: 1014, y: 553, w: 368, h: 194, type: "video", video: "Popup_05_xHD_beduk", cue: 21680, offset: 1 },
		 { x: 796, y: 360, w: 304, h: 400, type: "video", video: "Popup_06_xHD_beduk", cue: 31400 },
		 { x: 484, y: 360, w: 304, h: 400, type: "video", video: "Popup_07_xHD_beduk", cue: 31400 },
		 { x: 632, y: 360, w: 240, h: 416, type: "video", video: "Popup_08_xHD_beduk", cue: 32600 },
		 { x: 640, y: 360, w: 752, h: 400, type: "video", video: "Main02_Render_xHD_beduk", cue: 32960, offset: 1 },
		 { x: 344, y: 140, w: 400, h: 156, type: "video", video: "Popup_09_xHD_beduk", cue: 34480 },
		 { x: 945, y: 140, w: 400, h: 156, type: "video", video: "Popup_10_xHD_beduk", cue: 35040 },
		 { x: 1028, y: 544, w: 352, h: 188, type: "video", video: "Popup_11_xHD_beduk", cue: 46720 },
		 { x: 1028, y: 204, w: 352, h: 188, type: "video", video: "Popup_12_xHD_beduk", cue: 50400 },
		 { x: 176, y: 360, w: 240, h: 368, type: "video", video: "Popup_13_xHD_beduk", cue: 55520 },
		 { x: 1108, y: 360, w: 240, h: 368, type: "video", video: "Popup_14_xHD_beduk", cue: 56520 },
		 { x: 301, y: 157, w: 416, h: 150, type: "video", video: "Popup_15_xHD_beduk", cue: 63240 },
		 { x: 704, y: 541, w: 234, h: 114, type: "faces", id: "f1", cue: 64800, offset: 5.4, seq: { ela: [[3, 68800, 0]], beduk: { f1: [67480, 69320], f2: [69320] }, video: 71200} },
		 { x: 765, y: 420, w: 360 + 234, h: 114, type: "faces", id: "f2", cue: 64920, offset: 4.8, seq: { ela: [[2, 68360, 0], [4, 67680, 360]], beduk: { f2: [69320], f3: [65600, 67480, 69320], f5: [67480, 69320] }, video: 71200} },
		 { x: 645, y: 298, w: 240 + 240 + 354, h: 114, type: "faces", id: "f3", cue: 65120, offset: 4.0, seq: { ela: [[3, 66880, 480], [2, 66320, 0]], beduk: { f1: [69320], f2: [67480, 69320], f3: [67480, 69320], f4: [69320], f6: [69320], f7: [69320] }, video: 71200} },
		 { x: 704, y: 179, w: 240 + 234, h: 114, type: "faces", id: "f4", cue: 65400, offset: 3.2, seq: { ela: [[1, 65800, 0]], beduk: { f1: [69320], f3: [69320], f4: [67480, 69320] }, video: 71200} },
		 { x: 640, y: 360, w: 900, h: 400, type: "video", video: "Main03_Render_xHD_beduk", cue: 71640, offset: 14 },
		 { x: 183, y: 363, w: 240, h: 464, type: "video", video: "Popup_16_xHD_beduk", cue: 93560 },
		 { x: 1099, y: 363, w: 240, h: 464, type: "video", video: "Popup_17_xHD_beduk", cue: 93560 },
		 { x: 640, y: 360, w: 752, h: 400, type: "video", video: "Main04_Render_xHD_beduk", cue: 94160, offset: 2 },
		 { x: 634, y: 110, w: 416, h: 166, type: "video", video: "Popup_18_xHD_beduk", cue: 96360 },
		 { x: 644, y: 360, w: 272, h: 400, type: "video", video: "Popup_19_xHD_beduk", cue: 100320 },
		 { x: sr ? 1014 : 288, y: 535, w: 352, h: 192, type: "video", video: "Popup_20_xHD_beduk", cue: 104680 },
		 { x: sr ? 650 : 288, y: sr ? 648 : 564, w: 400, h: 164, type: "video", video: "Popup_21_xHD_beduk", cue: 108680 },
		 { x: sr ? 163 : 298, y: sr ? 358 : 555, w: 384, h: 208, type: "video", video: "Popup_22_xHD_beduk", cue: 115640 },
		 { x: 1012, y: 184, w: 384, h: 174, type: "video", video: "Popup_23_xHD_beduk", cue: 119120 },
		 { x: 1012, y: 184, w: 384, h: 180, type: "video", video: "Popup_24_xHD_beduk", cue: 119880 },
		 { x: 991, y: 552, w: 384, h: 180, type: "video", video: "Popup_25_xHD_beduk", cue: 122440 },
		 { x: 1024, y: 200, w: 368, h: 162, type: "video", video: "Popup_26_xHD_beduk", cue: 127720 },
		 { x: 1024, y: 380, w: 368, h: 164, type: "video", video: "Popup_27_xHD_beduk", cue: 131760, offset: 5 },
		 { x: 1024, y: 558, w: 368, h: 164, type: "video", video: "Popup_28_xHD_beduk", cue: 132800, offset: 7 },
		 { x: 1007, y: 539, w: 400, h: 176, type: "video", video: "Popup_30_xHD_beduk", cue: 136080 },
		 { x: 1007, y: 173, w: 400, h: 176, type: "video", video: "Popup_29_xHD_beduk", cue: 138560 },
		 { x: sr ? 149 : 261, y: sr ? 369 : 547, w: 352, h: 182, type: "video", video: "Popup_31_xHD_beduk", cue: 147760 },
		 { x: 983, y: 190, w: 352, h: 140, type: "video", video: "Popup_32_xHD_beduk", cue: 156120 },
		 { x: 983, y: 344, w: 352, h: 140, type: "video", video: "Popup_33_xHD_beduk", cue: 156120, offset: 1 },
		 { x: sr ? 163 : 1003, y: sr ? 364 : 546, w: 384, h: 170, type: "video", video: "Popup_34_xHD_beduk", cue: 162880 },
		 { x: sr ? 1115 : 274, y: sr ? 364 : 544, w: 384, h: 170, type: "video", video: "Popup_35_xHD_beduk", cue: 163840 },
		 { x: 640, y: 360, w: 752, h: 400, type: "video", video: "Main05_Render_xHD_beduk", cue: 167760 },
		 { x: 1013, y: 539, w: 384, h: 170, type: "video", video: "Popup_36_xHD_beduk", cue: 184480 },
		 { x: 365, y: 360, w: 240, h: 432, type: "video", video: "Popup_37_xHD_beduk", cue: 193240 },
		 { x: 915, y: 360, w: 240, h: 432, type: "video", video: "Popup_38_xHD_beduk", cue: 193240 },
		 { x: 979, y: sr ? 337 : 357, w: 240, h: 432, type: "video", video: "Popup_39_xHD_beduk", cue: 198680 },
		 { x: 304, y: sr ? 337 : 360, w: 240, h: 432, type: "video", video: "Popup_40_xHD_beduk", cue: 198680 },
		 { x: sr ? 1131 : 291, y: sr ? 594 : 548, w: 304, h: 144, type: "video", video: "Popup_41_xHD_beduk", cue: 202160 },
		 { x: sr ? 1131 : 291, y: sr ? 436 : 390, w: 304, h: 144, type: "video", video: "Popup_42_xHD_beduk", cue: 203080 },
		 { x: 1009, y: 525, w: 400, h: 208, type: "video", video: "Popup_43_xHD_beduk", cue: 210120 }
	];




function start() {
	// Facebook login (app 297444666951490) is long dead: both buttons use the guest path.
	startLoading();
}

function startLoading() {
	indexCV.pauseUpdate();

	(new fadeElement()).fade(document.getElementById("home"), 1, 0, function () {
		(new fadeElement()).fade(document.getElementById("loading"), 0, 1, function () {
			stage.prepare(function () {
				(new fadeElement()).fade(document.getElementById("loader_canvas"), 1, 0, function () {
					(new fadeElement()).fade(document.getElementById("btn_basla"), 0, 1, function () {
						document.getElementById("btn_basla").onclick = initController;
					});
				});
			});
		});
	});
}

function initController() {
	document.getElementById("btn_basla").style.display = "none";
	stage.start();
}



var loadImages = function (callback) {
    var images = ["blank.png", "btn_basla.png", "btn_devamet.png", "btn_dlie9.png", "full_bg.jpg", "home_bg.jpg", "ie9.png", "loader.gif", "loader.png", "loading_bg.jpg", "loading_txt.png", "navbtn_durdur.png", "navbtn_kapat.png", "navbtn_oynat.png", "navbtn_sep.png", "navbtn_sesac.png", "navbtn_seskapat.png", "prlx_beduk.png", "prlx_crowd.png", "prlx_ela.png", "prlx_lens1.png", "prlx_lens2.png", "prlx_lens3.png", "prlx_light.png", "prlx_login_fb.png", "prlx_login_fb_over.png", "prlx_login_nofb.png", "prlx_login_nofb_over.png", "prlx_logo.png", "sep_rabbithole.png", "share_fb.png", "share_tw.png", "warning_bg.jpg", "warning_txt_bg.jpg", "preview1.jpg", "preview2.jpg", "preview3.jpg", "end_bg.jpg", "end_txt.png", "aero_busy_l.gif", "aero_busy_xl.gif"];
	if (lang_en)
		images = images.concat(["btn_basla_en.png", "btn_devamet_en.png", "btn_dlie9_en.png", "ie9_en.png", "loading_txt_en.png", "navbtn_durdur_en.png", "navbtn_kapat_en.png", "navbtn_oynat_en.png", "navbtn_sesac_en.png", "navbtn_seskapat_en.png", "prlx_login_fb_en.png", "prlx_login_fb_over_en.png", "prlx_login_nofb_en.png", "prlx_login_nofb_over_en.png", "end_txt_en.png"]);
	for (var i = 0, c = 0, l = images.length; i < l; i++) {
		var img = document.createElement("img");
		img.src = "img/" + images[i];
		img.onload = img.onerror = function () { // some assets were never archived; don't hang on them
			c++;
			if (c >= l) callback();
		};
	}
}


function controlPopup() {
	// Popups are emulated in-page now, so the popup-blocker probe is skipped.
	popupSuccess();
}


function popupSuccess() {
	var refresh = document.referrer == window.location.href;

	if (getBrowser().ie || refresh) {
		showHome();
	} else {
		showWarning("not_ie");
	}
}

function showWarning(id) {
	document.getElementById("warning").style.display = "block";
	(new fadeElement()).fade(document.getElementById(id), 0, 1);
	if (id == "not_ie") {
		document.getElementById("btn_devamet").onclick = function () {
			(new fadeElement()).fade(document.getElementById("warning"), 1, 0, function () {
				(new fadeElement()).fade(document.getElementById("home"), 0, 1, function () {
					showHome();
				});
			});
		};
	}
}


function showHome() {
	document.getElementById("home").style.display = "block";
	var fb = document.getElementById("login_fb");
	fb.onclick = function () { start(true); };
	fb.onmouseover = function () { indexCV.buttonFBOver(); };
	fb.onmouseout = function () { indexCV.buttonFBOut(); };
	var nofb = document.getElementById("login_nofb");
	nofb.onclick = function () { start(); };
	nofb.onmouseover = function () { indexCV.buttonNoFBOver(); };
	nofb.onmouseout = function () { indexCV.buttonNoFBOut(); };
	indexCV.setup();
}


function showEnd() {
	document.getElementById("footer").style.display = "none";
	document.getElementById("ie9").style.display = "none";
	(new fadeElement()).fade(document.getElementById("loading"), 1, 0, function () {
		(new fadeElement()).fade(document.getElementById("end"), 0, 1, function () {
			document.getElementById("btn_home").onclick = function () { window.location = window.location; };
		});
	});
}