
function getDimension(width, height, top, right, bottom, left,padding) {
	return {width: width,
		height: height,
		innerWidth: width - (left + right + padding),
		innerHeight: height - (top + bottom + padding),
		top: top,
		right: right,
		bottom: bottom,
		left: left,
		padding: padding,
		cx: (width - (left + right)) / 2 + left,
		cy: (height - (top + bottom)) / 2 + top};
}

var experimentDimension = getDimension(500, 500, 30, 30, 30, 30, 0);
var timeOverIDDimension = getDimension(540, 350, 30, 30, 30, 50, 20);
var throughputOverIDDimension = getDimension(540, 350, 30, 30, 30, 50, 20);
var TIME_OUT = 2000;

/* Create experiment area SVG*/
var experimentSVG = d3.select('#experiment').append('svg')
	.attr('width', experimentDimension.width)
	.attr('height', experimentDimension.height)
	.style('pointer-events', 'all')
	.on('mousedown', mouseClicked)
	.call(createBackground, experimentDimension);

/* Dimensions for Plots */
var timeOverID_X = d3.scale.linear().domain([0, 6.5]).range([0, timeOverIDDimension.innerWidth]);
var timeOverID_Y = d3.scale.linear().domain([TIME_OUT, 0]).range([0, timeOverIDDimension.innerHeight]);

var TPOverID_X = d3.scale.linear().domain([0, 6.5]).range([0, throughputOverIDDimension.innerWidth]);
var TPOverID_Y = d3.scale.linear().domain([10, 0]).range([0, throughputOverIDDimension.innerHeight]);

// Axis for MS vs ID graph
var effXAxisTID = d3.svg.axis().scale(timeOverID_X).ticks(10).tickPadding(10);
var effYAxisTID = d3.svg.axis().scale(timeOverID_Y).ticks(10).tickPadding(10);
// Axis for TP vs ID graph
var effXAxisTPID = d3.svg.axis().scale(TPOverID_X).ticks(10).tickPadding(10);
var effYAxisTPID = d3.svg.axis().scale(TPOverID_Y).ticks(10).tickPadding(10);

/* Create Time vs ID plot SVG*/
var timeOverIDSVG = d3.select('#timeOverID').append('svg')
	.attr('width', timeOverIDDimension.width)
	.attr('height', timeOverIDDimension.height)
	.call(createBackground, timeOverIDDimension);

var timeOverIDGroup = timeOverIDSVG.append('g').attr('transform', 'translate('+ (timeOverIDDimension.left+timeOverIDDimension.padding) + ',' + timeOverIDDimension.top + ' )');

timeOverIDGroup.append("g").attr("class", "axis").call(effXAxisTID.tickSize(timeOverIDDimension.innerHeight).orient("bottom"));
timeOverIDGroup.append("g").attr("class", "axis").call(effYAxisTID.tickSize(-timeOverIDDimension.innerWidth).orient("left"));

// Titles for axes
timeOverIDGroup.append("text").attr("text-anchor", "middle")
    .attr("transform", "translate("+(-timeOverIDDimension.left)+","+(timeOverIDDimension.height/2-timeOverIDDimension.bottom)+")rotate(-90)")
    .text("Movement Time (ms)");
timeOverIDGroup.append("text").attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
    .attr("transform", "translate("+ (timeOverIDDimension.width/2-timeOverIDDimension.left) +","+(timeOverIDDimension.height-(timeOverIDDimension.bottom+timeOverIDDimension.padding/2))+")")  // centre below axis
    .text("Index of Difficulty");

/* Create Throughput vs ID plot SVG*/

var throughputOverIDSVG = d3.select('#throughput').append('svg')
	.attr('width', throughputOverIDDimension.width)
	.attr('height', throughputOverIDDimension.height)
	.call(createBackground, throughputOverIDDimension);

var throughputOverIDGroup = throughputOverIDSVG.append('g').attr('transform', 'translate('+ (throughputOverIDDimension.left+timeOverIDDimension.padding) + ',' + throughputOverIDDimension.top + ' )');

