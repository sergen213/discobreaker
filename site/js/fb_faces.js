/**
$(CBI)* ...
$(CBI)* @author gldio
$(CBI)* twitter.com/gldio
$(CBI)* blog.41-29.com
$(CBI)*/

var fbFaces = function(){
	
	this.justControlLoading = false;
	this.loadItemCount = 0;
	this.loadedIndex = -1;
	this.loading = true;
	
	this.vinyet = null;
	
	var offsetTime = 0;
	var FPS_TIME = 1000 / 25;
	var imgDataArr = [];
	var cv = null;
	var ctx = null;
	var imgSpace = 120;
	var myself = null;
	var IMG_DIR = "/fb_faces/";
	
	var kizImg = [];
	var kizType = [];
	var kizCurrentFrames = [0,0,0,0,0];
	var kizTotalFrames = [0,51,21,88,82];
	
	var bedukObj = null;
	var bedukAnim = [[],[]];
	var bedukAnimIndex = {f1:[0,0,0,0,0,0,0,0,0],f2:[0,0,0,0,0,0,0,0,0],f3:[0,0,0,0,0,0,0,0,0],f4:[0,0,0,0,0,0,0,0,0],f5:[0,0,0,0,0,0,0,0,0],f6:[0,0,0,0,0,0,0,0,0],f7:[0,0,0,0,0,0,0,0,0]};
	var bedukAnimType = {};
	
	this.video = null;
	this.videoSrc = "";
	var videoTime = 0;
	var videoPlaying = false;
	var videoWinWidth = 0;
	
	var intv = 0;
	var time = 0;
	
	this.setup = function(_imgDataArr, _cv, _kizType, _bedukObj, _vid, _videoTime){
		if(window.opener) offsetTime = window.opener.offsetTime;
		
		_videoTime += offsetTime;
		
		bedukAnimType["a" + (65600 + offsetTime)] = 0;
		bedukAnimType["a" + (67480 + offsetTime)] = 1;
		bedukAnimType["a" + (69320 + offsetTime)] = 0;
		
		if(_bedukObj){
			for(var i=1;i<=7;i++){
				if(_bedukObj['f'+i]){
					for(var j=0;j<_bedukObj['f'+i].length;j++) _bedukObj['f'+i][j] += offsetTime;
				}
			}
		}
		if(_kizType) for(var j=0;j<_kizType.length;j++) _kizType[j][1] += offsetTime;
		
		this.setArgs(_kizType, _bedukObj, _videoTime);
		cv = _cv;
		cv.style.position = "absolute";
		cv.style.zIndex = 5;
		ctx = cv.getContext('2d');
		
		imgDataArr = [];
		
		for(var i=0;i<_imgDataArr.length;i++){
			var tmpimg = new Image();
			tmpimg.src = _imgDataArr[i];
			tmpimg.style.position = "absolute";
			tmpimg.style.left = (i*imgSpace) + "px";
			content.appendChild(tmpimg);
			imgDataArr.push(tmpimg);
		}
		
		this.loadItems(_vid);
	};
	
	this.setArgs = function(_kizType, _bedukObj, _videoTime){
		myself = this;
		
		kizType = _kizType;
		bedukObj = _bedukObj;
		videoTime = _videoTime;
	};
	
	this.getTotalLoadItem = function(){ return kizTotalFrames[kizType] + 55/*bedukobj + vinyet + video*/; },
	
	this.loadItems = function(_vid){
		this.loadedIndex = 0;
		this.loadItemCount = 0;
		
		this.justControlLoading = arguments.length<2?false:arguments[1];
		
		if(kizType){
			for(var j=0;j<kizType.length;j++){
				var tmparr = [];
				for(i = 1;i <= kizTotalFrames[kizType[j][0]];i++){
					this.loadItemCount++;
					var tmpimg = new Image();
					tmpimg.src = IMG_DIR + "Ela_trans_" + kizType[j][0] + "_render/Ela_trans_" + kizType[j][0] + "_render_900" + (i<10?("0"+i):i) + ".png";
					tmpimg.addEventListener("load", this.controlLoading, false);
					tmparr.push(tmpimg);
				}
				kizImg.push(tmparr);
			}
		}
		
		if(bedukObj){
			for(var i = 1;i <= 27;i++){
				if(i < 27){
					this.loadItemCount++;
					var tmpimg = new Image();
					tmpimg.src = IMG_DIR + "_beduk_RH_1_render/_beduk_RH_1_render_900" + (i<10?("0"+i):i) + ".jpg";
					tmpimg.addEventListener("load", this.controlLoading, false);
					bedukAnim[0].push(tmpimg);
				}
				
				this.loadItemCount++;
				var tmpimg = new Image();
				tmpimg.src = IMG_DIR + "_beduk_RH_2_render/_beduk_RH_2_render_900" + (i<10?("0"+i):i) + ".jpg";
				tmpimg.addEventListener("load", this.controlLoading, false);
				bedukAnim[1].push(tmpimg);
			}
		}
		
		this.vinyet = new Image();
		this.vinyet.src = IMG_DIR + "avatar_vinyet.png";
		this.vinyet.addEventListener("load", this.controlLoading, false);
		this.loadItemCount++;
		
		this.video = document.createElement('video');
		this.video.preload = true;
		this.video.autplay = false;
		
		this.videoSrc = IMG_DIR + "beduk_4_mp4/beduk_4_face_" + _vid + "_v2_xHD_beduk" + (this.video.canPlayType("video/mp4")?".mp4":".ogg");
		if(!this.justControlLoading) this.video.addEventListener("ended", this.videoEnded, false);
		
		this.loadItemCount++;
	};
	//////////////
	this.controlMediaLoading = function(){
		if(myself.video){
			if(myself.video.duration > 0){
				//myself.video.removeEventListener("canplaythrough", this.controlMediaLoading, false);
				
				if(!myself.justControlLoading){
					myself.loadedIndex++;
					myself.loading = myself.loadedIndex < myself.loadItemCount;
					if(myself.loading) myself.loadNextVideo();
					return;
				}
			
				if(Math.floor(myself.video.duration) == Math.floor(myself.video.buffered.end(0))){
					//console.log(myself.video.src);
					myself.video.currentFrame = 0;
					myself.video.pause();
					myself.video.src = "";
					myself.video = null;
					setTimeout(function() {
						myself.loadedIndex++;
						myself.loading = myself.loadedIndex < myself.loadItemCount;
					}, 150);
					return;
				}
				
				//if(myself.video.currentTime < myself.video.duration) {
				if(myself.video.currentTime < myself.video.buffered.end(0)){
					//console.log(myself.video.readyState);
					myself.video.currentTime = myself.video.buffered.end(0);//myself.video.duration;
				}
			}
		}
		setTimeout(myself.controlMediaLoading, 400);
	};
	
	this.controlLoading = function(e){
		if(myself.justControlLoading) e.target.src = "";
		
		myself.loadedIndex++;
		
		if(myself.loadedIndex == myself.loadItemCount - 1){
			myself.video.src = myself.videoSrc;
			myself.video.load();
			myself.controlMediaLoading();
		}
		
		myself.loading = myself.loadedIndex < myself.loadItemCount;
	};
	
	this.videoEnded = function(){ myself.stopUpdate(); window.close(); };
	
	this.startUpdate = function(){ intv = setInterval(this.update, FPS_TIME); };
	
	this.stopUpdate = function(){ clearInterval(intv); };
	
	this.update = function(){
		time = window.opener.time;
		//time = glb_time;
		
		/*if(videoPlaying){
			if(myself.video.currentTime >= myself.video.duration - .4){
				videoWinWidth -= (videoWinWidth - 0) * .8;
				try{
					window.resizeTo(videoWinWidth, window.outerHeight);
				}catch(e){ }
			}			
			return;
		}*/
		
		if(myself.loading) return;
		try{ 
			ctx.clearRect(0, 0, cv.width, cv.height);
			
			if(time < videoTime){
				//myself.drawImageData();
				myself.drawBedukSeq();
				
				if(myself.vinyet){
					
					ctx.save();
					for(var i=0;i<imgDataArr.length;i++) ctx.drawImage(myself.vinyet, i * imgSpace, 0);
					ctx.restore();
				}
				
				myself.drawKizImages();
			}else{
				myself.drawVideo();
			}		
		}catch(e){ window.debug("imgdata " + data.id + ":" + e); myself.videoEnded(); }
	};
	
	this.drawVideo = function(){
		if(!videoPlaying){
			videoPlaying = true;
			this.video.play();			
			this.video.style.position = "absolute";
			this.video.style.zIndex = 5;
			content.appendChild(this.video);
			
			videoWinWidth = window.outerWidth;
			
			this.stopUpdate();
			content.removeChild(cv);
		}
		//ctx.save();
		//ctx.drawImage(this.video, 0, 0);
		//ctx.restore();
	};
	
	this.drawBedukSeq = function(){
		if(!bedukObj) return;
		
		ctx.save();
		for(var j=1;j<=7;j++){
			var fobj = bedukObj['f'+j];
			if(fobj){
				for(var i=0;i<fobj.length;i++){
					if(fobj[i] && time >= fobj[i]){
						var tmpatype = bedukAnimType["a"+fobj[i]];
						
						ctx.drawImage(bedukAnim[tmpatype][bedukAnimIndex['f'+j][i]], (j-1) * 120, 0);
						
						bedukAnimIndex['f'+j][i]++;
						if(bedukAnimIndex['f'+j][i] >= bedukAnim[tmpatype].length){
							bedukAnimIndex['f'+j][i] = 0;
							fobj[i] = null;
						}
					}
				}
			}
		}
		ctx.restore();
	};
	
	this.drawKizImages = function(){
		if(!kizType) return;
		
		ctx.save();
		for(var i=0;i<kizType.length;i++){
			if(kizCurrentFrames[i] >= kizTotalFrames[kizType[i][0]] || time < kizType[i][1]) continue;
			
			ctx.drawImage(kizImg[i][kizCurrentFrames[i]], kizType[i][2], 0);

			kizCurrentFrames[i] += 1;
		}
		ctx.restore();
	};
	
	this.drawImageData = function(){
		ctx.save();
		for(var i=0;i<imgDataArr.length;i++) ctx.drawImage(imgDataArr[i], i*imgSpace, 0);
		ctx.restore();
	};
};