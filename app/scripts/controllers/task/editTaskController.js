'use strict';


angular.module('uiApp')
    .controller('editTaskController', ['$scope', 'toastr', 'loginService', 'Flash', 'projectService', 'taskService', 'store',
        function ($scope, toastr, loginService, Flash, projectService, taskService, store) {

            $scope.init = function () {

                $scope.getProjects();

            };

            $scope.getProjects = function () {
                $scope.getProjectsPromise = projectService.getProjects();

                $scope.getProjectsPromise
                    .then((res) => {
                        $scope.projects = res.data;

                        $scope.task = store.get('bbe53a6d-a3cf-4f03-9b26-7922e812ed65');

                        // this right here is not supposed to be returning as a string, my validation kicks it out
                        $scope.task.estimated_hours = parseFloat($scope.task.estimated_hours);

                    }, (error) => {
                        Flash.clear();
                        Flash.create('danger', '<strong>Error</strong> ' + error.errorMsg, 0, { class: 'fade-in-up' });
                    });
            }

            $scope.updateTask = function (task, formValidity) {
                if (!formValidity) {
                    var msg = "Please fill in required fields";
                    toastr.warning(msg, 'Warning');
                    return;
                }

                debugger;
                
                $scope.updateTaskPromise = taskService.updateTask(task);

                $scope.updateTaskPromise
                    .then((res) => {
                        toastr.clear();
                        toastr.success('Task updated succesfully', 'Success');
                    }, (error) => {
                        Flash.clear();
                        Flash.create('danger', error.errorMsg, 0, { class: 'fade-in-up' });
                    });
            }

            $scope.init();

        }]);
