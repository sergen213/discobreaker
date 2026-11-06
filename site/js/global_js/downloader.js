var downloader = {
	
	canvas: null,
	context: null,
	loaderImg: null,
	intv: 0,
	loadItemsArr: [],
	loadItemsText: [],
	loadItemsTextTR: ["Fotoğraflar Yükleniyor","Resimler Yükleniyor","Videolar Yükleniyor","Müzik Yükleniyor"],
	loadItemsTextEN: ["Loading Photos","Loading Images","Loading Videos","Loading Music"],
	
	loadTextAlphaSpeed: .2,
	loadTextsIndex: 0,
	loadTextsCount: 0,
	loadTexts: [],
	loadTextsTR: ["Lütfen bekleyin, yükleniyor...", "Bu bir Internet Explorer 9 deneyidir.", "İşlemcinizi yoran uygulamaları kapatın.", "Tarayıcınızdaki gereksiz sekmelerden kurtulun.",
	            "Bu işlemler HTML5 deneyiminizi iyileştirecektir.", "Farenizi elinizden bırakmayın.", "Gözünüzü dört açın, interaktif ekranları kaçırmayın.", "Bilgisayarınızın sesini açın, müziğin tadını çıkarın.",
	            "Türkiye'nin ilk HTML5 klibi Disco Breaker başlıyor..."],
	            
	loadTextsEN: ["Please stay tuned. Loading...", "Exit any applications weighing on your CPU.", "Disco Breaker is an Internet Explorer 9 Experiment.", "Don't let go of your mouse.",
	              "Close unnecessary tabs from your browser.", "These actions will improve your HTML5 experience.", "Open your eyes and don't miss out on interactive parts.", "Juice up the volume and enjoy the music.",
	              "The Disco Breaker experience is starting..."],
	            
	loadTextAlpha: 0,
	
	currentItem: 0,
	totalItemCount: 0,
	loadedItemCount: 0,
	audio: null,
	audioLoaded: 0,
	fbItems: {loadedIndex:0,loading:true,loadItemCount:18},
	returnFunc: null,
	
	//////////////
	start: function(_returnFunc){
		
		this.canvas = document.getElementById('loader_canvas');
		this.canvas.width = 350;
		this.canvas.height = 171;
		this.context = this.canvas.getContext('2d');
		
		this.returnFunc = _returnFunc;
		
		this.loadItemsArr = [];
		this.currentImageData = 0;
		this.totalItemCount = 0;
		this.loadedItemCount = 0;
		this.currentItem = 0;
		
		this.totalItemCount += this.fbItems.loadItemCount;
		this.loadFBImages();
		this.loadItemsArr.push(this.fbItems);
		
		//1
		//beduk.loadItems(true);
		this.loadItemsArr.push(beduk);
		this.totalItemCount += beduk.getTotalLoadItem();
		
		//2
		//dansci.loadItems(true);
		this.loadItemsArr.push(dansci);
		this.totalItemCount += dansci.getTotalLoadItem();
		
		//3
		//dansci360.loadItems(true);
		this.loadItemsArr.push(dansci360);
		this.totalItemCount += dansci360.getTotalLoadItem();
		
		//4
		//dansci360Ek.loadItems(true);
		this.loadItemsArr.push(dansci360Ek);
		this.totalItemCount += dansci360Ek.getTotalLoadItem();
		
		//5
		//geosekil.loadItems(true);
		this.loadItemsArr.push(geosekil);
		this.totalItemCount += geosekil.getTotalLoadItem();
		
		//6
		//strobes.loadItems(true);
		this.loadItemsArr.push(strobes);
		this.totalItemCount += strobes.getTotalLoadItem();
		
		//7-10
		for(var i=1;i<=4;i++){
			var tf = new fbFaces();
			tf.setArgs([[i]], {}, 0);
			//tf.loadItems(i, true);
			this.loadItemsArr.push(tf);
			this.totalItemCount += tf.getTotalLoadItem();
		}
		
		//11
		var crowdBg = new crowdMidFore();
		crowdBg.lineArr = ["CrowdBG/crowd_paralax_1_Precomp__0000"];
		//crowdBg.loadItems(true);
		this.loadItemsArr.push(crowdBg);
		this.totalItemCount += crowdBg.getTotalLoadItem();
		
		//12
		var crowdMid = new crowdMidFore();
		crowdMid.lineArr = ["Crowdmid/Group_EEE 2_Couple_0000","Crowdmid/Group_KEK 2_v5_LONER_0000","Crowdmid/Group_EEE3_v2_0000",
		          "Crowdmid/Group_KEE 2_v2_0000","Crowdmid/Group_KEK 2_v2_0000",
	              "Crowdmid/Group_KEK 2_v5_Couple_0000","Crowdmid/Group_EEE 2_LONER_0000"];
		//crowdMid.loadItems(true);
		this.loadItemsArr.push(crowdMid);
		this.totalItemCount += crowdMid.getTotalLoadItem();
		
		//13
		var crowdFore = new crowdMidFore();
		crowdFore.lineArr = ["Crowdfore/Group_EEE 2_Couple Fore _0000","Crowdfore/Group_EEE 2_LONER Fore _0000","Crowdfore/Group_KEK 2_v2 Fore _0000",
		                     "Crowdfore/Group_KEK 2_v5_Couple Fore _0000","Crowdfore/Group_KEK 2_v5_LONER Fore _0000"];
		//crowdFore.loadItems(true);
		this.loadItemsArr.push(crowdFore);
		this.totalItemCount += crowdFore.getTotalLoadItem();
		
		//14
		//loadVideos.start();
		this.loadItemsArr.push(loadVideos);
		this.totalItemCount += loadVideos.getTotalLoadItem();
		
		// 15
		var imgGlow = new customImage();
	    imgGlow.setup(0, IMG_DIR + "Paralax_bigglow_00000.png", 0, 0, 1, 1, 0, 1, null);
	    this.loadItemsArr.push(imgGlow);
	    this.totalItemCount++;
	    
	    //16
	    var imgVinyet = new customImage();
	    imgVinyet.setup(0, IMG_DIR + "vinyet.png", 0, 0, 1, 1, 0, 1, null);
	    this.loadItemsArr.push(imgVinyet);
	    this.totalItemCount++;
		
	    //17
	    var imgBg = new customImage();
		imgBg.setup(0, IMG_DIR + "BG_tile.jpg", 0, 0, 1, 1, 0, 1, null);
		this.loadItemsArr.push(imgBg);
		this.totalItemCount++;
		
		//18
		var imgBurn = new customImage();
		imgBurn.setup(0, IMG_DIR + "360/_bottom_burn.png", 0, 0, 1, 1, 0, 1, null);
		this.loadItemsArr.push(imgBurn);
		this.totalItemCount++;
		
		//19
		/*this.audio = new Audio();
		this.audio.preload = true;
		this.audio.autplay = false;
		this.loadItemsArr.push(this.audio);
		this.totalItemCount++;*/
		
		this.loaderImg = new customImage();
		this.loaderImg.setup(0,"/img/loader.png", 135, 0, 1, 1, 0, 1, null);
		this.loaderImg.context = this.context;
		
		this.loadTexts = lang_en?this.loadTextsEN:this.loadTextsTR;
		this.loadItemsText = lang_en?this.loadItemsTextEN:this.loadItemsTextTR;
		
		clearInterval(this.intv);
		this.intv = setInterval(this.controlLoadings, 100);
	},
	
	loadFBImages: function(){
		FB_IMAGE_MODIFIER.process(f_id[downloader.fbItems.loadedIndex], function (_imgData) {
			f_images[downloader.fbItems.loadedIndex] = _imgData;
			downloader.fbItems.loadedIndex++;
			if (downloader.fbItems.loadedIndex < 18){
				setTimeout(downloader.loadFBImages, 100);
			}else{
				downloader.fbItems.loading = false;
			}
		}, downloader.fbItems.loadedIndex);
	},
	
	controlAudioLoading: function(){
		if(downloader.audio){
			//if(downloader.audio.duration > 0){
				
				//if(Math.floor(downloader.audio.duration) == Math.floor(downloader.audio.buffered.end(0))){
					//downloader.audio.removeEventListener('canplaythrough', downloader.controlAudioLoading, false);
					
					//console.log("audio " + downloader.audio.src);
					
					downloader.audioLoaded = 2;
					downloader.audio.src = "";
					downloader.audio = null;
					return;
				//}
				
				//if(downloader.audio.currentTime < downloader.audio.duration) {
				//if(downloader.audio.currentTime < downloader.audio.buffered.end(0)) {
					//downloader.audio.currentTime = downloader.audio.buffered.end(0);//downloader.audio.duration;
				//}
			//}
		}
		setTimeout(downloader.controlAudioLoading, 300);
	},
	
	controlLoadings: function(){
		downloader.controlLoadingsSelf();
	},
	
	//////////////
	controlLoadingsSelf: function(){
		//console.log(this.loadedItemCount + " / " + this.totalItemCount + " :: " + this.currentItem + " / " + this.loadItemsArr.length);
		
		if(this.loadedItemCount >= this.totalItemCount){
			this.loadEnd();
			return;
		}

		this.loadedItemCount = 0;
		for(var i=0;i <= this.currentItem;i++){
			if(i >= this.loadItemsArr.length) break;
			
			if(i < 15){
				this.loadedItemCount += this.loadItemsArr[i].loadedIndex;
			}else if(/*(i == 19 && this.audioLoaded == 2) || (i < 19*/(i < 18 && this.loadItemsArr[i].loaded)) this.loadedItemCount++;
			
			if(this.currentItem == i){
				if((i < 15 && !this.loadItemsArr[i].loading)
					|| (i < 18/*19*/ && this.loadItemsArr[i].loaded)
					/*|| (i == 19 && this.audioLoaded == 2)*/){
					
					this.currentItem++;
					//console.log(this.currentItem);
				}
			}
		}
		
		var txtId = 0;
		
		switch(this.currentItem){
			case 1:
			case 2:
			case 3:
			case 4:
			case 5:
			case 6:
			case 11:
			case 12:
			case 13:
			// diger resimler
			case 15:
			case 16:
			case 17:
			case 18:
				if(this.loadItemsArr[this.currentItem].loadItems && this.loadItemsArr[this.currentItem].loadedIndex == -1) {
					if(this.currentItem == 5) this.loadItemsArr[this.currentItem].loadItems(0, true);
					else this.loadItemsArr[this.currentItem].loadItems(true);
				}
				txtId = 1;
				break;
			case 7:
			case 8:
			case 9:
			case 10:
				if(this.loadItemsArr[this.currentItem].loadedIndex == -1) this.loadItemsArr[this.currentItem].loadItems(this.currentItem - 6, true);
				txtId = 1;
				break;
			case 14:
				if(this.loadItemsArr[this.currentItem].loadedIndex == -1) loadVideos.start(); 
				txtId = 2;
				break;
			/*case 19:
				if(this.audioLoaded == 0){
					this.audioLoaded = 1;
					//this.audio.addEventListener('canplaythrough', this.controlAudioLoading, false);
					this.audio.src = "/audio/BEDUK_DISCOBREAKER_MUSIC" + (this.audio.canPlayType("audio/ogg")?".ogg":".mp3");
					this.controlAudioLoading();
				}
				txtId = 3;
				break;*/
		}
		
		this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
		this.loaderImg.setRotation(this.loaderImg.getRotation() + 5);
		this.loaderImg.draw(0,0);
		
		this.context.save();
		
		var perc = "" + Math.round((this.loadedItemCount / this.totalItemCount) * 100);
		this.context.font = "20px DINEngsbekRegular";
		this.context.fillStyle = "rgb(255,255,255)";
		this.context.fillText(perc, (this.canvas.width * .5) - (perc.length * 3), 50);
		
		if(this.loadTextsCount % 30 < 6 || this.loadTextsCount % 30 > 23) this.loadTextAlpha -= this.loadTextAlphaSpeed;
		if(this.loadTextAlpha < 0 || this.loadTextAlpha > 1) this.loadTextAlphaSpeed *= -1;
		this.loadTextAlpha = this.loadTextAlpha<0?0:(this.loadTextAlpha>1?1:this.loadTextAlpha);
		
		this.context.globalAlpha = this.loadTextAlpha;
		
		var txt = this.loadTexts[this.loadTextsIndex] + "\n" + this.loadItemsText[txtId];
		var txtArr = txt.split("\n");
		
		this.loadTextsCount++;
		if(this.loadTextsCount % 30 == 0 && this.loadTextsIndex < this.loadTexts.length - 1){
			this.loadTextsCount = 0;
			this.loadTextsIndex++;
		}
		
		this.context.font = "20px DINEngsbekRegular";
		this.context.fillStyle = "rgb(255,255,255)";
		//this.context.fillText(this.loadItemsText[txtId], (this.canvas.width * .5) - (this.loadItemsText[txtId].length * 3), 100);
		for(var i=0;i<txtArr.length;i++) this.context.fillText(txtArr[i], (this.canvas.width * .5) - (txtArr[i].length * 3), 100 + (i*20));
		
		this.context.restore();
	},
	
	//////////////
	loadEnd: function(){
		/*beduk = {};
		dansci = {};
		dansci360 = {};
		dansci360Ek = {};
		geosekil = {};
		strobes = {};
		loadVideos = {};*/
		this.audio = null;
		
		this.loadItemsArr = null;
		
		clearInterval(this.intv);
		
		if(this.returnFunc) this.returnFunc();
		
		//if(console && console.log) console.log("her sey tamam. internet.zip indirildi!");
	}
};