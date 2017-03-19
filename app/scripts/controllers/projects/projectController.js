'use strict';


angular.module('uiApp')
  .controller('projectController', ['$scope', 'toastr', 'loginService', 'Flash', 'projectService',
    function ($scope, toastr, loginService, Flash, projectService) {

      $scope.init = function () {
        $scope.project = undefined;

        $scope.getProjectsPromise = projectService.getProjects();

        $scope.getProjectsPromise
          .then((res) => {
            $scope.projects = res.data;
          }, (error) => {
            Flash.clear();
            Flash.create('danger', '<strong>Error</strong> ' + error.errorMsg, 0, { class: 'fade-in-up' });
          });
      };

      $scope.setSelectedObject = function (project, actionType) {
        $scope.project = project;

        switch (actionType.action) {
          case 'viewProjectDetails':
            console.log(project.task_set);
            break;
          case 'deleteProject':
            console.log(project);
            break;
        }
      }

      $scope.deleteProject = function (project) {
        debugger;
        $scope.deleteProjectPromise = projectService.deleteProject(project.pk);

        $scope.deleteProjectPromise
          .then((res) => {
            toastr.success("Project deleted successfuly", 'Success');
          }, (error) => {
            Flash.clear();
            Flash.create('danger', '<strong>Error</strong> ' + error.errorMsg, 0, { class: 'fade-in-up' });
          })
      }

      $scope.init();

    }]);
