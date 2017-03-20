'use strict';


angular.module('uiApp')
  .controller('projectController', ['$scope', 'toastr', 'loginService', 'Flash', 'projectService','store','$state',
    function ($scope, toastr, loginService, Flash, projectService,store,$state) {

      $scope.init = function () {
        $scope.project = undefined;

        $scope.getProjects();
      };

      $scope.getProjects = function () {
        $scope.getProjectsPromise = projectService.getProjects();

        $scope.getProjectsPromise
          .then((res) => {
            $scope.projects = res.data;
          }, (error) => {
            Flash.clear();
            Flash.create('danger', '<strong>Error</strong> ' + error.errorMsg, 0, { class: 'fade-in-up' });
          });
      }

      $scope.setSelectedObject = function (data, actionType) {
        $scope.project = data;

        switch (actionType.action) {
          case 'viewProjectDetails':
            $('#projectDetailsModal').modal();
            break;
          case 'editProject':
            store.set('27f36d55-7f73-4fa9-9a9c-82553c4d6f11',data);
            $state.go('dash.editProject');
            break;
          case 'deleteProject':
            $('#deleteProjectModal').modal();
            break;
        }
      }

      $scope.deleteProject = function (project) {
        $scope.deleteProjectPromise = projectService.deleteProject(project.pk);

        $scope.deleteProjectPromise
          .then((res) => {
            $scope.getProjects();
            toastr.success("Project deleted successfuly", 'Success');
          }, (error) => {
            Flash.clear();
            Flash.create('danger', '<strong>Error</strong> ' + error.errorMsg, 0, { class: 'fade-in-up' });
          })
      }

      $scope.init();

    }]);
