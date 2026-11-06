/**
$(CBI)* ...
$(CBI)* @author gldio
$(CBI)* twitter.com/gldio
$(CBI)* blog.41-29.com
$(CBI)*/

var TYPE_IMAGE = 1; // customImage.js needs it; it used to come from paralax_js/paralax.js
var glb_canvas = null;
var glb_context = null;

var indexCV = {

	FPS: 1000 / 25,
	intv: 0,
	loading: true,
	loadItemCount: 0,
	loadedIndex: 0,
	centerX: 0,
	centerY: 0,
	mouseX: 0,
	mouseY: 0,

	beduk: null,
	crowd: null,
	ela: null,
	lens1: null,
	lens2: null,
	lens3: null,
	light: null,
	login_fb: null,
	login_fb_over: null,
	login_nofb: null,
	login_nofb_over: null,
	logo: null,
	justControlLoading: false,

	setup: function () {
		glb_canvas = document.getElementById('home_canvas');
		glb_context = glb_canvas.getContext('2d');

		this.beduk = new customImage();
		this.beduk.setup(++this.loadItemCount, "img/prlx_beduk.png", 0, 0, 1, 1, 0, 1, this.controlLoading); // stand-in: original never archived

		this.crowd = new customImage();
		this.crowd.setup(++this.loadItemCount, "img/prlx_crowd.png", 0, 0, 1, 1, 0, 1, this.controlLoading);

		this.ela = new customImage();
		this.ela.setup(++this.loadItemCount, "img/prlx_ela.png", 0, 0, 1, 1, 0, 1, this.controlLoading);

		this.lens1 = new customImage();
		this.lens1.setup(++this.loadItemCount, "img/prlx_lens1.png", 0, 0, 1, 1, 0, 1, this.controlLoading);

		this.lens2 = new customImage();
		this.lens2.setup(++this.loadItemCount, "img/prlx_lens2.png", 0, 0, 1, 1, 0, 1, this.controlLoading);

		this.lens3 = new customImage();
		this.lens3.setup(++this.loadItemCount, "img/prlx_lens3.png", 0, 0, 1, 1, 0, 1, this.controlLoading);

		this.light = new customImage();
		this.light.setup(++this.loadItemCount, "img/prlx_light.png", 0, 0, 1, 1, 0, 1, this.controlLoading);

		this.login_fb = new customImage();
		this.login_fb.setup(++this.loadItemCount, "img/prlx_login_fb" + (lang_en ? "_en" : "") + ".png", 0, 0, 1, 1, 0, 1, this.controlLoading); // _en art recreated: originals never archived

		this.login_fb_over = new customImage();
		this.login_fb_over.setup(++this.loadItemCount, "img/prlx_login_fb_over" + (lang_en ? "_en" : "") + ".png", 0, 0, 1, 1, 0, 0, this.controlLoading);

		this.login_nofb = new customImage();
		this.login_nofb.setup(++this.loadItemCount, "img/prlx_login_nofb" + (lang_en ? "_en" : "") + ".png", 0, 0, 1, 1, 0, 1, this.controlLoading);

		this.login_nofb_over = new customImage();
		this.login_nofb_over.setup(++this.loadItemCount, "img/prlx_login_nofb_over" + (lang_en ? "_en" : "") + ".png", 0, 0, 1, 1, 0, 0, this.controlLoading);

		this.logo = new customImage();
		this.logo.setup(++this.loadItemCount, "img/prlx_logo.png", 0, 0, 1, 1, 0, 1, this.controlLoading);
	},

	controlLoading: function (_index, _itm) {
		indexCV.loadedIndex++;

		_itm.x = _itm.width * -.5;
		_itm.y = _itm.height * -.5;

		if (indexCV.loadedIndex == indexCV.loadItemCount) {
			indexCV.loading = false;

			window.addEventListener('mousemove', indexCV.onMouseMove, false);
			window.addEventListener('resize', indexCV.onResize, false);

			indexCV.onResize(null);

			indexCV.startUpdate();
		}
	},

	pauseUpdate: function () { clearInterval(this.intv); },
	startUpdate: function () { this.pauseUpdate(); this.intv = setInterval(function () { indexCV.update(); }, this.FPS); },

	onResize: function (e) {
		glb_canvas.width = window.innerWidth;
		glb_canvas.height = window.innerHeight;

		indexCV.centerX = glb_canvas.width * .5;
		indexCV.centerY = glb_canvas.height * .5;
	},

	onMouseMove: function (e) {
		indexCV.mouseX = 1 - (e.clientX / (glb_canvas.width * .5));
		indexCV.mouseY = 1 - (e.clientY / (glb_canvas.height * .5));
	},

	buttonFBOver: function () { this.login_fb.setAlpha(0); this.login_fb_over.setAlpha(1); },
	buttonFBOut: function () { this.login_fb.setAlpha(1); this.login_fb_over.setAlpha(0); },

	buttonNoFBOver: function () { this.login_nofb.setAlpha(0); this.login_nofb_over.setAlpha(1); },
	buttonNoFBOut: function () { this.login_nofb.setAlpha(1); this.login_nofb_over.setAlpha(0); },

	update: function () {
		glb_context.clearRect(0, 0, glb_canvas.width, glb_canvas.height);

		var mx = this.mouseX * -4, my = this.mouseY * -4;

		this.beduk.draw(this.centerX + 10 + mx, this.centerY - 175 + my);

		mx = this.mouseX * 8; my = this.mouseY * 8;
		this.crowd.draw(this.centerX + 15 + mx, this.centerY + 200 + my);

		mx = this.mouseX * 15; my = this.mouseY * 15;
		this.login_fb.draw(this.centerX - 335 + mx, this.centerY + 5 + my);
		this.login_fb_over.draw(this.centerX - 335 + mx, this.centerY + 5 + my);

		this.login_nofb.draw(this.centerX + 335 + mx, this.centerY + 5 + my);
		this.login_nofb_over.draw(this.centerX + 335 + mx, this.centerY + 5 + my);

		mx = this.mouseX * 20; my = this.mouseY * 20;
		this.logo.draw(this.centerX + mx, this.centerY + my);

		mx = this.mouseX * -30; my = this.mouseY * -30;
		this.lens1.draw(this.centerX + mx, this.centerY + 145 + my);

		mx = this.mouseX * 30; my = this.mouseY * 35;
		this.ela.draw(this.centerX + mx, this.centerY + 135 + my);

		mx = this.mouseX * -100; my = this.mouseY * -100;
		this.lens2.draw(this.centerX + 45 + mx, this.centerY + 120 + my);

		mx = this.mouseX * -60; my = this.mouseY * -60;
		this.lens3.draw(this.centerX - 40 + mx, this.centerY + 90 + my);

		mx = this.mouseX * 60; my = this.mouseY * 40;
		this.light.draw(this.centerX - 405 + mx, this.centerY + 215 + my);
	}
};