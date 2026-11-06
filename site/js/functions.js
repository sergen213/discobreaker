
Array.prototype.shuffle = function () {
	for (var j, x, o = this, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	return o;
};


function debug(text) {
	//document.getElementById("debug").innerHTML += text + "<br />";
}


function fadeElement() {
	this.el = null;
	this.valF = 0;
	this.valT = 0;
	this.intv = 0;
	this.rFunc = null;
	this.speed = 20;
	var myself = null;

	this.fade = function (el, valF, valT, rFunc) {
		el.style.display = "block";
		myself = this;
		this.el = el;
		this.valF = valF * 100;
		this.valT = valT * 100;
		this.rFunc = rFunc;
		this.speed *= this.valF < this.valT ? 1 : -1;
		this.intv = setInterval(this.fadeIntv, 50);
		this.fadeIntv();
	};

	this.fadeIntv = function () {

		if (typeof document.createElement("div").style.opacity != 'undefined')
			myself.el.style.opacity = myself.valF * .01;
		else
			myself.el.style.filter = "alpha(opacity=" + myself.valF + ")";

		if (myself.valF == myself.valT) {
			clearInterval(myself.intv);
			if (myself.valT == 0) myself.el.style.display = "none";
			if (myself.rFunc) myself.rFunc();
			return;
		}

		myself.valF += myself.speed;
	};
}


function isCanvasSupported() {
	var el = document.getElementsByTagName("canvas")[0];
	return !!(el.getContext && el.getContext("2d"));
}


function getBrowser() {
	return {
		ie: /MSIE (\d+\.\d+);/.test(navigator.userAgent) && Number(RegExp.$1) >= 9,
		firefox: /Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent) && Number(RegExp.$1) >= 4,
		chrome: /Chrome[\/\s](\d+\.\d+)/.test(navigator.userAgent) && Number(RegExp.$1) >= 12,
		safari: /Safari[\/\s](\d+\.\d+)/.test(navigator.userAgent) && /Version[\/\s](\d+\.\d+)/.test(navigator.userAgent) && Number(RegExp.$1) >= 5,
		opera: /Opera[\/\s](\d+\.\d+)/.test(navigator.userAgent) && Number(RegExp.$1) >= 11
	};
}


function trackEvent(cat, act) {
	_gaq.push(['_trackEvent', cat, act]);
}


var share_url = "http://www.discobreaker.com/";

function shareFB(footer) {
	window.open("https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(share_url + (lang_en ? "?l=en" : "")), "", "width=600,height=400,resizable=1");
}

function shareTW(footer) {
	var txt = lang_en ? "Bedük and Internet Explorer 9 shook hands for a unique experience, Turkey's first HTML5 music video!" : "Bedük ve Internet Explorer 9 birleşti, Türkiye'nin ilk HTML5 klibiyle benzersiz bir deneyim yarattı!";
	window.open("http://twitter.com/intent/tweet?text=" + encodeURIComponent(txt + " " + share_url + (lang_en ? "?l=en" : "") + " #discobreaker"), "", "width=500,height=350,resizable=1");
	_gaq.push(["_trackSocial", "twitter", "share_tw " + (footer ? "footer" : "end")]);
}

function downloadIE9() {
    _gaq.push(['_trackEvent', 'External', 'IE9 Download']);
    window.open("http://www.webinguzelligi.com/download");
}