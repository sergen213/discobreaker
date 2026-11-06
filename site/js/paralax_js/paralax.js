/**
$(CBI)* ...
$(CBI)* @author gldio
$(CBI)* twitter.com/gldio
$(CBI)* blog.41-29.com
$(CBI)*/

var TYPE_IMAGE = 1;
var IMG_DIR = "/paralax_img/";
var GLOBAL_FPS = 1000 / 25;

var glb_canvas = null;
var glb_context = null;

var metronomTime = 0;
var glowX = 0;
var glb_direction = 0;
var glb_directionM = 0;
var glb_directionMax = 5;

var mouseX = 0;
var mouseY = 0;

var updateIntv = 0;

var crowdMid = null;
var crowdFore = null;
var crowdBg = null;
var imgBg = null;
var imgGlow = null;
var imgVinyet = null;
var imgGuideBg = null;
var imgGuideOk = null;
var imgGuideAdam = null;

var blackScr = null;

var imgGuideXMax = 50;
var imgGuideXSpeed = 2;
var imgGuideX = 0;

var time = 0;
var metronomTimes = [];
var metronomFinalScene = 0;
var metronomFinalScene2 = 0;

function paralaxInit(_canvas){
	if(window.opener) offsetTime = window.opener.offsetTime;
	
	time = 0;
	metronomTimes = [280,760,1240,1680,2160,2640,3080,3560,4040,4480,4960,5440,5880,6360,6800,7280,7760,8200,8680,9160,9600,10080,10520,11000,11240,11480,11920,12400,12880,13320,13800,14240];
	
	for(var i=0;i<metronomTimes.length;i++){ metronomTimes[i] += offsetTime; }
	
	metronomFinalScene = metronomTimes[metronomTimes.length-5];
	metronomFinalScene2 = metronomTimes[metronomTimes.length-3];
	
	glb_canvas = _canvas;
	glb_canvas.width = 900;
	glb_canvas.height = 400;
	
    glb_context = glb_canvas.getContext("2d");
    
    //blackScr = new customSquare();
    //blackScr.setup(0, "rgba(0,12,23,1)", 0, 0, glb_canvas.width, glb_canvas.height);
    
    imgGlow = new customImage();
    imgGlow.setup(0, IMG_DIR + "Paralax_bigglow_00000.png", 0, 0, 1, 1, 0, 1, function(){});
    
    imgVinyet = new customImage();
    imgVinyet.setup(0, IMG_DIR + "vinyet.png", 0, 0, 1.2, 1, 0, .5, function(){});
	
	imgBg = new customImage();
	imgBg.setup(0, IMG_DIR + "BG_tile.jpg", 0, 0, 1, 1, 0, 1, function(){});
	
	imgGuideBg = new customImage();
	imgGuideBg.setup(0, IMG_DIR + "paralax_guide_bg.png", 18, 325, 1, 1, 0, 1, function(){});
	
	imgGuideOk = new customImage();
	imgGuideOk.setup(0, IMG_DIR + "paralax_guide_ok.png", 83, 343, 1, 1, 0, .75, function(){});
	
	imgGuideAdam = new customImage();
	imgGuideAdam.setup(0, IMG_DIR + "paralax_guide_adam.png", 28, 343, 1, 1, 0, .5, function(){});
    
	crowdBg = new crowdMidFore();
	crowdBg.lineArr = ["CrowdBG/crowd_paralax_1_Precomp__0000"];
	crowdBg.speed = 2;
	crowdBg.itemYAdd = -48;
	crowdBg.setup();
	
	crowdMid = new crowdMidFore();
	crowdMid.lineArr = ["Crowdmid/Group_EEE 2_Couple_0000","Crowdmid/Group_KEK 2_v5_LONER_0000","Crowdmid/Group_EEE3_v2_0000",
	          "Crowdmid/Group_KEE 2_v2_0000","Crowdmid/Group_KEK 2_v2_0000",
              "Crowdmid/Group_KEK 2_v5_Couple_0000","Crowdmid/Group_EEE 2_LONER_0000"];
	crowdMid.speed = 3;
	crowdMid.itemSpace = 75;
	crowdMid.itemYAdd = 20;
	crowdMid.setup();
	
	crowdFore = new crowdMidFore();
	crowdFore.lineArr = ["Crowdfore/Group_EEE 2_Couple Fore _0000","Crowdfore/Group_EEE 2_LONER Fore _0000","Crowdfore/Group_KEK 2_v2 Fore _0000",
	                     "Crowdfore/Group_KEK 2_v5_Couple Fore _0000","Crowdfore/Group_KEK 2_v5_LONER Fore _0000"];
	crowdFore.speed = 8;
	crowdFore.itemSpace = 200;
	crowdFore.setup();
	
	dansci.setup();
	
	particles.setup();
	
	geosekil.setup();
}

