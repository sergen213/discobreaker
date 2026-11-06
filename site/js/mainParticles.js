var GLOBAL_FPS;
var mainParticles = {
	
	imgArr: [],
	imgArrSol: [],
	imgArrSag: [],
	maxFrame: 41,
	currentFrame: 0,
	step: 1,
	xspeed: 5,
	yspeed: 5,
	x: 0,
	y: 0,
	prev: null,
	
	loading: true,
	loadItemCount: 0,
	loadedIndex: -1,
	justControlLoading: false,
	
	setup: function(_canvas){
		GLOBAL_FPS = 1000 / 25;
		/*this.canvas = _canvas;
		this.canvas.width = 900;
		this.canvas.height = 400;
		this.canvas.style.marginLeft = "350px";
		
		this.context = this.canvas.getContext("2d");*/
		
		for(var i=0;i<=this.maxFrame;i++){
			var tmpimg = new Image();
			tmpimg.src = IMG_DIR + "360/Ela_render/ELA_main_000" + (i<10?("0"+i):i) + ".png";
			tmpimg.style.display = "none";
			tmpimg.style.marginLeft = "50%";
			tmpimg.addEventListener("load", this.controlLoading, false);
			_canvas.appendChild(tmpimg);
			this.imgArr.push(tmpimg);
			this.loadItemCount++;
			/*var tmpimg = new customImage();
			tmpimg.setup(++this.loadItemCount, IMG_DIR + "360/Ela_render/ELA_main_000" + (i<10?("0"+i):i) + ".png", 0, 0, 1, 1, 0, 1, this.controlLoading);
			tmpimg.context = this.context;
			this.imgArr.push(tmpimg);
			
			var tmpimg2 = new customImage();
			tmpimg2.setup(++this.loadItemCount, IMG_DIR + "360/Ela_sol_burn/ELA_sol_burn_000" + (i<10?("0"+i):i) + ".png", 0, 0, 1, 1, 0, 1, this.controlLoading);
			tmpimg2.context = this.context;
			this.imgArrSol.push(tmpimg2);
			
			var tmpimg3 = new customImage();
			tmpimg3.setup(++this.loadItemCount, IMG_DIR + "360/Ela_sag_burn/ELA_sag_burn_000" + (i<10?("0"+i):i) + ".png", 0, 0, 1, 1, 0, 1, this.controlLoading);
			tmpimg3.context = this.context;
			this.imgArrSag.push(tmpimg3);*/
		}
		
		this.start();
	},
	
	controlLoading: function(){
		mainParticles.loadedIndex++;
		
		mainParticles.loading = mainParticles.loadedIndex >= mainParticles.loadItemCount;
	},
	
	start: function(){
		this.intv = setInterval(this.intvUpdate, GLOBAL_FPS);
	},
	
	intvUpdate: function(){ mainParticles.update(); },
	
	update: function(){
		if(this.loading) return;
		
		/*this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
		
		this.x += this.xspeed;
		this.y += this.yspeed;
		
		if(this.x < 0 || this.x + 209 > this.canvas.width) this.xspeed *= -1;
		if(this.y < 0 || this.y + 330 > this.canvas.height) this.yspeed *= -1;
		
		this.imgArr[this.currentFrame].draw(this.x, this.y);
		this.imgArrSag[this.currentFrame].draw(this.x, this.y);
		this.imgArrSol[this.currentFrame].draw(this.x, this.y);*/
		
		if(this.prev) this.prev.style.display = "none";
		this.prev = this.imgArr[this.currentFrame];
		this.prev.style.display = "block";
		
		this.currentFrame+=this.step;
		
		if(this.currentFrame >= this.maxFrame || this.currentFrame < 0){
			this.step *= -1;
			this.currentFrame+=this.step;
		}
	}
};