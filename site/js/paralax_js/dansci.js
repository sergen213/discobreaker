/**
$(CBI)* ...
$(CBI)* @author gldio
$(CBI)* twitter.com/gldio
$(CBI)* blog.41-29.com
$(CBI)*/

var dansci = {
	
	leftImgArr: ["Ela_sol half/Ela_paralax_2_half_000","Ela_saglisollu/Ela_paralax_3_half_000"],
	rightImgArr: ["Ela_sag half/Ela_paralax_1_half_000","Ela_saglisollu/Ela_paralax_3_half_000"],
	
	leftArr: [[],[],[]],
	rightArr: [[],[],[]],
	
	currentFrame: 0,
	maxFrame: 10,
	currentAnim: null,
	currentAnimX: 0,
	animType: 0,
	direction: 0,
	loadItemCount:0,
	loadedIndex:-1,
	loading:true,
	speed: 2.25,
	speed2: 3.25,
	metronomTime: 0,
	justControlLoading: false,
	floorImg: null,
	lastAnim: false,
	
	waitAnimMouse: 0,
	waitAnimMouseMax: 20,
	directionM: 0,
	directionMSpeed: .05,
	
	setup: function(){
		this.loadItems();
	},
	
	getTotalLoadItem: function(){ return ((this.maxFrame+1)*6) + 1; },
	
	loadItems: function(){
		this.justControlLoading = arguments.length<1?false:arguments[0];
		
		this.loadedIndex = 0;
		this.loadItemCount = 0;
		
		for(var i=0;i<=this.maxFrame;i++){
			var ti = (i<10?("0"+i):i);
			
			var tmpimgl1 = new customImage();
			tmpimgl1.setup(++this.loadItemCount, IMG_DIR + this.leftImgArr[0] + ti + ".png", 350, 0, 1, 1, 0, 1, this.controlLoading);
			
			var tmpimgl2 = new customImage();
			tmpimgl2.setup(++this.loadItemCount, IMG_DIR + this.leftImgArr[1] + ti + ".png", 350, -25, -.75, .75, 0, 1, this.controlLoading);
			
			var tmpimgl3 = new customImage();
			tmpimgl3.setup(++this.loadItemCount, IMG_DIR + this.rightImgArr[0] + ti + ".png", 350, 0, -1, 1, 0, 1, this.controlLoading);
			
			this.leftArr[0].push(tmpimgl1);
			this.leftArr[1].push(tmpimgl2);
			this.leftArr[2].push(tmpimgl3);
			
			var tmpimgr1 = new customImage();
			tmpimgr1.setup(++this.loadItemCount, IMG_DIR + this.rightImgArr[0] + ti + ".png", 350, 0, 1, 1, 0, 1, this.controlLoading);
			
			var tmpimgr2 = new customImage();
			tmpimgr2.setup(++this.loadItemCount, IMG_DIR + this.rightImgArr[1] + ti + ".png", 350, -25, .75, .75, 0, 1, this.controlLoading);
			
			var tmpimgr3 = new customImage();
			tmpimgr3.setup(++this.loadItemCount, IMG_DIR + this.leftImgArr[0] + ti + ".png", 350, 0, -1, 1, 0, 1, this.controlLoading);
			
			this.rightArr[0].push(tmpimgr1);
			this.rightArr[1].push(tmpimgr2);
			this.rightArr[2].push(tmpimgr3);
		}
		
		this.floorImg = new customImage();
		this.floorImg.setup(++this.loadItemCount, IMG_DIR + "floor_simple_crop.png", -420, 0, 1, 1, 0, 1, this.controlLoading);
	},
	
	controlLoading: function(_index, _itm){
		if(dansci.justControlLoading){
			_itm.img.src = "";
			_itm.img = null;
		}
		
		dansci.loadedIndex++;
		
		if(dansci.loadedIndex == dansci.loadItemCount){
			if(!dansci.justControlLoading) dansci.setNewAnim(false);
			dansci.loading = false;
		}
	},
	
	setNewAnim: function(_force){
		this.direction = _force?0:Math.floor(Math.random() * 2); // 1 right, 0 left
		this.animType = _force?2:Math.floor(Math.random() * 3);
		
		if(this.currentAnim) this.currentAnim[this.currentFrame].setAlpha(1);
		
		this.currentFrame = 0;
		
		if(this.direction==1){
			this.currentAnim = this.rightArr[this.animType];
			if(glb_canvas) this.currentAnimX = glb_canvas.width * .5 + Math.floor(Math.random() * 300);
		}else{
			this.currentAnim = this.leftArr[this.animType];
			if(glb_canvas) this.currentAnimX = _force?250:(glb_canvas.width * .3 - Math.floor(Math.random() * 300));
		}
		
		this.waitAnimMouse = this.waitAnimMouseMax;
		this.directionM = glb_directionMax * (this.direction==1?1:-1);
	},
	
	update: function(){
		if(this.loading || !this.currentAnim) return;
		
		if(time >= metronomFinalScene){
				
			if(this.floorImg.x < -100) glb_directionM = -5; else glb_directionM -= (glb_directionM - 0) * .3;
			
			if(!this.lastAnim && time >= metronomFinalScene2){
				this.lastAnim = true;
				this.setNewAnim(true);
			}
			this.floorImg.x += -glb_direction * this.speed2;
			this.floorImg.draw(0,0);
		}else if(this.waitAnimMouse > 0){
			glb_directionM -= (glb_directionM - this.directionM) * this.directionMSpeed;
			this.waitAnimMouse--;
		}
		
		var tmpimg = this.currentAnim[this.currentFrame];
		
		var tmpspeed = -glb_direction * (this.animType==0?this.speed2:this.speed);
		
		this.currentAnimX += tmpspeed;
		tmpimg.x = this.currentAnimX;
		tmpimg.draw(0, 0);
		
		if(this.currentFrame>=this.maxFrame-1){
			tmpimg.setAlpha(tmpimg.alpha-.1);
			if(time < metronomFinalScene){
				if(tmpimg.alpha == 0 && this.metronomTime == 0){
					this.setNewAnim(false);
				}
			}
		}else this.currentFrame++;
		
		if(metronomTime == 0) this.metronomTime++;
		if(this.metronomTime > 3) this.metronomTime = 0;
	}
};