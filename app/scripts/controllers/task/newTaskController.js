'use strict';


angular.module('uiApp')
    .controller('newTaskController', ['$scope', 'toastr', 'loginService', 'Flash', 'projectService','taskService',
        function ($scope, toastr, loginService, Flash, projectService,taskService) {

            $scope.init = function () {
                $scope.task = $scope.taskStructure();
                $scope.getProjects();
            };

            $scope.getProjects = function () {
                $scope.getProjectsPromise = projectService.getProjects();

                $scope.getProjectsPromise
                    .then((res) => {
                        $scope.projects = res.data;
                        debugger;
                    }, (error) => {
                        Flash.clear();
                        Flash.create('danger', '<strong>Error</strong> ' + error.errorMsg, 0, { class: 'fade-in-up' });
                    });
            }

            $scope.createNewTask = function (task, formValidity) {
                debugger;
                if (!formValidity) {
                    var msg = "Please fill in required fields";
                    toastr.warning(msg, 'Warning');
                    return;
                }

                task.due_date = moment(task.due_date).format('YYYY-MM-DD');

                $scope.createTaskPromise = taskService.createNewTask(task);

                $scope.createTaskPromise
                    .then((res) => {
                        toastr.clear();
                        toastr.success('New task created succesfully', 'Success');
                    }, (error) => {
                        Flash.clear();
                        Flash.create('danger', error.errorMsg, 0, { class: 'fade-in-up' });
                    });
            }

            $scope.taskStructure = function () {
                return {
                    title: "",
                    due_date: moment(),
                    estimated_hours: 0,
                    project: 0
                }
            };

            $scope.init();

        }]);
