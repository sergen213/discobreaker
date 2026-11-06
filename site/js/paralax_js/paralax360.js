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

var metronomTime = 1;
var glowX = 0;
var glb_direction = 0;
var glb_directionM = 0;
var glb_directionMax = 5;

var mouseX = 0;
var mouseY = 0;

var updateIntv = 0;

var imgBg = null;
var crowdFore = null;
var crowdBg = null;
var imgGlow = null;
var imgVinyet = null;
var imgBurn = null;
var imgGuideBg = null;
var imgGuideOk = null;
var imgGuideAdam = null;

var imgGuideXMax = 50;
var imgGuideXSpeed = 2;
var imgGuideX = 0;

var ekPopup = null;

var time = 0;
var metronomTimes = [];
var metronomFinalScene = 0;
var offsetTime = 0;

//////////////
function paralax360Init(_canvas, _fbName){
	if(window.opener) offsetTime = window.opener.offsetTime;
	
	time = 0;
	metronom360Times = [75160,75640,76120,76560,77040,77520,77960,78440,78920,79360,79840,80280,80760,81240,81680,82160,82600,83080,83560,84000,84480,84960,85400,85880,86360,86800,87280,87720,88200,88680,89120,89600,90080,90520];
	metronomFinalScene = 90960 + offsetTime;
	
	for(var i=0;i<metronomTimes.length;i++){ metronomTimes[i] += offsetTime; }
	
	glb_canvas = _canvas;
	glb_canvas.width = 900;
	glb_canvas.height = 400;
	
	glb_context = glb_canvas.getContext("2d");
	
	blackScr = new customSquare();
    blackScr.setup(0, "rgba(255,255,255,1)", 0, 0, glb_canvas.width, glb_canvas.height);
    
    imgVinyet = new customImage();
    imgVinyet.setup(0, IMG_DIR + "vinyet.png", 0, 0, 1.2, 1, 0, 1, function(){});
	
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
	crowdBg.globalY = 40;
	crowdBg.maxMetronomTime = 1;
	crowdBg.setup();
	
	crowdFore = new crowdMidFore();
	crowdFore.lineArr = ["Crowdfore/Group_EEE 2_Couple Fore _0000","Crowdfore/Group_EEE 2_LONER Fore _0000","Crowdfore/Group_KEK 2_v2 Fore _0000",
	                     "Crowdfore/Group_KEK 2_v5_Couple Fore _0000","Crowdfore/Group_KEK 2_v5_LONER Fore _0000"];
	crowdFore.speed = 10;
	crowdFore.itemSpace = 500;
	crowdFore.globalScale = 1.5;
	crowdFore.direction = -1;
	crowdFore.globalY = 120;
	crowdFore.maxMetronomTime = 1;
	crowdFore.setup();

	imgBurn = new customImage();
	imgBurn.setup(0, IMG_DIR + "360/_bottom_burn.png", 0, 0, 1, 1, 0, 1, function(){});
	
	beduk.setup();
	
	dansci360.setup();
	
	particles.setup();
	
	geosekil.setup(true);
	
	strobes.setup();
	
	fb_text.setup(_fbName);
	
	finalScene360.setup();
}

function paralax360Pause(){
	window.removeEventListener("mousemove",paralax360MouseMove,false);
	clearInterval(updateIntv);
}

function paralax360Resume(){
	window.addEventListener("mousemove",paralax360MouseMove,false);
	updateIntv = setInterval(paralax360Update, GLOBAL_FPS);
}

function paralax360SetEkPopup(_ekPopup){ ekPopup = _ekPopup; }

function paralax360Start(){
	paralax360Resume();
}

function paralax360MouseMove (e){
	mouseX = e.clientX;
	mouseY = e.clientY;
}

function controlMouse360(){
	if(time >= metronomFinalScene || beduk.waitAnimMouse > 0) return;
	
	/*if(mouseY < 0 || mouseX > glb_canvas.width){
		glb_directionM = 0;
		return;
	}*/
	
	//////////////
	if(mouseX > glb_canvas.width * .5) glb_directionM = ((mouseX - (glb_canvas.width * .5)) / (glb_canvas.width * .5)) * glb_directionMax;
	else glb_directionM = -glb_directionMax + (mouseX / (glb_canvas.width * .5) * glb_directionMax);
}

function paralaxDrawGuide360(){
	imgGuideX += imgGuideXSpeed;
	if(imgGuideX>imgGuideXMax || imgGuideX < 0) imgGuideXSpeed *= -1;
	
	imgGuideBg.draw(glb_canvas.width * .85,0);
	imgGuideAdam.draw(glb_canvas.width * .85 + imgGuideX,0);
	imgGuideOk.draw(glb_canvas.width * .85 - imgGuideX,0);
}

var imgBurnX1 = 0, imgBurnX2 = null;
function drawImageBurn(){
	if(imgBurn.width < 2) return;
	
	if(imgBurnX2 == null) imgBurnX2 = imgBurn.width;
	
	var tmpspeed = glb_direction * 3;
	var maxWidth = imgBurn.width;
	
	imgBurnX1 -= tmpspeed;
	if(glb_direction > 0 && imgBurnX1 <= -maxWidth) imgBurnX1 = imgBurnX2 + maxWidth - tmpspeed;
	else if(glb_direction < 0 && imgBurnX1 > glb_canvas.width) imgBurnX1 = imgBurnX2 - maxWidth - tmpspeed;
	
	imgBurnX2 -= tmpspeed;
	if(glb_direction > 0 && imgBurnX2 <= -maxWidth) imgBurnX2 = imgBurnX1 + maxWidth - tmpspeed;
	else if(glb_direction < 0 && imgBurnX2 > glb_canvas.width) imgBurnX2 = imgBurnX1 - maxWidth - tmpspeed;
	
	imgBurn.draw(imgBurnX1, 90);
	imgBurn.draw(imgBurnX2, 90);
}

function paralax360Update(){
	controlMouse360();
	
	glb_direction -= (glb_direction - glb_directionM) * .35;
	
	glb_context.clearRect(0,0,glb_canvas.width,glb_canvas.height);
	
	//dansci360.drawLight();
	
	imgBg.draw(0,0);
	
	geosekil.update(0, 1.2);
	
	crowdBg.update();
	
	strobes.update(false);
	
	strobes.update(true);
	
	if(time < metronomFinalScene) beduk.update(); else finalScene360.update();
	
	geosekil.update(1, .8);
	
	particles.update(1);
	
	drawImageBurn();

	dansci360.update();
	
	particles.update(0, -1);
	
	crowdFore.update(time < metronomFinalScene);
	
	geosekil.update(3);
	
	imgVinyet.draw(0,0);
	
	paralaxDrawGuide360();
	
	if(blackScr.alpha > 0){
		blackScr.setAlpha(blackScr.alpha - .05);
		blackScr.draw();
	}
	
	if(ekPopup){
		ekPopup.update360EkDirection(glb_direction);
		ekPopup.update360EkMetronom(metronomTime);
		ekPopup.update360EkFinalScene(time >= metronomFinalScene);
	}
	
	metronomTime++;
	if(window.opener) time = window.opener.time;// else time += 40;

	for(var i = 0;i < metronom360Times.length;i++){
		if(time >= metronom360Times[i] - 50 && time <= metronom360Times[i] + 50){
			metronomTime = 0;
			metronom360Times.splice(i, 1);
			break;
		}
	}
	
	if(window.opener && data && window.opener.time > data.endtime + offsetTime){
		clearInterval(updateIntv);
		if(ekPopup) ekPopup.close();
		window.close();
	}
}