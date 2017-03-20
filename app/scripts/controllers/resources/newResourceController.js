'use strict';


angular.module('uiApp')
    .controller('newResourceController', ['$scope', 'toastr', 'loginService', 'Flash', 'projectService', 'store', '$state', 'resourcesService', 'userService',
        function ($scope, toastr, loginService, Flash, projectService, store, $state, resourcesService, userService) {

            $scope.init = function () {
                $scope.getProjects();
                $scope.getUsers();
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
            };

            $scope.getUsers = function () {
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

            $scope.createNewResource = function (resource, formValidity) {
                if (!formValidity) {
                    var msg = "Please fill in required fields";
                    toastr.warning(msg, 'Warning');
                    return;
                }

                debugger;
                resource.start_date = moment(resource.start_date).format('YYYY-MM-DD');
                resource.end_date = moment(resource.end_date).format('YYYY-MM-DD');

                $scope.createResourcePromise = resourcesService.createResource(resource);

                $scope.createResourcePromise
                    .then((res) => {
                        toastr.clear();
                        toastr.success('New resource created successfuly', 'success');
                    }, (error) => {
                        Flash.clear();
                        Flash.create('danger', '<strong>Error</strong> ' + error.errorMsg, 0, { class: 'fade-in-up' });
                    });

            };

            $scope.init();

        }]);
