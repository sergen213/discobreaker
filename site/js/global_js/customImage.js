/**
$(CBI)* ...
$(CBI)* @author gldio
$(CBI)* twitter.com/gldio
$(CBI)* blog.41-29.com
$(CBI)*/

function customImage() {

    this.type = TYPE_IMAGE;
    this.x = 0;
    this.y = 0;
    this.width = 0;
    this.height = 0;
    
    this.scaleX = 0;
    this.scaleY = 0;
    this.alpha = 0;
    this.maskClipArray = [];
    this.index = 0;

    this.img = new Image();
    this.loaded = false;

    this.animLoop = false;
    this.animPlay = false;
    this.animFPS = 1;
    
    this.effectArr = [];

    var rotation = 0;
    var pivotPointX = null;
    var pivotPointY = null;
    var animFrame = 0;
    var animFPSCount = 1;
    var animArray = [];
    var animWidth = 0;
    var animHeight = 0;
    
    this.context = null;
    
    var dispatchLoadedFunc = null;

    this.setup = function (_index, _src, _imgX, _imgY, _scaleX, _scaleY, _rotation, _alpha, _dispatchLoadedFunc) {
        this.index = _index;
        this.x = _imgX;
        this.y = _imgY;
        this.scaleX = _scaleX;
        this.scaleY = _scaleY;
        this.alpha = _alpha;
        dispatchLoadedFunc = _dispatchLoadedFunc;
        
        this.context = glb_context;

        this.setRotation(_rotation);
        
        var cImg = this;
        this.img.addEventListener("load", function(){ cImg.setLoadedImage(); }, false);
        this.img.addEventListener("error", function (e) { /*console.log("image error:" + e.target.src);*/ }, false);
        this.img.src = _src;
    };

    this.setLoadedImage = function () {    	
        this.setScale(this.scaleX, this.scaleY);
        
        this.loaded = true;

        if(dispatchLoadedFunc) dispatchLoadedFunc(this.index, this);
        dispatchLoadedFunc = null;
    };

    this.setSpriteAnimation = function (_matrisX, _matrisY, _animWidth, _animHeight, _play, _loop) {
        for (var i = 0; i < _matrisX; i++) {
            for (var k = 0; k < _matrisY; k++) {
                animArray.push({ x: _animWidth * i, y: _animHeight * k });
            }
        }
        
        this.animLoop = _loop;
        this.animPlay = _play;
        animWidth = _animWidth;
        animHeight = _animHeight;

        this.setScale(this.scaleX, this.scaleY);
    };

    this.getAnimTotalFrames = function () { return animArray.length - 1; };
    this.getAnimCurrentFrame = function () { return animFrame; };
    this.setAnimFrame = function (_i) {
        animFrame = Math.round(_i);
        animFrame = animFrame >= animArray.length ? animArray.length - 1 : animFrame;
        animFrame = animFrame < 0 ? 0 : animFrame;
    };
    
    this.addEffect = function (_effect) { this.effectArr.push(_effect); };
    this.removeEffect = function (_index) { this.effectArr.splice(_index, 1); };

    this.setScale = function (_x, _y) {
        this.scaleX = _x;
        this.scaleY = _y;

        if (animArray.length < 1) {
            this.width = this.img.width * Math.abs(this.scaleX);
            this.height = this.img.height * Math.abs(this.scaleY);
        } else {
            this.width = animWidth * Math.abs(this.scaleX);
            this.height = animHeight * Math.abs(this.scaleY);
        }

        //this.x += Math.floor((0 - this.width) / 2);
        //this.y += Math.floor((0 - this.height) / 2);

        if(pivotPointX == null) pivotPointX = this.width / 2;
        if(pivotPointY == null) pivotPointY = this.height / 2;
    };
    
    this.setPivotPoint = function(_x, _y){ pivotPointX = _x; pivotPointY = _y; };
    this.getPivotPoint = function(){ return {x:pivotPointX, y:pivotPointY}; };

    this.setAlpha = function (_n) { this.alpha = _n < 0 ? 0 : (_n > 1 ? 1 : _n); };
    this.getRotation = function () { return rotation / Math.PI * 180; };
    this.setRotation = function (_n) { rotation = _n * Math.PI / 180; };
    
    this.getBounds = function(){
    	if(pivotPointX == null || pivotPointY == null) return {left:0,top:0,right:0,bottom:0};
    	
    	var t = new Transform();
        t.translate(pivotPointX, pivotPointY);
        t.rotate(rotation);
        t.translate(-pivotPointX, -pivotPointY);
        
        var newX = Math.cos(rotation) * this.width - Math.sin(rotation) * this.height;
        var newY = Math.sin(rotation) * this.width + Math.cos(rotation) * this.height;
        
        var left = this.x + t.m[4]; var top = this.y + t.m[5];
        var right = this.x + t.m[4] + newX; var bottom = this.y + t.m[5] + newY;
        
        return {left:(left<right?left:right), top:(top<bottom?top:bottom), right:right>left?right:left, bottom:bottom>top?bottom:top};
    };

    this.draw = function (_parentX, _parentY) {
    	if(!this.img) return;
    		
    	this.context.save();

        if (this.maskClipArray.length > 0) {
        	this.context.strokeStyle = "rgba(0,0,0,1)";
        	this.context.fillStyle = "rgba(0,0,0,1)";
        	this.context.beginPath();
            this.context.moveTo(_parentX + this.maskClipArray[0].x, _parentY + this.maskClipArray[0].y);
            for (var i = 0; i < this.maskClipArray.length; i++) this.context.lineTo(_parentX + this.maskClipArray[i].x, _parentY + this.maskClipArray[i].y);
            this.context.lineTo(_parentX + this.maskClipArray[0].x, _parentY + this.maskClipArray[0].y);
            this.context.closePath();

            this.context.clip();
        }
        
        this.context.translate(_parentX + this.x + pivotPointX, _parentY + this.y + pivotPointY);
        this.context.rotate(rotation);
        this.context.scale(this.scaleX<0?-1:1, this.scaleY<0?-1:1);
        this.context.translate(-_parentX + -this.x - pivotPointX, -_parentY + -this.y - pivotPointY);
        
        this.context.globalAlpha = this.alpha;
        
        for(var i = this.effectArr.length - 1;i > -1; i--){ this.effectArr[i].update(); if(this.effectArr[i].finished) this.removeEffect(i); }

        if (animArray.length < 1) {
        	this.context.drawImage(this.img, _parentX + this.x, _parentY + this.y, this.width, this.height);
        } else {
            if (this.animPlay) {
                if (animFPSCount == this.animFPS) {
                    animFrame++;
                    animFPSCount = 0;
                    if (animFrame >= animArray.length) {
                        if (!this.animLoop) this.animPlay = false;
                        animFrame = 0;
                    }
                }
                animFPSCount++;
            }
            
            this.context.drawImage(this.img, animArray[animFrame].x, animArray[animFrame].y, animWidth, animHeight, _parentX + this.x, _parentY + this.y, this.width, this.height);
        }

        this.context.restore();
    };
};