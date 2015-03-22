'use strict';

angular.module('openBrain')
  .factory('socket', function (socketFactory) {
    return socketFactory({
      ioSocket: io.connect('http://localhost:5000/test')
    });
  });
