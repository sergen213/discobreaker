/**
$(CBI)* ...
$(CBI)* @author gldio
$(CBI)* twitter.com/gldio
$(CBI)* blog.41-29.com
$(CBI)*/

var strobes = {
	
	imgArr: [[],[],[]],
	loading: true,
	loadItemCount: 0,
	loadedIndex: -1,
	justControlLoading: false,
	randIndex: 0,
	randX: [-500,0,-200,400],
	txtX: [550,490,380],
	metronomTime: 0,
	x:0,
	speed: 1.2,
		
	setup: function(){
		this.loadItems();
	},
	
	getTotalLoadItem: function(){ return this.imgArr.length*4; },
	
	//////////////
	loadItems: function(){
		this.justControlLoading = arguments.length<1?false:arguments[0];
		
		this.loadItemCount = 0;
		this.loadedIndex = 0;
		
		for(var i=0;i<this.imgArr.length;i++){
			var tmpimg = new customImage();
			tmpimg.setup(++this.loadItemCount, IMG_DIR + "360/strobe_" + i +"/_strobe_version_" + i + "_back_00000.png", 0, 0, 1, 1, 0, 1, this.controlLoading);
			
			var tmpimg2 = new customImage();
			tmpimg2.setup(++this.loadItemCount, IMG_DIR + "360/strobe_" + i +"/_strobe_version_" + i + "_back_00001.png", 0, 0, 1, 1, 0, 1, this.controlLoading);
			
			var tmpimgF = new customImage();
			tmpimgF.setup(++this.loadItemCount, IMG_DIR + "360/strobe_" + i +"/_strobe_version_" + i + "_fore_00000.png", 0, 0, 1, 1, 0, 1, this.controlLoading);
			
			var tmpimgF2 = new customImage();
			tmpimgF2.setup(++this.loadItemCount, IMG_DIR + "360/strobe_" + i +"/_strobe_version_" + i + "_fore_00001.png", 0, 0, 1, 1, 0, 1, this.controlLoading);
			
			this.imgArr[i].back = [tmpimg,tmpimg2];
			this.imgArr[i].fore = [tmpimgF,tmpimgF2];
		}
	},
	
	controlLoading: function(_index, _itm){
		if(strobes.justControlLoading){
			_itm.img.src = "";
			_itm.img = null;
		}
		
		strobes.loadedIndex++;
		
		strobes.loading = strobes.loadedIndex < strobes.loadItemCount;
	},
	//////////////
	update: function(_type){
		if(metronomTime == 0 && _type) this.metronomTime++;
		
		var tmpspeed = glb_direction * this.speed;
		this.x -= tmpspeed;
		
		if(this.metronomTime == 0 && !this.loading){
			var rndX = 0;
			switch(metronomTime){
				case 1:
				//case 1:
					if(!_type) this.imgArr[this.randIndex].back[0].draw(this.randX[0] + this.x,-30);
					if(!_type) this.imgArr[this.randIndex].fore[0].draw(this.randX[0] + this.x,-30);
					break;
				case 2:
					if(!_type) this.imgArr[this.randIndex].back[1].draw(this.randX[0] + this.x,-30);
					if(!_type) this.imgArr[this.randIndex].fore[1].draw(this.randX[0] + this.x,-30);
					break;
				case 3:
				//case 3:
				//case 4:
					rndX = 1;
					if(!_type) this.imgArr[this.randIndex].back[0].draw(this.randX[1] + this.x,-30);
					if(!_type) this.imgArr[this.randIndex].fore[0].draw(this.randX[1] + this.x,-30);
					break;
				case 4:
				//case 5:
					rndX = 1;
					if(!_type) this.imgArr[this.randIndex].back[1].draw(this.randX[1] + this.x,-30);
					if(!_type) this.imgArr[this.randIndex].fore[1].draw(this.randX[1] + this.x,-30);
					break;
				case 5:
				//case 6:
				//case 7:
					rndX = 2;
					if(!_type) this.imgArr[this.randIndex].back[0].draw(this.randX[2] + this.x,-30);
					if(!_type) this.imgArr[this.randIndex].fore[0].draw(this.randX[2] + this.x,-30);
					break;
				case 6:
				//case 8:
					rndX = 2;
					if(!_type) this.imgArr[this.randIndex].back[1].draw(this.randX[2] + this.x,-30);
					if(!_type) this.imgArr[this.randIndex].fore[1].draw(this.randX[2] + this.x,-30);
					break;
				case 7:
				//case 9:
				//case 10:
					rndX = 3;
					if(!_type) this.imgArr[this.randIndex].back[0].draw(this.randX[3] + this.x,-30);
					if(!_type) this.imgArr[this.randIndex].fore[0].draw(this.randX[3] + this.x,-30);
					break;
				case 8:
				//case 11:
					rndX = 3;
					if(!_type) this.imgArr[this.randIndex].back[1].draw(this.randX[3] + this.x,-30);
					if(!_type) this.imgArr[this.randIndex].fore[1].draw(this.randX[3] + this.x,-30);
					break;
			}
			
			if(!_type && (metronomTime >=1 && metronomTime <=8 /*metronomTime==1 || metronomTime==3 || metronomTime==5 || metronomTime==7*/)){
				fb_text.update(this.randX[rndX] + this.txtX[this.randIndex] + this.x);
			}
			
			if(metronomTime==2 || metronomTime==4 || metronomTime==6){
				this.randIndex++;
				this.randIndex = this.randIndex>=this.imgArr.length?0:this.randIndex;
			}
		}
		
		if(this.metronomTime > 1 && _type){
			this.x = 0;
			this.metronomTime = 0;
			this.randIndex = Math.floor(Math.random() * this.imgArr.length);
			/*this.randX[0] = -300 + Math.floor(Math.random() * 50);
			this.randX[1] = -100 + Math.floor(Math.random() * 50);
			this.randX[2] = 50 + Math.floor(Math.random() * 50);
			this.randX[3] = -100 + Math.floor(Math.random() * 50);*/
		}
	}
};