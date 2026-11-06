/**
$(CBI)* ...
$(CBI)* @author gldio
$(CBI)* twitter.com/gldio
$(CBI)* blog.41-29.com
$(CBI)*/

var TYPE_SQUARE = 2;
function customSquare() {

    this.type = TYPE_SQUARE;
    this.context = null;
    this.x = 0;
    this.y = 0;
    this.width = 0;
    this.height = 0;
    this.alpha = 1;
    this.color = 0;
    this.borderColor = 0;
    this.borderSize = 0;
    this.scaleX = 1;
    this.scaleY = 1;

    this.setup = function (_index, _color, _x, _y, _width, _height) {
        this.index = _index;
        this.color = _color;
        this.x = _x;
        this.y = _y;
        this.width = _width;
        this.height = _height;
        
        this.context = glb_context;
    };

    this.setAlpha = function (_n) { this.alpha = _n < 0 ? 0 : (_n > 1 ? 1 : _n); };
    
    this.draw = function () {
    	if(!this.context) return;
    	
    	var _parentX = arguments[0]?arguments[0]:0;
    	var _parentY = arguments[1]?arguments[1]:0;
    	var _calpha = arguments.length > 2?arguments[2]:1;
    	
    	var cX = _parentX + this.x, cY = _parentY + this.y;
    	
    	this.context.save();

    	this.context.translate(cX, cY);
    	this.context.scale(this.scaleX, this.scaleY);
    	this.context.translate(-cX, -cY);
    	
    	if(this.scaleX < 0) cX -= this.width;
    	if(this.scaleY < 0) cY -= this.height;
    	
        this.context.globalAlpha = this.alpha * _calpha;
        
        this.context.fillStyle = this.color;
        this.context.fillRect(cX, cY, this.width, this.height);
        
        if (this.borderSize > 0) {
        	this.context.strokeStyle = this.borderColor;
        	this.context.lineWidth = this.borderSize;
        	this.context.strokeRect(cX - this.borderSize / 2, cY - this.borderSize / 2, this.width + this.borderSize, this.height + this.borderSize);
        }

        this.context.restore();
    };
};