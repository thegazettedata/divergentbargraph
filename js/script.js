// STORE MIDPOINT VALUE FOR DATA
	var midPoint = 5.4;

// STORE HIGHEST VALUE IN DATA
	var highValue = 10.5;

// STORE LOWEST VALUE IN DATA
	var lowValue = 2.6;

// FOR UPCOMING FOR LOOP, STORE VAR NAME FROM JSON FILE
	var jsonVarName = immIndustryJSON;

// STORE JSON STRING CORRESPONDING WITH NUMERIC DATA OF INTEREST
	var numData = "pct-foreign-born";

// CHOOSE A BAR WIDTH PERCENTAGE FOR LEFT AND RIGHT SIDES (SEE LINE 44). MULTIPLY TIMES 100 FOR CLASS PERCENTAGE, OR A LITTLE LESS TO LEAVE SOME ELBOW ROOM OUTSIDE OF COLORED BARS
	var pctBarWidthLessSpace = 95;

// this identifies maximum value for rightward bar and leftward bar
	if( (highValue - midPoint) > (midPoint - lowValue) ) {
		var highValueBarWidth = (highValue - midPoint);
		var lowValueBarWidth = highValueBarWidth;
	} 
	else {
		var lowValueBarWidth = (midPoint - lowValue);
		var highValueBarWidth = lowValueBarWidth;
	};	

for (var i = 0; i < jsonVarName.length; i++) {

// store data amount	
	var storedDataAmount = jsonVarName[i][numData];

// calculate and store deviation from mid point
	var deviation = Math.abs((midPoint - storedDataAmount));

// store row name
	var storedRowName = jsonVarName[i]["industry"];


// if-else also to determine which way bar is going and which label to display, not display

	if(storedDataAmount < midPoint) {
		var leftBarWidth = (deviation/lowValueBarWidth)*pctBarWidthLessSpace;
		var rightBarLabelDisplay = 0;	
		var leftBarLabelDisplay = "inline";
		var rightBarDisplay = "none";
	}
	else {
		var rightBarLabelDisplay = (deviation/highValueBarWidth)*pctBarWidthLessSpace;
		var leftBarWidth = 0;
		var rightBarDisplay = "inline";
		var leftBarLabelDisplay = "none";
	};

	var barChart = "";
		barChart += "<div class='labelContainer'>" + storedRowName + "</div>";
		barChart += "<div class='leftBarContainer'>";
		barChart += "<div class='leftBar' style='width:" + leftBarWidth + "%;'>";
		// if bar width is less than 10% of total length, we'll display number outside of bar
		if(leftBarWidth < 10) {
			leftBarLabelDisplay = "none";
			var leftBarLabelOuter = "inline";
			barChart += "</div>";

			if(leftBarWidth !== 0) {
				barChart += "<div class='leftBarLabelOutside' style='display:" + leftBarLabelOuter + "'>" + storedDataAmount + "</div>";
			};
		} 
		else {
			leftBarLabelOuter= "none";
		};
	
		barChart += "<div class='leftBarLabel' style='display:" + leftBarLabelDisplay + "'>" + storedDataAmount + "</div></div></div>";
		barChart += "<div class='midLine'></div>";
		barChart += "<div class='rightBarContainer'>";
		barChart += "<div class='rightBar' style='width:" + rightBarLabelDisplay + "%;'>"
		barChart += "<div class='rightBarLabel' style='display:" + rightBarDisplay + "'>" + storedDataAmount + "</div></div></div>";
		barChart += "<div style='clear:both;'></div>";

	$(".container").append(barChart);
	
	$("span.midpoint-subtitle").html(midPoint);
	$("div.atop-div").html(midPoint + '%');
	$("div.below-div").html(midPoint + '%');
}
