/**
$(CBI)* ...
$(CBI)* @author gldio
$(CBI)* twitter.com/gldio
$(CBI)* blog.41-29.com
$(CBI)*/

var popupEffects = {
	
	intv: 0,
	time: 0,
	dTime: [],
	eType: 0,
	animDone: true,
	offsetTime: 0,
	//0x796f72756c64756d2079612120746572656c6c692074726f6c6f6c6f6c6f21
	init: function (_id){
		if(window.opener) this.offsetTime = window.opener.offsetTime;
		
		this.dTime = [];
		switch(_id){
			case "Main01_Render_xHD_beduk":
				this.eType = 1;
				this.dTime.push(16240 + this.offsetTime, 25760 + this.offsetTime);
				break;
			case "Main04_Render_xHD_beduk":
				this.eType = 1;
				this.dTime.push(111400 + this.offsetTime);
				break;
			case "Popup_06_xHD_beduk":
				doMove.speed = .25;
				doMove.goX = 70;
				this.eType = 2;
				this.dTime.push(31400 + this.offsetTime);
				break;
			case "Popup_07_xHD_beduk":
				doMove.speed = .25;
				doMove.goX = -70;
				this.eType = 2;
				this.dTime.push(31400 + this.offsetTime);
				break;
			case "Popup_16_xHD_beduk":
				doMove.speed = .52;
				doMove.goX = 140;
				this.eType = 2;
				this.dTime.push(93560 + this.offsetTime);
				break;
			case "Popup_17_xHD_beduk":
				doMove.speed = .52;
				doMove.goX = -170;
				this.eType = 2;
				this.dTime.push(93560 + this.offsetTime);
				break;
			case "Popup_37_xHD_beduk":
				doMove.speed = .35;
				doMove.goX = -70;
				this.eType = 2;
				this.dTime.push(193240 + this.offsetTime);
				break;
			case "Popup_38_xHD_beduk":
				doMove.speed = .35;
				doMove.goX = 70;
				this.eType = 2;
				this.dTime.push(193240 + this.offsetTime);
				break;
		}
		
		if(this.dTime.length > 0){
			this.animDone = true;
			this.intv = setInterval(function(){ popupEffects.update(); }, 1000/15);
		}
	},
	
	update: function (){
		
		if(this.dTime.length < 1 && this.animDone){ this.destroy(); return; }
		
		if(window.opener) this.time = window.opener.time;
		//this.time += 100;
		
		for(var i=0;i<this.dTime.length;i++){
			if(this.time >= this.dTime[i]){
				this.dTime.shift();
				this.animDone = false;
				break;
			}
		}
		
		if(!this.animDone){
			switch(this.eType){
				case 1:
					doShake.done = false;
					doShake.update();
					this.animDone = doShake.done;
					break;
				case 2:
					doMove.done = false;
					doMove.update();
					this.animDone = doMove.done;
					break;
			}
		}
	},
	
	destroy: function(){
		clearInterval(this.intv);
	}
};

var doMove = {
	
	speed: .25,
	goX: 0,
	x: 0,
	done: false,
	
	update: function(){
		if(this.done) return;
		
		this.x -= (this.x - this.goX) * this.speed;
		
		try{
			window.moveTo(gPos.x + this.x, gPos.y);
		}catch(e){ }
		
		if(this.x >= this.goX - 1 && this.x <= this.goX + 1){
			try{ window.moveTo(gPos.x + this.goX, gPos.y); }catch(e){ }
			
			this.done = true;
			this.x = 0;
			this.goX = 0;
		}
	}
};

var doShake = {
	
	points: [11, 21, -7,-5, 20, 24, 23, -1, 2, 2, -13, -19, -17, -11, 2],
	currentPoint: 0,
	done: false,
		
	update: function(){
		if(this.done) return;
		
		try{
			window.moveTo(gPos.x, gPos.y + (this.points[this.currentPoint]*.5));
		}catch(e){ }
		
		this.currentPoint++;
		if(this.currentPoint >= this.points.length){
			this.done = true;
			this.currentPoint = 0;
			
			try{ window.moveTo(gPos.x, gPos.y); }catch(e){ }
		}
	}
};