throughputOverIDGroup.append("g").attr("class", "axis").call(effXAxisTPID.tickSize(throughputOverIDDimension.innerHeight).orient("bottom"));
throughputOverIDGroup.append("g").attr("class", "axis").call(effYAxisTPID.tickSize(-throughputOverIDDimension.innerWidth).orient("left"));

// Titles for axes
throughputOverIDGroup.append("text").attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
		.attr("transform", "translate("+(-throughputOverIDDimension.left)+","+(throughputOverIDDimension.height/2-throughputOverIDDimension.bottom)+")rotate(-90)")  // text is drawn off the screen top left, move down and out and rotate
		.text("Throughput");

throughputOverIDGroup.append("text").attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
		.attr("transform", "translate("+ (throughputOverIDDimension.width/2-throughputOverIDDimension.left) +","+(throughputOverIDDimension.height-(throughputOverIDDimension.bottom+throughputOverIDDimension.padding/2))+")")  // centre below axis
		.text("Index of Difficulty");

/* Create Average Time vs ID plot SVG*/

var avgTimeOverIDSVG = d3.select('#avgTimeOverID').append('svg')
	.attr('width', timeOverIDDimension.width)
	.attr('height', timeOverIDDimension.height)
	.call(createBackground, timeOverIDDimension);

var avgTimeOverIDGroup = avgTimeOverIDSVG.append('g').attr('transform', 'translate('+ (timeOverIDDimension.left+timeOverIDDimension.padding) + ',' + timeOverIDDimension.top + ' )');

avgTimeOverIDGroup.append("g").attr("class", "axis").call(effXAxisTID.tickSize(timeOverIDDimension.innerHeight).orient("bottom"));
avgTimeOverIDGroup.append("g").attr("class", "axis").call(effYAxisTID.tickSize(-timeOverIDDimension.innerWidth).orient("left"));

// Titles for axes
avgTimeOverIDGroup.append("text").attr("text-anchor", "middle")
    .attr("transform", "translate("+(-timeOverIDDimension.left)+","+(timeOverIDDimension.height/2-timeOverIDDimension.bottom)+")rotate(-90)")
    .text("Movement Time (ms)");
avgTimeOverIDGroup.append("text").attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
    .attr("transform", "translate("+ (timeOverIDDimension.width/2-timeOverIDDimension.left) +","+(timeOverIDDimension.height-(timeOverIDDimension.bottom+timeOverIDDimension.padding/2))+")")  // centre below axis
    .text("Index of Difficulty");

/* Create Throughput vs ID plot SVG*/

var avgThroughputOverIDSVG = d3.select('#avgThroughput').append('svg')
	.attr('width', throughputOverIDDimension.width)
	.attr('height', throughputOverIDDimension.height)
	.call(createBackground, throughputOverIDDimension);

var avgThroughputOverIDGroup = avgThroughputOverIDSVG.append('g').attr('transform', 'translate('+ (throughputOverIDDimension.left+timeOverIDDimension.padding) + ',' + throughputOverIDDimension.top + ' )');

avgThroughputOverIDGroup.append("g").attr("class", "axis").call(effXAxisTPID.tickSize(throughputOverIDDimension.innerHeight).orient("bottom"));
avgThroughputOverIDGroup.append("g").attr("class", "axis").call(effYAxisTPID.tickSize(-throughputOverIDDimension.innerWidth).orient("left"));

// Titles for axes
avgThroughputOverIDGroup.append("text").attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
		.attr("transform", "translate("+(-throughputOverIDDimension.left)+","+(throughputOverIDDimension.height/2-throughputOverIDDimension.bottom)+")rotate(-90)")  // text is drawn off the screen top left, move down and out and rotate
		.text("Throughput");

avgThroughputOverIDGroup.append("text").attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
		.attr("transform", "translate("+ (throughputOverIDDimension.width/2-throughputOverIDDimension.left) +","+(throughputOverIDDimension.height-(throughputOverIDDimension.bottom+throughputOverIDDimension.padding/2))+")")  // centre below axis
		.text("Index of Difficulty");


