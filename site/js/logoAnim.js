var logoAnim = {
		
	intv: 0,
	video: null,
	content: null,
	wWidth: 0,
	wHeight: 0,
	prevW: 0,
	prevH: 0,
	x: 0,
	y: 0,
	timeArr: [{t:480,w:250,h:117}, {t:920,w:270,h:120}, {t:1400,w:285,h:127}, {t:1880,w:300,h:134}, {t:2320,w:390,h:174}, {t:2800,w:500,h:222}, {t:3240,w:625,h:278}, {t:3720,w:900,h:400}],
	//timeArr: [{t:480,w:250,h:117}, {t:920,w:285,h:127}, {t:1400,w:390,h:174}, {t:1880,w:500,h:222}, {t:2320,w:625,h:278}, {t:2800,w:900,h:400}],
		
	init: function(_video){
		this.video = _video;
		this.content = document.getElementById('content');
		
		this.wWidth = this.timeArr[this.timeArr.length-1].w;
		this.wHeight = this.timeArr[this.timeArr.length-1].h;
		
		this.prevW = data.w;
		this.prevH = data.h;
	},
	
	start: function() {
		if(window.opener) this.video.addEventListener("ended", function(){ logoAnim.stop(); paralaxStart(); }, false);
		this.video.play();
		
		this.content.style.marginLeft = ((this.prevW - this.wWidth) * .5) + "px";
		this.content.style.marginTop = ((this.prevH - this.wHeight) * .5) + "px";
		
		this.intv = setInterval(function(){ logoAnim.update(); }, 50);
	},
	
	stop: function(){
		clearInterval(this.intv);
		this.content.removeChild(this.video);
	},
	
	update: function(){
		if(window.opener) this.time = window.opener.time;
		
		for(var i=0;i<this.timeArr.length;i++){
			if(this.time >= this.timeArr[i].t){
				try{
					
					var wDiff = this.timeArr[i].w - this.prevW;
					var hDiff = this.timeArr[i].h - this.prevH;
					
					this.x -= wDiff * .5;
					this.y -= hDiff * .5;
				
					window.resizeBy(wDiff, hDiff);
					window.moveTo(gPos.x + this.x, gPos.y + this.y);
					
					this.content.style.marginLeft = ((this.timeArr[i].w - this.wWidth) * .5) + "px";
					this.content.style.marginTop = ((this.timeArr[i].h - this.wHeight) * .5) + "px";
					
					this.prevW = this.timeArr[i].w;
					this.prevH = this.timeArr[i].h;
					
					this.timeArr.shift();
					
				}catch(e){ }
				return;
			}
		}
	}
};