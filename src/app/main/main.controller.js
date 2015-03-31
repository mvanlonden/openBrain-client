'use strict';

angular.module('openBrain')
  .controller('MainCtrl', function ($scope, $mdSidenav, $log, boardService, socket) {
    var latency;
    var avgLat = 0;
    var i = 0;
    var stop = false;
    setInterval(function() {

      if (!stop) {
      var startTime = Date.now();
      socket.emit('ping');
      socket.on('pong', function() {
        latency = Date.now() - startTime;
        console.log(latency);
        i++;
        avgLat =+ latency;
        if (i === 39) {
          stop = true;
          console.log('avg',avgLat/40);
        }
      });
      }
    }, 2000);

    //Trying OSC to see if reduced latency
    // var oscPort = new osc.WebSocketPort({
    //     url: "ws://localhost:12345/openbci" // URL to your Web Socket server.
    // });
    // console.log(oscPort);

    // oscPort.on("connection", function () {
    //     console.log('connection open');
    // });
    // oscPort.on("message", function (oscMsg) {
    //     console.log("An OSC message just arrived!", oscMsg);
    // });


    $scope.toggleNav = function () {
      $mdSidenav('left').toggle()
                            .then(function(){
                                $log.debug("toggle left is done");
                            });
    };

    // boardService.start();
    $scope.toggleStreaming = function (streaming) {
      if (streaming) {
        boardService.start();
        return;
      }
      boardService.stop();
    };


    $scope.$watch('output.socket', function (newValue, oldValue) {
      if (newValue !== oldValue) {
        if (newValue) {
          boardService.socket.on();
        } else {
          boardService.socket.off();
        }
      }
    });
    $scope.$watch('output.osc', function (newValue, oldValue) {
      if (newValue !== oldValue) {
        if (newValue) {
          boardService.osc.on();
        } else {
          boardService.osc.off();
        }
      }
    });
    $scope.$watch('output.udp', function (newValue, oldValue) {
      if (newValue !== oldValue) {
        if (newValue) {
          boardService.udp.on();
        } else {
          boardService.udp.off();
        }
      }
    });
    $scope.$watch('output.csv', function (newValue, oldValue) {
      if (newValue !== oldValue) {
        if (newValue) {
          boardService.csv.on();
        } else {
          boardService.csv.off();
        }
      }
    });
  });
