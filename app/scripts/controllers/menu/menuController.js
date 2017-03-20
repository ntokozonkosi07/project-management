'use strict';


angular.module('uiApp')
  .controller('menuController', ['$scope', 'toastr', 'loginService', 'Flash', 'store', '$state',
    function ($scope, toastr, loginService, Flash, store, $state) {

      $scope.init = function () {
        // $scope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
        //   store.set('currentState', toState);
        // });

        // $state.go(store.get('currentState').name);
      };

      $scope.init();

    }]);
