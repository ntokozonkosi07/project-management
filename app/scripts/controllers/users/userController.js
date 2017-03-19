'use strict';


angular.module('uiApp')
  .controller('userController', ['$scope', 'toastr', 'loginService', 'Flash', 'userService',
    function ($scope, toastr, loginService, Flash, userService) {

      $scope.init = function () {
        debugger;
        $scope.getUsersPromise = userService.getUsers();

        $scope.getUsersPromise
          .then((res) => {
            $scope.users = res.data;
          }, (error) => {
            debugger;
            Flash.clear();
            Flash.create('danger', '<strong>Error</strong> ' + error.errorMsg, 0, { class: 'fade-in-up' });
          });
      };

      $scope.setSelectedObject = function (user, actionType) {
        switch (actionType.action) {
          case 'editUserDetails':
            debugger;
            break;
        }
      }

      $scope.init();

    }]);
