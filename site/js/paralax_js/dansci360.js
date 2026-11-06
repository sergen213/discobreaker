/**
$(CBI)* ...
$(CBI)* @author gldio
$(CBI)* twitter.com/gldio
$(CBI)* blog.41-29.com
$(CBI)*/

var dansci360 = {
	
	imgArr: [],
	imgArrSol: [],
	imgArrSag: [],
	loadItemCount: 0,
	loadedIndex: -1,
	loading: true,
	justControlLoading: false,
	currentAngle: 0,
	speed: .5,
	x: 0,
	y: 75,
	imgDataLight: null,
	metronomTime:0,
	maxFrame: 41,
		
	setup: function(){
		this.loadItems();
		
		this.x = Math.round(glb_canvas.width * .55);
	},
	
	getTotalLoadItem: function(){ return (this.maxFrame+1)*3; },
	
	loadItems: function(){
		this.justControlLoading = arguments.length<1?false:arguments[0];
		
		this.loadedIndex = 0;
		this.loadItemCount = 0;
		
		for(var i=0;i<=this.maxFrame;i++){
			var tmpimg = new customImage();
			tmpimg.setup(++this.loadItemCount, IMG_DIR + "360/Ela_render/ELA_main_000" + (i<10?("0"+i):i) + ".png", 0, 0, 1, 1, 0, 1, this.controlLoading);
			this.imgArr.push(tmpimg);
			
			var tmpimg2 = new customImage();
			tmpimg2.setup(++this.loadItemCount, IMG_DIR + "360/Ela_sol_burn/ELA_sol_burn_000" + (i<10?("0"+i):i) + ".png", 0, 0, 1, 1, 0, 1, this.controlLoading);
			this.imgArrSol.push(tmpimg2);
			
			var tmpimg3 = new customImage();
			tmpimg3.setup(++this.loadItemCount, IMG_DIR + "360/Ela_sag_burn/ELA_sag_burn_000" + (i<10?("0"+i):i) + ".png", 0, 0, 1, 1, 0, 1, this.controlLoading);
			this.imgArrSag.push(tmpimg3);
		}
	},
	
	controlLoading: function(_index, _itm){
		if(dansci360.justControlLoading){
			_itm.img.src = "";
			_itm.img = null;
		}
		
		dansci360.loadedIndex++;
		
		dansci360.loading = dansci360.loadedIndex < dansci360.loadItemCount;
	},
	
	drawLight: function(){ // test
		//if(metronomTime%this.metronomTime==0 || metronomTime%this.metronomTime==2 || metronomTime%this.metronomTime==4 || metronomTime%this.metronomTime==6){
		
		var _img = this.imgArr[this.getCurrentFrame()];
		
		glb_context.save();
		glb_context.drawImage(_img.img, this.x, this.y);
		glb_context.restore();
		
		var imgData = glb_context.getImageData(this.x, this.y, _img.width, _img.height);
		
		var wi = Math.round(_img.width*.6);
		var wiA = 0;
		for(var i = 0;i < imgData.data.length; i += 4){
			if(imgData.data[i] > 2 && imgData.data[i+1] > 2 && imgData.data[i+2] > 2 && wiA < wi){
				var addVal = 200 - ((wiA/wi)*200);
				imgData.data[i] += addVal;
				imgData.data[i+1] += addVal;
				imgData.data[i+2] += addVal;
			}
			wiA++;
			if(wiA >= _img.width) wiA = 0;
		}
		
		this.imgDataLight = imgData;
		
		/*}else{
			this.imgDataLight = null;
		}*/
	},
	
	getCurrentFrame: function(){
		var prc360 = Math.round((this.imgArr.length + this.currentAngle) *.5);
		
		if(prc360 < 0) prc360 = 0;
		else if(prc360 >= this.imgArr.length) prc360 = this.imgArr.length - 1;
		
		return prc360;
	},
	
	update: function(_type){
		if(metronomTime == 0) this.metronomTime++;
		
		if(this.loading) return;
		
		if(time < metronomFinalScene) this.currentAngle += -glb_direction * this.speed;
		else this.currentAngle -= (this.currentAngle - -12) * .2;
		
		if(this.currentAngle <= -this.imgArr.length) this.currentAngle = -(this.imgArr.length-1);
		else if(this.currentAngle >= this.imgArr.length) this.currentAngle = this.imgArr.length-1;
		
		/*if(this.imgDataLight){
			glb_context.save();
			glb_context.putImageData(this.imgDataLight, this.x, this.y);
			glb_context.restore();
		}else{
			this.imgArr[this.getCurrentFrame()].draw(this.x, this.y);
		}*/
		
		this.imgArr[this.getCurrentFrame()].draw(this.x, this.y);
		
		if(this.metronomTime == 0){
			if(metronomTime==0 || metronomTime==6){
				this.imgArrSol[this.getCurrentFrame()].draw(this.x, this.y);
			}else if(metronomTime==3 || metronomTime==9){
				this.imgArrSag[this.getCurrentFrame()].draw(this.x, this.y);
			}
		}
		
		if(this.metronomTime > 1){
			this.metronomTime = 0;
		}
	}
};