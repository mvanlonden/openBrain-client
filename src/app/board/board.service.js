'use strict';

angular.module('openBrain')
  .factory('boardService', function ($http) {
    var host = 'http://localhost:5000'
    return {
      start: function() {
        $http.get(host + '/board/stream/start')
          .success(function() {
            return true;
          })
          .error(function (err) {
            return err;
          });
      },
      stop: function() {
        $http.get(host + '/board/stream/stop')
          .success(function() {
            return true;
          })
          .error(function (err) {
            return err;
          });
      },
      osc: {
        on: function() {
          $http.get(host + '/output/osc/on')
            .success(function() {
              return true;
            })
            .error(function (err) {
              return err;
            });
        },
        off: function() {
          $http.get(host + '/output/osc/off')
            .success(function() {
              return true;
            })
            .error(function (err) {
              return err;
            });
        }
      },
      socket: {
        on: function() {
          $http.get(host + '/output/socket/on')
            .success(function() {
              return true;
            })
            .error(function (err) {
              return err;
            });
        },
        off: function() {
          $http.get(host + '/output/socket/off')
            .success(function() {
              return true;
            })
            .error(function (err) {
              return err;
            });
        }
      },
      udp: {
        on: function() {
          $http.get(host + '/output/udp/on')
            .success(function() {
              return true;
            })
            .error(function (err) {
              return err;
            });
        },
        off: function() {
          $http.get(host + '/output/udp/off')
            .success(function() {
              return true;
            })
            .error(function (err) {
              return err;
            });
        }
      },
      csv: {
        on: function() {
          $http.get(host + '/output/csv/on')
            .success(function() {
              return true;
            })
            .error(function (err) {
              return err;
            });
        },
        off: function() {
          $http.get(host + '/output/csv/off')
            .success(function() {
              return true;
            })
            .error(function (err) {
              return err;
            });
        }
      }
    };
  });