function paralaxStart(){
	if(window.opener) document.getElementById('content').appendChild(glb_canvas);
	paralaxResume();
}

function paralaxPause(){
	window.removeEventListener("mousemove",paralaxMouseMove,false);
	clearInterval(updateIntv);
}

function paralaxResume(){
	window.addEventListener("mousemove",paralaxMouseMove,false);
	updateIntv = setInterval(paralaxUpdate, GLOBAL_FPS);
}

function paralaxMouseMove (e){
	mouseX = e.clientX;
	mouseY = e.clientY;
}

function paralaxDrawGuide(){
	imgGuideX += imgGuideXSpeed;
	if(imgGuideX>imgGuideXMax || imgGuideX < 0) imgGuideXSpeed *= -1;
	
	imgGuideBg.draw(0,0);
	imgGuideAdam.draw(imgGuideX,0);
	imgGuideOk.draw(-imgGuideX,0);
}

function controlMouse(){
	if(time >= metronomFinalScene || dansci.waitAnimMouse > 0) return;
	
	/*if(mouseY < 0 || mouseX > glb_canvas.width){
		glb_directionM = 0;
		return;
	}*/
	
	//////////////
	if(mouseX > glb_canvas.width * .5) glb_directionM = ((mouseX - (glb_canvas.width * .5)) / (glb_canvas.width * .5)) * glb_directionMax;
	else glb_directionM = -glb_directionMax + (mouseX / (glb_canvas.width * .5) * glb_directionMax);
}

function paralaxUpdate(){
	controlMouse();
	
	glb_direction -= (glb_direction - glb_directionM) * .35;
	
	glb_context.clearRect(0,0,glb_canvas.width,glb_canvas.height);
	
	imgBg.draw(0,0);
	
	geosekil.update(0);
	
	crowdBg.update();
	
	if(metronomTime < 2) imgGlow.draw(glowX,0);
	
	geosekil.update(1);
	
	particles.update(1);
	
	if(dansci.animType == 1) dansci.update();
	
	crowdMid.update();
	
	if(dansci.animType == 0 || dansci.animType == 2) dansci.update();
	
	particles.update(0);
	
	crowdFore.update();
	
	if(metronomTime < 1) imgGlow.draw(glowX,0);
	
	geosekil.update(2);
	
	imgVinyet.draw(0,0);
	
	paralaxDrawGuide();
	
	/*if(blackScr.alpha > 0){
		blackScr.setAlpha(blackScr.alpha - .05);
		blackScr.draw();
	}*/
	
	metronomTime++;
	if(window.opener) time = window.opener.time;// else time += 25;
	
	if(metronomTime == 0){
		glowX = (glb_canvas.width * .8) - Math.floor(Math.random() * 600) - 300;
	}
	
	for(var i = 0;i < metronomTimes.length;i++){
		if(time >= metronomTimes[i] - 50 && time <= metronomTimes[i] + 50){
			metronomTime = 0;
			metronomTimes.splice(i, 1);
			break;
		}
	}
	
	if(window.opener && window.opener.time > data.endtime + offsetTime){
		clearInterval(updateIntv);
		window.close();
	}
}