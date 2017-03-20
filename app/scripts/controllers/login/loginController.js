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
            },{
              state:'dash.newProject',
              url: '/projects/new',
              templateUrl: 'views/projects/newProject.html',
              controller: 'newProjectController'
            },{
              state:'dash.editProject',
              url: '/projects/edit',
              templateUrl: 'views/projects/editProject.html',
              controller: 'editProjectController'
            },{
              state:'dash.tasks',
              url: '/tasks',
              templateUrl: 'views/tasks/tasks.html',
              controller: 'taskController'
            },{
              state:'dash.newTask',
              url: '/task/new',
              templateUrl: 'views/tasks/newTask.html',
              controller: 'newTaskController'
            },{
              state:'dash.editTask',
              url: '/task/edit',
              templateUrl: 'views/tasks/editTask.html',
              controller: 'editTaskController'
            },{
              state:'dash.resources',
              url: '/resources',
              templateUrl: 'views/resources/resources.html',
              controller: 'resourceController'
            },{
              state:'dash.newResource',
              url: '/resource/new',
              templateUrl: 'views/resources/newResource.html',
              controller: 'newResourceController'
            },
            {
              state:'dash.editResource',
              url: '/resource/edit',
              templateUrl: 'views/resources/editResource.html',
              controller: 'editResourceController'
            }];

            for (var index = 0; index < states.length; index++) {
              stateService.addState(states[index]);
            }

            store.set('tokeid',res.data.token);

            $state.go('dash.projects');

          }, (error) => {
            Flash.clear();
            Flash.create('danger', "Incorrect username or password!", 0, { class: 'fade-in-up' });
          });
      };;

      $scope.init();

    }]);
