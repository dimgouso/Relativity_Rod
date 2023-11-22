var rodRed=0;
var rodGreen=255;
var rodBlue=179;
var wireframeRed=255;
var wireframeGreen=0;
var wireframeBlue=0;
var styleWireframe=0;
var styleOpaque=1;
var properLength=150;
var properHeight=35;
var rodInitX=150;
var rodStationaryTop=180;
var rodMovingTop=80;
var rodVx=0;
var rodStationary=new rod(rodInitX,rodStationaryTop,properLength,properHeight,0,0,context,styleOpaque);
var rodMoving=new rod(rodInitX,rodMovingTop,properLength,properHeight,rodVx,0,context,styleOpaque);
var rodWireframe=new rod(rodInitX-1,rodStationaryTop-1,properLength+2,properHeight+2,0,0,context,styleWireframe);
var relativeLength=0;
var inplaceComparison=false;

var gama=0;
var lengthToShow;

function initialiseExperiment(){
	experimentInitialised=false;
	initGUI();
	//drawWidth.value=1;
	rodMoving.Ux=0;
	setRodVelocity(rodMoving.Ux);
	reset();
	experimentInitialised=true;
	drawScene();
}

function initialiseRods(){
	rodMoving.left=rodStationary.left;
	setRodColor();
}

function nextFrame(){
	rodMoving.move();
	if(rodMoving.left>canvas.width){
		rodMoving.left=-rodMoving.width;
	}
	drawScene();
}

function reset(){
	initialiseRods();
	drawScene();
}
function drawScene(){
	if (experimentInitialised){
		clearGraphics();
		showGrid();
		drawRods();
	}
}

function setRodColor(){
	rodStationary.setColor(rodRed,rodGreen,rodBlue);
	rodMoving.setColor(rodRed,rodGreen,rodBlue);
	rodWireframe.setColor(wireframeRed,wireframeGreen,wireframeBlue);
}

function setRodVelocity(newValue){
	rodMoving.Ux=newValue/100;
	gama=1-Math.pow(newValue/1000,2);
	relativeLength=Math.sqrt(gama);
	lengthToShow=parseInt(1000*relativeLength)/1000;
	var info="";
	if(lengthToShow==1){
		info="L";
	}
	else{
		info=lengthToShow+"L";
	}
	$("#finalLength").html(info);
	var vToShow=parseInt(10*newValue)/10000;
	rodMoving.width=rodStationary.width*lengthToShow;
	rodWireframe.width=rodMoving.width;
	$("#rodV").html("υ="+vToShow+"c");
	drawScene();
}

function drawRods(){
	rodStationary.show();
	rodMoving.show();
	context.strokeStyle="rgb(0,0,0)";
	context.beginPath();
	//οριζόντιο μήκος
	context.moveTo(rodMoving.left,rodMoving.top-5);
	context.lineTo(rodMoving.left+rodMoving.width,rodMoving.top-5);
	//αριστερό βέλος
	context.moveTo(rodMoving.left+5,rodMoving.top-10);
	context.lineTo(rodMoving.left,rodMoving.top-5);
	context.lineTo(rodMoving.left+5,rodMoving.top);
	//δεξί βέλος
	context.moveTo(rodMoving.left+rodMoving.width-5,rodMoving.top-10);
	context.lineTo(rodMoving.left+rodMoving.width,rodMoving.top-5);
	context.lineTo(rodMoving.left+rodMoving.width-5,rodMoving.top);
	context.stroke();
	context.font="16px Georgia";
	context.strokeStyle="#ff7800";
	var textToShow=parseInt(1000*lengthToShow)/10+"%";
	context.strokeText(textToShow,rodMoving.left+(rodMoving.width-context.measureText(textToShow).width)/2,rodMoving.top-15); 
	if (inplaceComparison){
		rodWireframe.show();
		context.setLineDash([3]);
		context.strokeStyle="rgb(0,0,255)";
		context.beginPath();
		context.moveTo(rodMoving.left,rodMoving.top+rodMoving.height);
		context.lineTo(rodWireframe.left,rodWireframe.top);
		context.moveTo(rodMoving.left+rodMoving.width,rodMoving.top+rodMoving.height);
		context.lineTo(rodWireframe.left+rodWireframe.width,rodWireframe.top);
		context.stroke();
		context.setLineDash([]);
	}
}