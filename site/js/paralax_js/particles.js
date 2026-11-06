/**
$(CBI)* ...
$(CBI)* @author gldio
$(CBI)* twitter.com/gldio
$(CBI)* blog.41-29.com
$(CBI)*/

var particles = {
	
	maxCount: 40,
	pArr: [],
		
	setup: function(){
		for(var i=0;i<this.maxCount;i++){
			
			var rdata = this.getRandomData();
			
			var tmpitm = new customImage();
			tmpitm.setup(i, IMG_DIR + "particle.png", rdata.x, rdata.y, rdata.scale, rdata.scale, 0, 0, null);
			
			this.pArr.push([tmpitm,rdata]);
		}
	},
	
	getRandomData: function(){
		 
		var tscale = (Math.random() * .85) + .15;
		var tx = (Math.random() * glb_canvas.width); 
		var ty = (Math.random() * glb_canvas.height);
		
		var talpha = tscale;
		var speed = tscale * .5;
		var life = Math.round((Math.random() * 1) + 1) * GLOBAL_FPS;
		var movespeed = tscale * Math.round((Math.random() * 2) - 1);
		
		var gx = (Math.random() * 50);
		var gy = (Math.random() * 20);
		
		return {x:tx, y:ty, scale:tscale, alpha:talpha, gx:gx, gy:gy, speed:speed, life:life, movespeed:movespeed};
	},
	
	//////////////
	update: function(_dType){

		var tmpdirection = glb_direction * (arguments.length==2?arguments[1]:1);
		
		var starti = _dType==1?Math.round(this.maxCount*.4):0;
		var lasti = _dType==1?this.pArr.length:Math.round(this.maxCount*.4);
		
		for(var i=starti;i<lasti;i++){
			var tmpitm = this.pArr[i][0];
			var rdata = this.pArr[i][1];
			var prevX = tmpitm.x;
			
			if((rdata.life == 0 && tmpitm.alpha <= 0) || (tmpitm.x < 0 || tmpitm.x > glb_canvas.width)){
				rdata = this.getRandomData();
				tmpitm.x = rdata.x;
				tmpitm.y = rdata.y;
				tmpitm.setScale(rdata.scale * (_dType==1?1:1.35), rdata.scale * (_dType==1?.5:1));
				tmpitm.setAlpha(0);
			}else if(rdata.life > 0) rdata.life--;
			
			this.pArr[i][1] = rdata;
			
			tmpitm.x -= rdata.movespeed;
			tmpitm.y -= rdata.movespeed * .5;
			
			tmpitm.x -= tmpdirection * 5 * (_dType==1?.5:1);
			
			var alpha = tmpitm.alpha;
			alpha -= (alpha - (rdata.life == 0?-.1:rdata.alpha)) * rdata.speed;
			tmpitm.setAlpha(alpha);
			
			tmpitm.draw(0,0);
			
			var tmpa = Math.abs(tmpitm.alpha * tmpdirection * .2);
			
			for(var k=0;k<10;k++){
				var tmpadd = (10 - k) * .2;
				tmpitm.setAlpha(tmpa * tmpadd);
				
				tmpadd = k * .5;
				tmpitm.draw(tmpdirection * tmpadd, 0);
			}
			
			tmpitm.setAlpha(alpha);
		}
	}
};