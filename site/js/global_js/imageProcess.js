/**
$(CBI)* ...
$(CBI)* @author gldio
$(CBI)* twitter.com/gldio
$(CBI)* blog.41-29.com
$(CBI)*/

FB_IMAGE_MODIFIER = {
		
	processReturn: null,
		
	process: function (_fbId, _processReturn){
		this.processReturn = _processReturn;
		
		var img = new Image();
		if(_fbId != null) img.src = "/Image.aspx?FbId=" + _fbId;
		else if(arguments.length == 3) img.src = "/fb_faces/default_imgs/Comp 1_000" + (arguments[2]<10?"0":"") + arguments[2] + ".jpg";//"/img/def_rabbithole.jpg";
		
		img.addEventListener("load", this.imageload, false);
	},
	
	imageload: function(e){
		var cv = document.createElement('canvas');
		cv.width = 114;
		cv.height = 114;
		
		var ctx = cv.getContext('2d');
		
		var ratio = e.target.width / e.target.height;
		var x = 0, y = 0;
		if(ratio <= 1){
			ratio = cv.width / e.target.width;
			y = (cv.height * .5) - (e.target.height * ratio * .5);
		}else{
			ratio = cv.height / e.target.height;
			x = (cv.width * .5) - (e.target.width * ratio * .5);
		}
		
		ctx.drawImage(e.target, x, y, e.target.width*ratio, e.target.height*ratio);
		
		if(e.target.src.indexOf("Image.aspx") > 0) {
			var imgData = ctx.getImageData(0, 0, cv.width, cv.height);
			
			ctx.clearRect(0, 0, cv.width, cv.height);
			ctx.putImageData(FB_IMAGE_MODIFIER.modifyImage(imgData, 0, 14, 121), 0, 0);
		}
		
		FB_IMAGE_MODIFIER.processReturn(cv.toDataURL());
	},
	
	modifyImage: function (imgData, clrR, clrG, clrB){
		for ( var i = 0; i < imgData.data.length; i += 4 ){	
			imgData.data[i] = BLENDING.add(imgData.data[i], clrR);
			imgData.data[i+1] = BLENDING.add(imgData.data[i+1], clrG);
			imgData.data[i+2] = BLENDING.add(imgData.data[i+2], clrB);
		}
		
		return imgData;
	}
};

var BLENDING = {
	multiply: function(v1,v2){return v1 * v2 / 255;},
	add: function(v1,v2){return v1 + v2;},
	screen: function(v1,v2) { return v1 + v2 - v1 * v2/ 255; },
	overlay: function (v1,v2){
		if ( v1 > 127.5 ){
			return v2 + (255 - v2) * ((v1 - 127.5) / 127.5);
		}else{
			return v2 * v1 / 127.5;
		}
	}
};