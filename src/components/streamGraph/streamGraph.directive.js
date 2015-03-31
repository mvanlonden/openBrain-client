'use strict';

angular.module('openBrain')
  .directive('streamChart', function($parse, $window, socket){
   return{
      restrict:'EA',
      template:"<svg></svg>",
       link: function(scope, elem, attrs){
           
          var d3 = $window.d3;
          var n = 400;

          var margin = {top: 20, right: 20, bottom: 20, left: 40},
              width = elem[0].offsetWidth - margin.left - margin.right,
              height = elem[0].offsetHeight - margin.top - margin.bottom;

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

          var paths = [];
          var datas = [];

          for (var i = 0; i < 8; i++) {
            var data = d3.range(n).map(function(){return 0;});
            datas.push(data);
            var path = svg.append("g")
                .attr("clip-path", "url(#clip)")
              .append("path")
                .datum(data)
                .attr("class", "line")
                .attr("id", 'path' + (i + 1))
                .attr("d", line);
            paths.push(path);

          }

          var transition = d3.select({}).transition()
            .ease("linear");



          var count = 0;
          
          socket.on('stream', function (stream){
              // console.log('message');
              //Receiving Data
              count++

              // for (var i = 0; i < numPlots; i++) {
              // push a new data point onto the back
              if (count % 5 === 0) {
                var min;
                var max;

                for (var i = 0; i < paths.length; i++) {
                  datas[i].push(stream.data[i]);
                  // redraw the line, and slide it to the left
                  paths[i]
                      .attr("d", line)
                    //   .attr("transform", null)
                    // .transition()
                    //   .ease("linear")
                      .attr("transform", "translate(" + x(0) + ",0)");

                  // pop the old data point off the front
                  datas[i].shift();

                  if (d3.min(datas[i]) < min || !min) {
                    min = d3.min(datas[i]);
                  }

                  if (d3.max(datas[i]) > max || !max) {
                    max = d3.max(datas[i]);
                  }

                }

                y.domain([min, max]);

                axis.call(y.axis);
              }
          });
       }
   };
});