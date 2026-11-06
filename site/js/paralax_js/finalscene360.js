/**
$(CBI)* ...
$(CBI)* @author gldio
$(CBI)* twitter.com/gldio
$(CBI)* blog.41-29.com
$(CBI)*/

var finalScene360 = {
	
	animArr: [],
	
	currentFrame: 0,
	maxFrame: 73,
	loadItemCount:0,
	loadedIndex:0,
	loading:true,
	speed: 2.25,
	x: -300,
	
	justControlLoading: false,
	
	setup: function(){
		this.loadItems();
	},
	
	loadItems: function(){
		this.justControlLoading = arguments.length<1?false:arguments[0];
		
		for(var i=24;i<this.maxFrame+24;i++){
			var tmpimg = new customImage();
			tmpimg.setup(++this.loadItemCount, IMG_DIR + "360/villian_canlan/_Villian_ingame_matte_000" + i + ".png", 0, 0, 1, 1, 0, 1, this.controlLoading);
			this.animArr.push(tmpimg);
		}
	},
	
	controlLoading: function(_index, _itm){
		finalScene360.loadedIndex++;
		
		finalScene360.loading = finalScene360.loadedIndex < finalScene360.loadItemCount;
	},
	
	update: function(){
		if(this.loading) return;
		
		if(this.currentFrame >= this.maxFrame){
			glb_directionM = 0;
			return;
		}
		
		if(this.x < 75) glb_directionM = -5; else glb_directionM -= (glb_directionM - 0) * .2;
		
		this.x += -glb_direction * this.speed;
		
		this.animArr[this.currentFrame].draw(this.x, 0);
		this.currentFrame++;
		
		
	}
};