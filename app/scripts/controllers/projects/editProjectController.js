'use strict';


angular.module('uiApp')
    .controller('editProjectController', ['$scope', 'toastr', 'loginService', 'Flash', 'projectService', 'store',
        function ($scope, toastr, loginService, Flash, projectService, store) {

            $scope.init = function () {
                $scope.project = store.get('27f36d55-7f73-4fa9-9a9c-82553c4d6f11');
            };

            $scope.UpdateProject = function (project, formValidity) {
                $scope.updateProjectPromise = projectService.updateProject(project);

                $scope.updateProjectPromise
                    .then((res) => {
                        toastr.success("Project updated successfuly", 'Success');
                    }, (error) => {
                        Flash.clear();
                        Flash.create('danger', '<strong>Error</strong> ' + error.errorMsg, 0, { class: 'fade-in-up' });
                    });
            }


            $scope.init();

        }]);
