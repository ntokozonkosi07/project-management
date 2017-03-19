'use strict';


angular.module('uiApp')
  .controller('menuController', ['$scope', 'toastr', 'loginService', 'Flash','store','$state',
    function ($scope, toastr, loginService, Flash,store,$state) {

      $scope.init = function () {
      };

      $scope.init();

    }]);
