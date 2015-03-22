'use strict';

angular.module('openBrain')
  .controller('MainCtrl', function ($scope, $mdSidenav, $log) {
    $scope.toggleNav = function () {
      $mdSidenav('left').toggle()
                            .then(function(){
                                $log.debug("toggle left is done");
                            });
    }
  });