var fittsExp = {
	target: {x: 0, y: 0, r: 10},
	start: {x: 0, y: 0, t: 0},
	last: {},
	targetPositions: [],
	currentPosition: 0,
	currentCount: 0,
	miss: 0,
	parameters: {num: 15, distance: 200, width: 80},
	active: false,
	dataSets: [],
	currentDataSet: 0,
	dataSetCount: 0,
	colour: d3.scale.category10(),
	widths:[10, 60],
	distances:[100,250,400],
	randomize: true,
	// colour:["#00CED1","#008000","#8B008B","#D2691E","#708090","#CCCCFF","#CC99FF","E5FFCC","#660033","#99CCFF"],

	exportData:[],

	getNextTarget: function() {
		this.target = this.targetPositions[this.currentPosition];
		this.target.distance = this.parameters.distance;
		this.currentPosition = (this.currentPosition + Math.ceil(this.targetPositions.length/2)) % this.targetPositions.length;

		var target = experimentSVG.selectAll('#target').data([this.target]);

		var insert = function(d) {
			d.attr('cx', function(d) { return d.x; })
			.attr('cy', function(d) { return d.y; })
			.attr('r', function(d) { return d.w/ 2; });
		}

		target.enter().append('circle').attr('id', 'target').style('fill', '#1f77b4').call(insert);
		target.transition().call(insert);
		this.active = true;
	},

	updateTargetCircles: function() {
		this.currentCount = 0;
		this.generateTargetPositions(this.parameters.num,this.parameters.distance,this.parameters.width);
		var circles = experimentSVG.selectAll('circle').data(this.targetPositions);

		var insert = function(d) {
			d.attr('cx', function(d) { return d.x; })
			.attr('cy', function(d) { return d.y; })
			.attr('r', function(d) { return d.w / 2; });
		}

		circles.enter().append('circle').attr('class', 'iso').call(insert);
		circles.transition().call(insert);
		circles.exit().transition().attr('r', 0).remove();
		this.currentPosition = 0;
		this.getNextTarget();
		this.active = false;
  },

	generateTargetPositions: function(number, distance, width) {

		this.targetPositions = [];
		for (var i = 0; i < number; i++) {
			this.targetPositions[i] = {x: experimentDimension.cx + ((distance/2) * Math.cos((2 * Math.PI * i) / number)),
				y: experimentDimension.cy + ((distance/2) * Math.sin((2 * Math.PI * i) / number)),
				w:width};
		}
	},

	removeTarget: function() {
		experimentSVG.selectAll('#target').data([]).exit().remove();
		this.active = false;
	},

	mouseClicked: function(x, y) {

		if (distance({x: x, y: y}, this.target) < (this.target.w / 2)) {
			this.addDataPoint({start: this.start,
							   target: this.target,
							   hit: {x: x, y: y, t: (new Date).getTime()}});
			this.removeTarget();

			if (this.randomize && this.currentCount >= this.targetPositions.length+3) {
				this.getRandomParams();
				this.currentCount = 0;
				this.currentPosition = 0;
				this.miss = 0;
				$('#current_count').text('Count : ' + this.currentCount );
				this.updateTargetCircles;
				this.getNextTarget();
				this.active = false;
			}
			else {
				this.currentCount++;
				$('#current_count').text('Count : ' + this.currentCount );
				this.getNextTarget();
			}

			this.last = {x: x, y: y, t: (new Date).getTime()};
			this.start = this.last;
		}
		else {
			this.miss++;
			$('#missed_count').text('   Missed count: ' + this.miss );
		}
	},

	addDataPoint: function(data) {
		if (this.active == false)
			return;

		var dt = data.hit.t - data.start.t;

		if (dt < TIME_OUT)  // skip if obvious outlier
		{
			var dist = distance(data.target, data.start);
			this.dataSets[this.currentDataSet].data.push({time: dt, distance: data.target.distance, width: data.target.w, hit: data.hit,
				start: data.start, target: data.target});
		}
	},

	addDataSet: function() {

		this.updatePlots(this);

		this.dataSetCount++;
		var index = this.dataSetCount;
		var colour = this.colour(Math.floor(Math.random() *  10 ));
		this.dataSets[index] = {data: [], colour: colour};
		this.currentDataSet = index;
		var div = d3.select('#dataSets').append('div').attr('id', 'dataSet' + index).text('Data Set ' + index + ' ').style('color', colour);
		var buttonID ='removeDataSet' + index;
		div.append('button').attr('id', buttonID).attr('type', 'button').attr('class', 'remove').text('remove').style('background-color',colour);

		var that = this;
		$('#' + buttonID).click(function() {
			that.deleteDataSet(index);
			fittsExp.active = false;
		});

		$('#dataSet' + index).click(function() {
			that.currentDataSet = index;
			that.highlightDataSet(index);
			fittsExp.active = false;
		})

		this.highlightDataSet(index);
	},

	deleteDataSet: function(index) {
		if (getDataSetsCount(this.dataSets) == 1)
		{
			alert('Only one data set. Cannot remove!');
		} else
		{
			d3.select('#dataSet' + index).remove();
			delete this.dataSets[index];

			timeOverIDGroup.selectAll('.cat' + index).transition()
					.duration(500).style('opacity', 0).remove();

			throughputOverIDGroup.selectAll('rect.cat' + index)
				.transition().duration(500).attr('width', 0).remove();

				avgTimeOverIDGroup.selectAll('.cat' + index).transition()
						.duration(500).style('opacity', 0).remove();

				avgThroughputOverIDGroup.selectAll('rect.cat' + index)
					.transition().duration(500).attr('width', 0).remove();

			if (index == this.currentDataSet) {
				var first = parseInt(getFirstDataSet(this.dataSets));
				this.currentDataSet = first;
				this.highlightDataSet(first);
			}

			this.updatePlots(this);
		}
	},

	highlightDataSet: function(num) {
		d3.selectAll('#dataSets div').attr('class', '');
		d3.select('#dataSet' + num).attr('class', 'active')
	},

	updatePlots: function(experiment) {
		// referenced from https://github.com/SimonWallner/uit-fitts-law
		//https://www.billbuxton.com/fitts92.html
		experiment.active = false;
		var dataSetIndex = -1;
		for (var index in experiment.dataSets) {
			dataSetIndex++;
			var distanceWidthCategories = [];
			for (var i = 0; i < experiment.dataSets[index].data.length; i++) { // for each dataPoint

				var dataPoint = experiment.dataSets[index].data[i];
				var categoryID = dataPoint.distance.toString() + dataPoint.width.toString();
				if (!distanceWidthCategories[categoryID]) {
					distanceWidthCategories[categoryID] = [];
				}
				dataPoint.realDistance = distance(dataPoint.start, dataPoint.hit); // use real distance here.
				distanceWidthCategories[categoryID].push(dataPoint);
			}

			var processedData = [];
			var averageData = [];
			for (var category in distanceWidthCategories) {

				/* The effective distance, De, is calculated as the mean movement distance from the start position to the end position. */
				var effectiveD = mean(distanceWidthCategories[category], function(d) { return d.realDistance; });
				for (var i = 0; i < distanceWidthCategories[category].length; i++) {
					var dataPoint = distanceWidthCategories[category][i];
					var We = dataPoint.width;
					var De = effectiveD;
					dataPoint.IDe = shannon(De, We);
					dataPoint.throughput = 1000 * (dataPoint.IDe/dataPoint.time);
					processedData.push(dataPoint);
				}

				/* Calculate Average time for the category*/
				var averageTime = 0;
				var totalTime = 0;
				var totalTP = 0;
				for (var i = 0; i < distanceWidthCategories[category].length; i++) {
					var dataPoint = distanceWidthCategories[category][i];
					totalTime = totalTime + dataPoint.time;
					totalTP = totalTP + dataPoint.throughput;
				}
				averageTime = totalTime/distanceWidthCategories[category].length;
				averageTP = totalTP/distanceWidthCategories[category].length;
				averageData.push({time: averageTime, IDe: distanceWidthCategories[category][0].IDe, throughput:averageTP });
			}

			this.exportData[index] = processedData;
			var colour = experiment.dataSets[index].colour;
			/* Plot data points on Time over ID graph */
			var insert = function(d) {
				d.attr('cx', function(d) { return timeOverID_X(d.IDe); })
				.attr('cy', function(d) { return timeOverID_Y(d.time); })
				.attr('r', 5);
			}
			var circles = timeOverIDGroup.selectAll('circle.cat' + index).data(processedData);
			circles.enter().append('circle').attr('class', 'cat' + index).style('fill', colour).style('opacity', 0.5).call(insert);
			circles.transition().duration(500).call(insert);

			/*calculating regression coefficients for Time over ID using Least Squares Fitting*/
			var covarianceTIDe = covariance(processedData,
				function(d) { return d.time; },
				function(d) { return d.IDe;});
			var varianceIDe = variance(processedData, function(d) { return d.IDe; })
			if (varianceIDe > 0)
				var b = covarianceTIDe / varianceIDe;
			else
				var b = 0;

			var meanT = mean(processedData, function(d) { return d.time; });
			var meanIDe = mean(processedData, function(d) { return d.IDe; });
			var a = meanT - b * meanIDe;
			console.log("TimeoverID a :"+a+" b:"+b);
			/* Draw linear regression line */
			var makeLine ;
			if (!isNaN(a)){
				 makeLine = function(d) {
					return d
						.attr('x1', 0)
						.attr('x2', timeOverIDDimension.innerWidth)
						.attr('y1', function(d) { return timeOverID_Y(d.y1); })
						.attr('y2', function(d) { return timeOverID_Y(d.y2); })
				}
				console.log("a + b * 0"+(a + b * 0)+"a + b * 6.5"+(a + b * 6.5));

				var regression = timeOverIDGroup.selectAll('line.cat' + index).data([{y1:a + b * 0, y2: a + b * 6.5}]);
				regression.enter().append('line').attr('class', 'cat' + index).style('stroke', colour).style('stroke-width', 2).call(makeLine);
				regression.transition().call(makeLine);
			}

			/* Plot Throughput  */

			insert = function(d) {
				d.attr('cx', function(d) { return TPOverID_X(d.IDe); })
				.attr('cy', function(d) { return TPOverID_Y(d.throughput); })
				.attr('r', 5);
			}

			circles = throughputOverIDGroup.selectAll('circle.cat' + index).data(processedData);
			circles.enter().append('circle').attr('class', 'cat' + index).style('fill', colour).style('opacity', 0.5).call(insert);
			circles.transition().duration(500).call(insert);

			/*calculating regression coefficients for Throughput over ID using Least Squares Fitting*/
			var covarianceTPIDe = covariance(processedData,
				function(d) { return d.throughput; },
				function(d) { return d.IDe;});
			varianceIDe = variance(processedData, function(d) { return d.IDe; })
			if (varianceIDe > 0)
				var b = covarianceTPIDe / varianceIDe;
			else
				var b = 0;

			var meanTP = mean(processedData, function(d) { return d.throughput; });
			meanIDe = mean(processedData, function(d) { return d.IDe; });
			a = meanTP - (b * meanIDe);
			console.log("Throughput a :"+a+" b:"+b);

			/* Draw linear regression line */
			if (!isNaN(a)){
				 makeLine = function(d) {
					return d
						.attr('x1', 0)
						.attr('x2', throughputOverIDDimension.innerWidth)
						.attr('y1', function(d) { return TPOverID_Y(d.y1); })
						.attr('y2', function(d) { return TPOverID_Y(d.y2); })
				}
				console.log("a + b * 0"+(a + b * 0)+"a + b * 6.5"+(a + b * 6.5));

				regression = throughputOverIDGroup.selectAll('line.cat' + index).data([{y1:a + b * 0, y2: a + b * 6.5}]);
				regression.enter().append('line').attr('class', 'cat' + index).style('stroke', colour).style('stroke-width', 2).call(makeLine);
				regression.transition().call(makeLine);
			}

			/********************* For average PLOTS ********************/

			/* Plot data points on Time over ID graph */
			insert = function(d) {
				d.attr('cx', function(d) { return timeOverID_X(d.IDe); })
				.attr('cy', function(d) { return timeOverID_Y(d.time); })
				.attr('r', 5);
			}
			 circles = avgTimeOverIDGroup.selectAll('circle.cat' + index).data(averageData);
			circles.enter().append('circle').attr('class', 'cat' + index).style('fill', colour).style('opacity', 0.5).call(insert);
			circles.transition().duration(500).call(insert);

			/*calculating regression coefficients for Time over ID using Least Squares Fitting*/
			 covarianceTIDe = covariance(averageData,
				function(d) { return d.time; },
				function(d) { return d.IDe;});
			 varianceIDe = variance(averageData, function(d) { return d.IDe; })
			if (varianceIDe > 0)
				var b = covarianceTIDe / varianceIDe;
			else
				var b = 0;

			meanT = mean(averageData, function(d) { return d.time; });
			meanIDe = mean(averageData, function(d) { return d.IDe; });
			a = meanT - b * meanIDe;
			console.log("AvgTimeoverID a :"+a+" b:"+b);

			/* Draw linear regression line */
			if (!isNaN(a)){
				 makeLine = function(d) {
					return d
						.attr('x1', 0)
						.attr('x2', timeOverIDDimension.innerWidth)
						.attr('y1', function(d) { return timeOverID_Y(d.y1); })
						.attr('y2', function(d) { return timeOverID_Y(d.y2); })
				}
				console.log("a + b * 0"+(a + b * 0)+"a + b * 6.5"+(a + b * 6.5));

			  regression = avgTimeOverIDGroup.selectAll('line.cat' + index).data([{y1:a + b * 0, y2: a + b * 6.5}]);
				regression.enter().append('line').attr('class', 'cat' + index).style('stroke', colour).style('stroke-width', 2).call(makeLine);
				regression.transition().call(makeLine);
			}

			/* Plot Throughput  */
			insert = function(d) {
				d.attr('cx', function(d) { return TPOverID_X(d.IDe); })
				.attr('cy', function(d) { return TPOverID_Y(d.throughput); })
				.attr('r', 5);
			}

			circles = avgThroughputOverIDGroup.selectAll('circle.cat' + index).data(averageData);
			circles.enter().append('circle').attr('class', 'cat' + index).style('fill', colour).style('opacity', 0.5).call(insert);
			circles.transition().duration(500).call(insert);

			/*calculating regression coefficients for Throughput over ID using Least Squares Fitting*/
			covarianceTPIDe = covariance(averageData,
				function(d) { return d.throughput; },
				function(d) { return d.IDe;});
			varianceIDe = variance(averageData, function(d) { return d.IDe; })
			if (varianceIDe > 0)
				var b = covarianceTPIDe / varianceIDe;
			else
				var b = 0;

			meanTP = mean(averageData, function(d) { return d.throughput; });
			meanIDe = mean(averageData, function(d) { return d.IDe; });
			a = meanTP - b * meanIDe;
			console.log("Throughput a :"+a+" b:"+b);

			/* Draw linear regression line */
			if (!isNaN(a)){
				 makeLine = function(d) {
					return d
						.attr('x1', 0)
						.attr('x2', throughputOverIDDimension.innerWidth)
						.attr('y1', function(d) { return TPOverID_Y(d.y1); })
						.attr('y2', function(d) { return TPOverID_Y(d.y2); })
				}
				console.log("a + b * 0"+(a + b * 0)+"a + b * 6.5"+(a + b * 6.5));
				regression = avgThroughputOverIDGroup.selectAll('line.cat' + index).data([{y1:a + b * 0, y2: a + b * 6.5}]);
				regression.enter().append('line').attr('class', 'cat' + index).style('stroke', colour).style('stroke-width', 2).call(makeLine);
				regression.transition().call(makeLine);
			}
		}
	},

	getRandomParams: function() {
		this.parameters.distance = this.distances[Math.floor(Math.random() *  3 )];
		this.parameters.width = this.widths[Math.floor(Math.random() *  2 )];
		$("input:radio[name='size']").select('value', this.parameters.width);
		$("input:radio[name='distance']").select('value', this.parameters.distance);
		this.updateTargetCircles();

	}
};

	function covariance(data, getAttrA, getAttrB) {
		if (data.length <= 1) {
			return 0;
		}
		var meanA = mean(data, getAttrA);
		var meanB = mean(data, getAttrB);

		var covariance = 0;
		for (var i = 0; i < data.length; i++) {
			covariance += (getAttrA(data[i]) - meanA) * (getAttrB(data[i]) - meanB);
		}
		return covariance / (data.length - 1);
	}
	function variance(data, getAttr) {
		return covariance(data, getAttr, getAttr);
	}

	function mean(data, getAttr) {
		var sum = 0;
		for (var i = 0; i < data.length; i++) {
			sum += getAttr(data[i]);
		}
		return sum / data.length;
	}

	function getDataSetsCount(dataSets) {
		var size = 0;
		for (var index in dataSets) {
			size++;
		}
		return size;
	}

	function getFirstDataSet(dataSets) {
		for (var index in dataSets) {
			return index;
			break;
		}
	}

	function distance(a, b) {
		var dx = a.x - b.x;
		var dy = a.y - b.y;
		return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
	}

	function shannon(A, W) {
		return Math.log(A / W + 1) / Math.log(2);
	}

	function createBackground(d, dim) {
		return d.append('rect')
			.attr('cx', 0)
			.attr('cy', 0)
			.attr('width', dim.width)
			.attr('height', dim.height)
			.attr('class', 'bg');
	}

	function mouseClicked(){
		var m = d3.svg.mouse(this);
		fittsExp.mouseClicked(m[0], m[1]);
	}

