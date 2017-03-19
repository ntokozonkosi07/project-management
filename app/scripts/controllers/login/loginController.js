'use strict';

/**
 * @ngdoc function
 * @name uiAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the uiAppApp
 */
angular.module('uiApp')
  .controller('loginController', ['$scope', 'toastr', 'loginService', 'Flash', '$state','stateService','store',
    function ($scope, toastr, loginService, Flash, $state,stateService,store) {
      $scope.init = function () {
      };

      $scope.login = function (credentials, formValidity) {
        debugger;
        if (!formValidity) {
          var msg = "Please fill in required fields";
          toastr.warning(msg, 'Warning');
          return;
        }

        credentials = {
          username: "jacob.zuma",
          password: "tangent"
        };
        
        loginService.login(credentials)
          .then((res) => {
            var states = [{
              state:'dash',
              url: '/dash',
              templateUrl: 'views/menu/menu.html',
              controller: 'menuController'
            }, {
              state:'dash.home',
              url: '/home',
              templateUrl: 'views/users/users.html',
              controller: 'userController'
            },{
              state:'dash.projects',
              url: '/projects',
              templateUrl: 'views/projects/projects.html',
              controller: 'projectController'
            }];

            for (var index = 0; index < states.length; index++) {
              stateService.addState(states[index]);
            }

            store.set('tokeid',res.data.token);

            $state.go('dash.home');

          }, (error) => {
            Flash.clear();
            Flash.create('danger', "Incorrect username or password!", 0, { class: 'fade-in-up' });
          });
      };;

      $scope.init();

    }]);
