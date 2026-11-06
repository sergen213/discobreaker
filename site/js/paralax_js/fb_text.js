/**
$(CBI)* ...
$(CBI)* @author gldio
$(CBI)* twitter.com/gldio
$(CBI)* blog.41-29.com
$(CBI)*/

var fb_text = {
	
	text: "",
	font: "170px tesboldTRBold",
	color: "rgb(0,39,90)",
	
	width: 150,
	height: 120,
	
	pivotPointX: 0,
	pivotPointY: 0,
	
	rotation: 0,
	x: 200,
	y: 200,
	
	metronomTime:0,
	
	imgData: null,
	
	setup:	function(_fbName){
		this.text = _fbName.substr(0,4);
		
		if(this.text.length < 2) return;
		
		this.width = this.text.length * 82;
		
		this.rotation = 320 * Math.PI / 180;
		
		var cv = document.createElement('canvas');
		cv.width = this.width;
		cv.height = this.height;
		var ctx = cv.getContext('2d');
		
		ctx.font = this.font;
        ctx.fillStyle = this.color;
        ctx.fillText(this.text, 0, cv.height-10);
        
        var imgData = ctx.getImageData(0, 0, cv.width, cv.height);
        
		var wiA = 0;
		for(var i = 0;i < imgData.data.length; i += 4){
			//if(imgData.data[i] > 2 && imgData.data[i+1] > 2 && imgData.data[i+2] > 2){
				var addVal = 255-(((wiA-50)/140)*255);
				if(wiA>190) addVal = 0;
				imgData.data[i] += addVal;
				imgData.data[i+1] += addVal;
				imgData.data[i+2] += addVal;
				//imgData.data[i+3] -= addVal * .5;
			//}
			wiA++;
			if(wiA >= this.width) wiA = 0;
		}
        
        ctx.putImageData(imgData, 0, 0);
        
        this.img = new Image();
        this.img.src = cv.toDataURL(0, 0, cv.width, cv.height);
        
        this.pivotPointX = cv.width*.5;
		this.pivotPointY = cv.height*.5;
	},
	
	update: function(_x){
		if(this.text.length < 2) return;
		
		//if(metronomTime == 0) this.metronomTime++;
		
		//if(metronomTime < 4 && this.metronomTime == 0){
		
			//this.x = _x - this.img.width * .5;
			this.x = _x + 60;
		
			glb_context.save();
			
			glb_context.translate(this.x, this.y);
	        glb_context.rotate(this.rotation);
	        glb_context.translate(-this.x, -this.y);
			
	        glb_context.globalAlpha = .5;
	        
			glb_context.drawImage(this.img, this.x, this.y - this.height);
			
			glb_context.restore();		
		
		//}
		
		//if(this.metronomTime > 1) this.metronomTime = 0;
	}
};