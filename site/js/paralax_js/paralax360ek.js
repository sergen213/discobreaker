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
var updateIntv = 0;

var imgBg = null;
var crowdFore = null;
var crowdBg = null;
var imgGlow = null;
var imgVinyet = null;
var imgBurn = null;
var finalScene = false;

function paralax360EkInit(_canvas){
	//for(var i=0;i<metronom360Times.length;i++) metronom360Times[i] -= 70000;
	
	glb_canvas = _canvas;
	glb_canvas.width = 364;
	glb_canvas.height = 186;
	
	glb_context = glb_canvas.getContext("2d");
	
	blackScr = new customSquare();
    blackScr.setup(0, "rgba(255,255,255,1)", 0, 0, glb_canvas.width, glb_canvas.height);
	
	imgBg = new customImage();
	imgBg.setup(0, IMG_DIR + "BG_tile.jpg", 0, 0, 1, 1, 0, 1, function(){});
    
	crowdBg = new crowdMidFore();
	crowdBg.lineArr = ["CrowdBG/crowd_paralax_1_Precomp__0000"];
	crowdBg.speed = 2;
	crowdBg.itemYAdd = -48;
	crowdBg.globalY = 175;
	crowdBg.maxMetronomTime = 1;
	crowdBg.setup();
	
	geosekil.setup(2);
	
	dansci360Ek.setup();
	
	particles.maxCount = 15;
	particles.setup();
}

function update360EkMetronom(_metronomTime){ paralax360EkUpdate(); metronomTime = _metronomTime; }
function update360EkDirection(_glb_direction){ glb_direction = _glb_direction; }
function update360EkFinalScene(_finalScene){ finalScene = _finalScene; }

function paralax360EkStart(){
	//updateIntv = setInterval(paralax360EkUpdate, GLOBAL_FPS);
}
//////////////
function paralax360EkUpdate(){
	glb_context.clearRect(0,0,glb_canvas.width,glb_canvas.height);
	
	imgBg.draw(0,0);
	
	crowdBg.update();
	
	particles.update(1);
	
	dansci360Ek.update();
		
	geosekil.update(4);
	
	if(blackScr.alpha > 0){
		blackScr.setAlpha(blackScr.alpha - .05);
		blackScr.draw();
	}
	
	/*update360EkDirection(glb_direction - 1);
	update360EkMetronom(metronomTime + 1);
	if(metronomTime > 11) metronomTime = 0;*/
}