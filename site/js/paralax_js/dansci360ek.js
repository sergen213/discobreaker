/**
$(CBI)* ...
$(CBI)* @author gldio
$(CBI)* twitter.com/gldio
$(CBI)* blog.41-29.com
$(CBI)*/

var dansci360Ek = {
	
	imgArr: [],
	loadItemCount: 0,
	loadedIndex: -1,
	loading: true,
	justControlLoading: false,
	currentAngle: 0,
	speed: .05,
	metronomTime: 0,
		
	setup: function(){
		this.loadItems();
	},
	
	getTotalLoadItem: function(){ return 6; },
	
	loadItems: function(){
		this.justControlLoading = arguments.length<1?false:arguments[0];
		
		this.loadItemCount = 0;
		this.loadedIndex = 0;
		
		var tmpimg = new customImage();
		tmpimg.setup(++this.loadItemCount, IMG_DIR + "360/ek_popup/Ela_facecam_duz_00000.png", 0, 0, 1, 1, 0, 1, this.controlLoading);
		
		var tmpimg2 = new customImage();
		tmpimg2.setup(++this.loadItemCount, IMG_DIR + "360/ek_popup/Ela_facecam_duz_00001.png", 0, 0, 1, 1, 0, 1, this.controlLoading);
		
		this.imgArr.push({fore:tmpimg, back:tmpimg2});
		////
		var tmpimg3 = new customImage();
		tmpimg3.setup(++this.loadItemCount, IMG_DIR + "360/ek_popup/Ela_facecam_sag_00000.png", 0, 0, 1, 1, 0, 1, this.controlLoading);
		
		var tmpimg4 = new customImage();
		tmpimg4.setup(++this.loadItemCount, IMG_DIR + "360/ek_popup/Ela_facecam_sag_00001.png", 0, 0, 1, 1, 0, 1, this.controlLoading);
		
		this.imgArr.push({fore:tmpimg3, back:tmpimg4});
		////
		var tmpimg5 = new customImage();
		tmpimg5.setup(++this.loadItemCount, IMG_DIR + "360/ek_popup/Ela_facecam_sol_00000.png", 0, 0, 1, 1, 0, 1, this.controlLoading);
		
		var tmpimg6 = new customImage();
		tmpimg6.setup(++this.loadItemCount, IMG_DIR + "360/ek_popup/Ela_facecam_sol_00001.png", 0, 0, 1, 1, 0, 1, this.controlLoading);
		
		this.imgArr.push({fore:tmpimg5, back:tmpimg6});
	},
	
	controlLoading: function(_index, _itm){
		if(dansci360Ek.justControlLoading){
			_itm.img.src = "";
			_itm.img = null;
		}
		
		dansci360Ek.loadedIndex++;
		
		dansci360Ek.loading = dansci360Ek.loadedIndex < dansci360Ek.loadItemCount;
	},
	
	update: function(){
		if(metronomTime == 0) this.metronomTime++;
		
		if(!finalScene) this.currentAngle += -glb_direction * this.speed;
		else this.currentAngle = 0;
		
		if(this.currentAngle <= -this.imgArr.length) this.currentAngle = -(this.imgArr.length-1);
		else if(this.currentAngle >= this.imgArr.length) this.currentAngle = this.imgArr.length-1;
		
		var frm = 0;
		if(this.currentAngle >= 1) frm = 1;
		else if(this.currentAngle <= -1) frm = 2;
		
		if(!this.loading) this.imgArr[frm].back.draw(0, 0);
		
		tmpAlpha = 0;
		if(this.metronomTime == 0 && (metronomTime == 1 || metronomTime == 3 /*|| metronomTime == 6 || metronomTime == 9 || metronomTime == 12*/)){
			tmpAlpha = metronomTime == 3?0:1;
			this.imgArr[frm].fore.setAlpha(metronomTime == 3?.15:1);
		}else{
			this.imgArr[frm].fore.setAlpha(this.imgArr[frm].fore.alpha - (this.imgArr[frm].fore.alpha - tmpAlpha) * .5);
		}
		
		if(!this.loading) this.imgArr[frm].fore.draw(0, 0);
		
		if(this.metronomTime > 1) this.metronomTime = 0;
	}
};