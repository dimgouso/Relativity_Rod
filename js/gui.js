//controls
var gui=new dat.GUI();
var simSwitch,simulationSpeed,showGrd,grdStep,rodColor,wireframeColor,rodSpeed,insituComparison;

var controls=function() {
	this.simulationSwitch=false;
	this.simulationSpeed=simSpeed;
	this.showGrid=gridVisible;
	this.gridStep=gridStep;
    this.rodColor=[rodRed,rodGreen,rodBlue];
    this.wireframeColor=[wireframeRed,wireframeGreen,wireframeBlue];
    this.rodSpeed=rodVx;
    this.insituComparison=inplaceComparison;
};
var cntrls=new controls();

function initGUI(){
	
	if (simSwitch){
		gui.remove(simSwitch);
		simSwitch=null;
	}
	if (simulationSpeed){
		gui.remove(simulationSpeed);
		simulationSpeed=null;
	}
	if (showGrd){
		gui.remove(showGrd);
		showGrd=null;
	}
	if (grdStep){
		gui.remove(grdStep);
		grdStep=null;
	}
	if (rodColor){
		gui.remove(rodColor);
		rodColor=null;
	}
	if (wireframeColor){
		gui.remove(wireframeColor);
		wireframeColor=null;
	}
	if (rodSpeed){
		gui.remove(rodSpeed);
		rodSpeed=null;
	}
	if (insituComparison){
		gui.remove(insituComparison);
		insituComparison=null;
	}
	
	gui.width=350;	

    simSwitch=gui.add(cntrls,"simulationSwitch").listen().name("Simulation");
    simSwitch.onChange(function(newValue){
    	reset();
    	simulating=newValue;
    	handleTimer(false);
    });

	simulationSpeed=gui.add(cntrls,"simulationSpeed",1,20).step(1).name("Speed of Simulation");
	simulationSpeed.onChange(function(newValue){
		simSpeed=newValue;
		defineSimulationSpeed();
    });
	
	showGrd=gui.add(cntrls,"showGrid").listen().name("Grid");
	showGrd.onChange(function(newValue){
		gridVisible=newValue;
		drawScene();
	});
	
	grdStep=gui.add(cntrls,"gridStep",1,5).step(1).name("Grid Step");
	grdStep.onChange(function(newValue){
		gridStep=newValue;
		drawScene();
    });

    rodSpeed=gui.add(cntrls,"rodSpeed",0,999).step(1).name("Rod speed (%c)");
    rodSpeed.onChange(function(newValue){
    	setRodVelocity(newValue);
    });
    
    insituComparison=gui.add(cntrls,"insituComparison").listen().name("Comparison");
    insituComparison.onChange(function(newValue){
    	inplaceComparison=newValue;
    	drawScene();
    });

    rodColor=gui.addColor(cntrls,"rodColor").name("Color of rod");
    rodColor.onChange(function(value){
		rodRed=parseInt(value[0]);
		rodGreen=parseInt(value[1]);
		rodBlue=parseInt(value[2]);
		setRodColor();
		drawScene();
    });
    
    wireframeColor=gui.addColor(cntrls,"wireframeColor").name("Color of the frame");
    wireframeColor.onChange(function(value){
    	wireframeRed=parseInt(value[0]);
    	wireframeGreen=parseInt(value[1]);
    	wireframeBlue=parseInt(value[2]);
		setRodColor();
		drawScene();
    });
}