fittsExp.active = false;
fittsExp.generateTargetPositions(15, 100, 20);
fittsExp.updateTargetCircles();
fittsExp.addDataSet();

$('#randomizeButton').click(function() {
	fittsExp.getRandomParams();
	$('#randomizeCheckbox').attr('checked', true);
	fittsExp.randomize = true;
});

$('#randomizeCheckbox').change(function(event) {
	fittsExp.randomize = $(this).attr('checked');
})

$("input:radio[name='size']").change(function(){
	 fittsExp.parameters.width = $(this).val();
	 fittsExp.generateTargetPositions(15, 100, 20);
	 fittsExp.updateTargetCircles();
	 $('#randomizeCheckbox').attr('checked', false);
		 fittsExp.randomize = false;
});

$("input:radio[name='distance']").change(function(){
	fittsExp.parameters.distance = $(this).val();
	fittsExp.generateTargetPositions(20, 100, 20);
	fittsExp.updateTargetCircles();
	$('#randomizeCheckbox').attr('checked', false);
	fittsExp.randomize = false;
});

$('#addDataSetButton').click(function() {
	fittsExp.addDataSet();
	fittsExp.active = false;
});

$('#update_plots').click(function() {
	fittsExp.updatePlots(fittsExp);
});

$('#export_data').click(function() {

	var csvContent = '"Distance","Width","Time","StartPointX","StartPointY","TargetPointX","TargetPointY","ActualHitX","ActualHitY","ID","Throughput"\n';

	$.each(fittsExp.exportData[fittsExp.currentDataSet],function(i, datapoint){
		csvContent += '"'+datapoint.distance+'","'+datapoint.width+'","'+datapoint.time+'","'+datapoint.start.x+'","'+datapoint.start.y+'","'+datapoint.target.x+'","'+datapoint.target.y+'","'+datapoint.hit.x+'","'+datapoint.hit.y+'","'+datapoint.IDe+'","'+datapoint.throughput+'"\n';
	});
	// window.open("data:text/csv;charset=UTF-8,"+encodeURIComponent(csvContent));
	var blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
	var link = document.createElement("a");
	if (link.download !== undefined) {
		var url = URL.createObjectURL(blob);
		link.setAttribute("href", url);
		link.setAttribute("download", "filename.csv");
		link.style.visibility = 'hidden';
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	}
});
