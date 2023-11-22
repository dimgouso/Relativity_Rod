/**
 * 
 */
function rod(left,top,width,height,Ux,Uy,cntx,style){
	this.left=left;
	this.top=top;	
	this.width=width;
	this.height=height;
	this.Ux=Ux;
	this.Uy=Uy;
	this.mCntx=cntx;
	this.drawingStyle=style;
	
	var mRed=255;
	var mGreen=0;
	var mBlue=0;

	this.move=function(){
		this.left+=this.Ux;
		this.top+=this.Uy;
	};
	
	this.show=function(){
		this.setDrawingColor();
		//this.mCntx.beginPath();
		if(this.drawingStyle==0){
			this.mCntx.strokeRect(this.left,this.top,this.width,this.height);
			//this.mCntx.stroke();
		}
		else{
			this.mCntx.fillRect(this.left,this.top,this.width,this.height);
			//this.mCntx.fill();
		}
	};

	this.setDrawingColor=function(){
		var RedToUse=mRed;
		var GreenToUse=mGreen;
		var BlueToUse=mBlue;
		this.mCntx.strokeStyle="rgb("+RedToUse+","+GreenToUse+","+BlueToUse+")";
		this.mCntx.fillStyle="rgb("+RedToUse+","+GreenToUse+","+BlueToUse+")";
	};
	
	this.setColor=function(newRed,newGreen,newBlue){
		mRed=newRed;
		mGreen=newGreen;
		mBlue=newBlue;
	};
}