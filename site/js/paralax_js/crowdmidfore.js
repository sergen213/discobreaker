/**
$(CBI)* ...
$(CBI)* @author gldio
$(CBI)* twitter.com/gldio
$(CBI)* blog.41-29.com
$(CBI)*/

function crowdMidFore() {
	
	this.imgCrowdArr = [];
	this.lineArr = [];
    
	this.currentIndex= 0;
	this.maxWidth= 0;
	this.itemYAdd = 0;
	this.itemSpace= 0;
	this.speed= 0;
	this.loadedIndex = -1;
	this.loadItemCount = 0;
	this.loading = true;
	this.x1= 0;
	this.x2= 0;
	this.globalScale = 1;
	this.globalY = 0;
	this.direction = 1;
	this.maxMetronomTime = 0;
	this.metronomTimeAnim = 0;
	this.itmAlpha = 0;
	this.justControlLoading = false;
	
	var myself;
    
	this.setup = function(){
		this.loadItems();
	};
	
	this.getTotalLoadItem = function(){ return 4 * (this.lineArr.length*2); },
	
	this.loadItems = function(){
		this.loadedIndex = 0;
		this.loadItemCount = 0;
		
		this.justControlLoading = arguments.length<1?false:arguments[0];
		
		myself = this;
		
		for(var i=0;i<4;i++){
			var tmpobj = {itms:[], itmstint:[]};
			
			for(var k=0;k<this.lineArr.length;k++){
				var itm = new customImage();
				var itmtint = new customImage();
				
				itm.setup(++this.loadItemCount, IMG_DIR + this.lineArr[k] + i + ".png", 0, 0, this.globalScale, this.globalScale, 0, 0, this.controlLoading);
				tmpobj.itms.push(itm);
				
				itmtint.setup(++this.loadItemCount, IMG_DIR +
						(this.lineArr[k].substr(0,this.lineArr[k].length-5)) + "tint" + (this.lineArr[k].substr(this.lineArr[k].length-5,5)) +
						i + ".png", 0, 0, this.globalScale, this.globalScale, 0, 1, this.controlLoading);
				
				tmpobj.itmstint.push(itmtint);
			}
			
			this.imgCrowdArr.push(tmpobj);
	    }
	};
	
	this.controlLoading = function(_index, _itm){
		if(myself.justControlLoading){
			_itm.img.src = "";
			_itm.img = null;
		}
		
		myself.loadedIndex++;
		
		if(myself.loadedIndex == myself.loadItemCount){
			if(!myself.justControlLoading) myself.setupPositions();
			myself.loading = false;
		}
	};
	//////////////
	this.setupPositions = function(){
		var prevX = 0;
		this.maxWidth = -this.itemSpace;
		
		for(var k=0;k<this.lineArr.length;k++){
			var itm;
			for(var i=0;i<this.imgCrowdArr.length;i++){
				itm = this.imgCrowdArr[i].itms[k];
				var itmtint = this.imgCrowdArr[i].itmstint[k];
				
				itm.x = prevX;
				if(glb_canvas) itm.y = glb_canvas.height - itm.height + this.itemYAdd;
				itmtint.x = itm.x;
				itmtint.y = itm.y;
			}
			
			prevX += itm.width + this.itemSpace;
		}
		
		this.maxWidth = prevX - this.itemSpace;
		
		this.x2 = this.maxWidth;
	};
	//////////////
	this.update = function(){
		if(metronomTime == 0) this.metronomTimeAnim++;
		
		if(this.metronomTimeAnim == 0) {
			if(metronomTime >= 1 && metronomTime <= 2) this.itmAlpha = 1;
			else if(metronomTime == 3) this.itmAlpha = .15;
		}
		if(this.itmAlpha <= .15) this.itmAlpha -= ((this.itmAlpha - -.05) * .115);
		
		for(var k=0;k<this.lineArr.length;k++){
			var itm = this.imgCrowdArr[this.currentIndex].itms[k];
			var itmtint = this.imgCrowdArr[this.currentIndex].itmstint[k];
			
			itm.setAlpha(this.itmAlpha);
			if(arguments.length > 0 && !arguments[0]){
				itmtint.setAlpha(itmtint.alpha-((itmtint.alpha-0) * .2));
			}

			itmtint.x = itm.x;
			
			if(!this.loading){
				itmtint.draw(this.x1,this.globalY);
				itm.draw(this.x1,this.globalY);
				
				itmtint.draw(this.x2,this.globalY);
				itm.draw(this.x2,this.globalY);
			}
		}
		
		var tmpdirection = glb_direction * this.direction;
		var tmpspeed = tmpdirection * this.speed;
		
		this.x1 -= tmpspeed;
		if(tmpdirection > 0 && this.x1 <= -this.maxWidth) this.x1 = this.x2 + this.maxWidth - tmpspeed;
		else if(tmpdirection < 0 && this.x1 > glb_canvas.width) this.x1 = this.x2 - this.maxWidth - tmpspeed;
		
		this.x2 -= tmpspeed;
		if(tmpdirection > 0 && this.x2 <= -this.maxWidth) this.x2 = this.x1 + this.maxWidth - tmpspeed;
		else if(tmpdirection < 0 && this.x2 > glb_canvas.width) this.x2 = this.x1 - this.maxWidth - tmpspeed;
		
		if(this.metronomTimeAnim > this.maxMetronomTime) {
			this.metronomTimeAnim = 0;
			this.currentIndex++;
			this.currentIndex = this.currentIndex>=4?0:this.currentIndex;
		}
		// yazilim gunluklerine ek: kukumav kusunun iliklerine serzenis
	};
}