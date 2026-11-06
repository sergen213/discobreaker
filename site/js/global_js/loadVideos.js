/**
$(CBI)* ...
$(CBI)* @author gldio
$(CBI)* twitter.com/gldio
$(CBI)* blog.41-29.com
$(CBI)*/

var loadVideos = {
		
	loadItemCount: 0,
	loadedIndex: -1,
	loading: true,
	video: null,
	videos: [],
	
	getTotalLoadItem: function(){
		var itmCount = 0;
		for(var i=0;i<windows.length;i++){
			if(windows[i].type == "video") itmCount++;
		}
		
		return itmCount+1;
	},
	
	start : function(){
		this.loadItemCount = 0;
		this.loadedIndex = 0;
		
		for(var i=0;i<windows.length;i++){
			if(windows[i].type == "video"){
				this.loadItemCount++;
				this.videos.push(windows[i].video);
			}
		}
		
		this.loadItemCount++;
		this.videos.push("logo_anim_comp_xHD_beduk_002");
		
		this.loadItemCount++;
		this.videos.push("popup_44_xHD_beduk");
		
		this.loadNextVideo();
	},
	//////////////
	loadNextVideo: function(){
		this.video = document.createElement('video');
		this.video.preload = true;
		this.video.autplay = false;
		//this.video.addEventListener('canplaythrough', this.controlMediaLoading, false);
		this.video.src = "/video/" + this.videos[this.loadedIndex] + (this.video.canPlayType("video/mp4")?".mp4":".ogv");
		this.video.load();
		
		this.controlMediaLoading();
	},
	//////////////
	controlMediaLoading: function(){
		if(loadVideos.video){
			if(loadVideos.video.duration > 0) {
				
				if(Math.floor(loadVideos.video.duration) == Math.floor(loadVideos.video.buffered.end(0))){
					//loadVideos.video.removeEventListener("canplaythrough", this.controlMediaLoading, false);
					
					//console.log(loadVideos.video.src);
					loadVideos.video.currentFrame = 0;
					loadVideos.video.pause();
					loadVideos.video.src = "";
					loadVideos.video = null;
					loadVideos.loadedIndex++;
					loadVideos.loading = loadVideos.loadedIndex < loadVideos.loadItemCount;
					setTimeout(function() {
						if(loadVideos.loading) loadVideos.loadNextVideo();
					}, 150);
					return;
				}
				
				//if(loadVideos.video.currentTime < loadVideos.video.duration) {
				if(loadVideos.video.currentTime < loadVideos.video.buffered.end(0)){
					//console.log(loadVideos.video.readyState, "  ", new Date().getTime());
					loadVideos.video.currentTime = loadVideos.video.buffered.end(0);//loadVideos.video.duration;
				}
			}
		}
		setTimeout(loadVideos.controlMediaLoading, 400);
	}
};