'use strict';

angular.module('openBrain')
  .directive('streamChart', function($parse, $window, socket){
   return{
      restrict:'EA',
      template:"<svg width='850' height='200'></svg>",
       link: function(scope, elem, attrs){
           
          var d3 = $window.d3;
          var n = 400,
              data = d3.range(n).map(function(){return 0;}),
              dataB = d3.range(n).map(function(){return 0;});

          var margin = {top: 20, right: 20, bottom: 20, left: 40},
              width = 960 - margin.left - margin.right,
              height = 500 - margin.top - margin.bottom;

          var x = d3.scale.linear()
              .domain([1, n - 2])
              .range([0, width]);

          var y = d3.scale.linear()
              .domain([-1, 1])
              .range([height, 0]);

          var line = d3.svg.line()
              .interpolate("basis")
              .x(function(d, i) { return x(i); })
              .y(function(d, i) { return y(d); });

          var rawSvg = elem.find("svg")[0];
          console.log(rawSvg);
          var svg = d3.select(rawSvg)
              .attr("width", width + margin.left + margin.right)
              .attr("height", height + margin.top + margin.bottom)
            .append("g")
              .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

          svg.append("defs").append("clipPath")
              .attr("id", "clip")
            .append("rect")
              .attr("width", width)
              .attr("height", height);

          //X Axis     
          // svg.append("g")
          //     .attr("class", "x axis")
          //     .attr("transform", "translate(0," + y(0) + ")")
          //     .call(d3.svg.axis().scale(x).orient("bottom"));

          var axis = svg.append("g")
              .attr("class", "y axis")
              .call(y.axis = d3.svg.axis().scale(y).orient("left"));

          var pathA = svg.append("g")
              .attr("clip-path", "url(#clip)")
            .append("path")
              .datum(data)
              .attr("class", "line")
              .attr("d", line);

          var pathB = svg.append("g")
              .attr("clip-path", "url(#clip)")
            .append("path")
              .datum(dataB)
              .attr("class", "line")
              .attr("id", "b")
              .attr("d", line);

          var transition = d3.select({}).transition()
            .ease("linear");



          var count = 0;
          
          socket.on('stream', function (stream){
              //Receiving Data
              count++

              // for (var i = 0; i < numPlots; i++) {
                // push a new data point onto the back
                if (count % 5 === 0) {
                  data.push(stream.data[0]);
                  dataB.push(stream.data[1]);
                  y.domain([Math.min(d3.min(data), d3.min(dataB)), Math.max(d3.max(data), d3.max(dataB))]);

                  axis.call(y.axis);
                  // redraw the line, and slide it to the left
                  pathA
                      .attr("d", line)
                      .attr("transform", null)
                    .transition()
                      .ease("linear")
                      .attr("transform", "translate(" + x(0) + ",0)");
                  pathB
                      .attr("d", line)
                      .attr("transform", null)
                    .transition()
                      .ease("linear")
                      .attr("transform", "translate(" + x(0) + ",0)");

                  // pop the old data point off the front
                  data.shift();
                  dataB.shift();
                  
                }

  
  });
       }
   };
});