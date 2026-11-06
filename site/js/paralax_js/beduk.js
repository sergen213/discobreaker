/**
$(CBI)* ...
$(CBI)* @author gldio
$(CBI)* twitter.com/gldio
$(CBI)* blog.41-29.com
$(CBI)*/

var beduk = {
	
	animArr: [[],[],[],[]],
	
	currentFrame: 0,
	maxFrame: 12,
	currentAnim: null,
	currentAnimX: 0,
	animType: 0,
	loadItemCount:0,
	loadedIndex:-1,
	loading:true,
	metronomTime: 0,
	speed: 2.25,
	
	direction: 0,
	waitAnimMouse: 0,
	waitAnimMouseMax: 20,
	directionM: 0,
	directionMSpeed: .05,
	
	justControlLoading: false,
	
	setup: function(){
		this.loadItems();
	},
	
	getTotalLoadItem: function(){ return this.animArr.length * this.maxFrame; },
	
	loadItems: function(){
		this.justControlLoading = arguments.length<1?false:arguments[0];
		
		this.loadedIndex = 0;
		this.loadItemCount = 0;
		for(var j=0;j<this.animArr.length;j++){
			for(var i=1;i<=this.maxFrame;i++){
				var tmpimg = new customImage();
				tmpimg.setup(++this.loadItemCount, IMG_DIR + "360/beduk_v" + (j+1) +"/_Beduk_version_" + (j+1) + "_matte_000" + (i<10?("0"+i):i) + ".png", 0, 0, 1, 1, 0, 1, this.controlLoading);
				this.animArr[j].push(tmpimg);
			}
		}
	},
	
	controlLoading: function(_index, _itm){
		if(beduk.justControlLoading){
			_itm.img.src = "";
			_itm.img = null;
		}
		
		beduk.loadedIndex++;
		
		if(beduk.loadedIndex == beduk.loadItemCount){
			if(!beduk.justControlLoading) beduk.setNewAnim();
			beduk.loading = false;
		}
	},
	
	setNewAnim: function(){
		this.animType = Math.floor(Math.random() * 4);
		
		if(this.currentAnim) this.currentAnim[this.currentFrame].setAlpha(1);
		
		this.currentFrame = 0;
		this.currentAnim = this.animArr[this.animType];
		
		if(glb_canvas) this.currentAnimX = -100 + Math.floor(Math.random() * (glb_canvas.width - 200));
		
		this.direction = this.currentAnimX > (glb_canvas.width*.4)?1:0; // 0 sol, 1 sag
		
		this.waitAnimMouse = this.waitAnimMouseMax;
		this.directionM = glb_directionMax * (this.direction==1?1:-1);
	},
	
	update: function(){
		if(this.loading || !this.currentAnim) return;
		
		if(this.waitAnimMouse > 0 && finalScene360.currentFrame < 1){
			glb_directionM -= (glb_directionM - this.directionM) * this.directionMSpeed;
			this.waitAnimMouse--;
		}
		
		var tmpimg = this.currentAnim[this.currentFrame];
		
		var tmpspeed = -glb_direction * this.speed;
		
		this.currentAnimX += tmpspeed;
		tmpimg.x = this.currentAnimX;
		tmpimg.draw(0, 0);
		
		if(this.currentFrame>=this.maxFrame-1){
			tmpimg.setAlpha(tmpimg.alpha-.1);
			if(tmpimg.alpha == 0 && this.metronomTime == 1){
				this.setNewAnim();
			}
		}else this.currentFrame++;
		
		if(metronomTime == 0) this.metronomTime++;
		if(this.metronomTime > 3) this.metronomTime = 0;
	}
};