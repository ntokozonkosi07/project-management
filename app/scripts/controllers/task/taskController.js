'use strict';


angular.module('uiApp')
    .controller('taskController', ['$scope', 'toastr', 'loginService', 'Flash', 'taskService', 'store', '$state',
        function ($scope, toastr, loginService, Flash, taskService, store, $state) {

            $scope.init = function () {
                $scope.getTasks();
            };

            $scope.getTasks = function () {
                $scope.getTasksPromise = taskService.getTasks();

                $scope.getTasksPromise
                    .then((res) => {
                        $scope.tasks = res.data;
                        debugger;
                    }, (error) => {
                        Flash.clear();
                        Flash.create('danger', '<strong>Error</strong> ' + error.errorMsg, 0, { class: 'fade-in-up' });
                    });
            }

            $scope.dataTableAction = function (data, actionType) {
                debugger;
                $scope.task = data;
                switch (actionType.action) {
                    case 'editTask':
                        // in a real world scenario [data] would be encrypted
                        store.set('bbe53a6d-a3cf-4f03-9b26-7922e812ed65', data);
                        $state.go('dash.editTask')
                        break;
                    case 'deleteTask':
                        $('#deleteTaskModal').modal();
                        break;
                }
            }

            $scope.deleteTask = function (task) {
                $scope.deleteTaskPromise = taskService.deleteTask(task);

                $scope.deleteTaskPromise
                    .then((res) => {
                        toastr.clear();
                        toastr.success('Task deleted succefully', 'Success');
                        $scope.getTasks();
                    }, (error) => {
                        Flash.clear();
                        Flash.create('danger', '<strong>Error</strong> ' + error.errorMsg, 0, { class: 'fade-in-up' });
                    });
            }

            $scope.init();

        }]);
