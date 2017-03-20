'use strict';


angular.module('uiApp')
    .controller('newProjectController', ['$scope', 'toastr', 'loginService', 'Flash', 'projectService',
        function ($scope, toastr, loginService, Flash, projectService) {

            $scope.init = function () {
                $scope.project = $scope.projectStructure();
            };

            $scope.createNewProject = function (project, formValidity) {
                if (!formValidity) {
                    var msg = "Please fill in required fields";
                    toastr.warning(msg, 'Warning');
                    return;
                }

                project.start_date = moment(project.start_date).format('YYYY-MM-DD');
                project.end_date = moment(project.end_date).format('YYYY-MM-DD');

                debugger;

                $scope.createProjectPromise = projectService.createProject(project);

                $scope.createProjectPromise
                    .then((res) => {
                        toastr.clear();
                        toastr.success('New project created succesfully', 'Success');

                        
                    }, (error) => {
                        Flash.clear();
                        Flash.create('danger', error.errorMsg, 0, { class: 'fade-in-up' });
                    });
                    $scope.project = $scope.projectStructure();
            }

            $scope.projectStructure = function () {
                return {
                    title: " ",
                    description: " ",
                    start_date: moment(),
                    end_date: moment(),
                    is_billable: false,
                    is_active: false
                }
            };

            $scope.init();

        }]);
