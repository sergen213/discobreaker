/**
$(CBI)* ...
$(CBI)* @author gldio
$(CBI)* twitter.com/gldio
$(CBI)* blog.41-29.com
$(CBI)*/

var geosekil = {
	
	bg: [],
	mid: [],
	fore: [],
	
	loading: true,
	loadItemCount: 0,
	loadedIndex: -1,
	justControlLoading: false,
	
	setup: function(){
		this.loadItems(arguments);
	},
	
	getTotalLoadItem: function(){ return 11; },
	
	loadItems: function(){
		this.justControlLoading = arguments.length<2?false:arguments[1];
		
		this.loadItemCount = 0;
		this.loadedIndex = 0;
		
		var itm;
		
		for(var i=1;i<4;i++){
			if(arguments[0] == 2) continue;
			if(arguments[0] && i==1) continue;
			itm = new customImage();
			itm.setup(++this.loadItemCount, IMG_DIR + "Geo BG/" + i + ".png", (i - 1)*300, 0, 1, 1, 0, (i==1?.5:1), this.controlLoading);
			this.bg.push(itm);
		}
		
		var posYArr = [55,25,125,0];
		for(var i=1;i<5;i++){
			if(arguments[0] == 2) continue;
			if(arguments[0] && i==1) continue;
			var imgsrc = "Geo mid/" + i + ".png";
			//if(i==1 && arguments[0]) imgsrc = "360/geo/1_new.png";
			itm = new customImage();
			itm.setup(++this.loadItemCount, IMG_DIR + imgsrc, (i - 1)*460, posYArr[i-1], 1, 1, 0, .75, this.controlLoading);
			this.mid.push(itm);
		}
		
		posYArr = [0,0,0,20];
		for(var i=1;i<5;i++){
			var imgsrc = "Geo fore/" + i + ".png";
			if(i==3 && arguments[0]) imgsrc = "360/geo/3_fore_new.png";
			itm = new customImage();
			itm.setup(++this.loadItemCount, IMG_DIR + imgsrc, (i - 1)*(arguments[0]?1700:740), posYArr[i-1], 1, 1, 0, 1, this.controlLoading);
			this.fore.push(itm);
		}
	},
	
	controlLoading: function(_index, _itm){
		if(geosekil.justControlLoading){
			_itm.img.src = "";
			_itm.img = null;
		}
		
		geosekil.loadedIndex++;
		
		geosekil.loading = geosekil.loadedIndex < geosekil.loadItemCount;
	},
	//////////////
	update: function (_type) {
		if(this.loading) return;
		
		var tmpdirection = glb_direction * (arguments.length==2?arguments[1]:1);
		
		switch(_type){
			case 0:
				for(var i=0;i<this.bg.length;i++){
					var itm = this.bg[i];
					
					itm.x -= tmpdirection;
					
					if(tmpdirection > 0 && itm.x + itm.width < 0) itm.x = glb_canvas.width + (Math.random() * 100);
					else if(tmpdirection < 0 && itm.x > glb_canvas.width) itm.x = -(itm.width + (Math.random() * 100));
					
					itm.draw(0,0);
				}
				break;
			case 1:
				for(var i=0;i<this.mid.length;i++){
					var itm = this.mid[i];
					
					itm.x -= tmpdirection * 2.75;
					
					if(tmpdirection > 0 && itm.x + this.mid[0].width < -200){
						itm.x = 200 + glb_canvas.width + Math.round(Math.random() * 150 - 75);
					}else if(tmpdirection < 0 && itm.x > glb_canvas.width + 200){
						itm.x = -(200 + this.mid[0].width + Math.round(Math.random() * 150 - 75));
					}
					
					itm.draw(0,0);
				}
				break;
			case 2:
				for(var i=0;i<this.fore.length;i++){
					var itm = this.fore[i];
					
					itm.x -= tmpdirection * 10;
					
					if(tmpdirection > 0 && itm.x + this.fore[2].width < -350){
						itm.x = 350 + glb_canvas.width + Math.round(Math.random() * 150 - 75);
					}else if(tmpdirection < 0 && itm.x > glb_canvas.width + 350){
						itm.x = -(350 + this.fore[2].width + Math.round(Math.random() * 150 - 75));
					}
					
					itm.draw(0,0);
				}
				break;
			case 3: //360
				tmpdirection *= -20;
				for(var i=0;i<this.fore.length;i++){
					var itm = this.fore[i];
					
					itm.x -= tmpdirection;
					
					if(tmpdirection > 0 && itm.x + this.fore[2].width < -2750){
						itm.x = 2750 + glb_canvas.width + Math.round(Math.random() * 200 - 100);
					}else if(tmpdirection < 0 && itm.x > glb_canvas.width + 2750){
						itm.x = -(2750 + this.fore[2].width + Math.round(Math.random() * 200 - 100));
					}
					
					itm.draw(0,0);
				}
				break;
			case 4: //360 ek
				tmpdirection *= -20;
				for(var i=0;i<this.fore.length;i++){
					if(i==2 || i==3) continue;
					
					var itm = this.fore[i];
					
					itm.x -= tmpdirection;
					
					if(tmpdirection > 0 && itm.x + this.fore[2].width < -500){
						itm.x = 500 + glb_canvas.width + Math.round(Math.random() * 200 - 100);
					}else if(tmpdirection < 0 && itm.x > glb_canvas.width + 500){
						itm.x = -(500 + this.fore[2].width + Math.round(Math.random() * 200 - 100));
					}
					
					itm.draw(0,-170);
				}
				break;
		}
	}
};