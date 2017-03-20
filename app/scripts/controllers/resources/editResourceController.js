'use strict';


angular.module('uiApp')
    .controller('editResourceController', ['$scope', 'toastr', 'loginService', 'Flash', 'projectService', 'store', '$state', 'resourcesService', 'userService', '$q',
        function ($scope, toastr, loginService, Flash, projectService, store, $state, resourcesService, userService, $q) {

            $scope.init = function () {
                var promises = [projectService.getProjects(), userService.getUsers()];

                $q.all(promises)
                    .then((res) => {
                        debugger;
                        $scope.projects = res[0].data;
                        $scope.users = res[1].data;

                        $scope.resource = store.get('31ee9332-9dbb-46ad-b46d-8e101b49aea5');
                        $scope.resource.rate = parseFloat(store.get('31ee9332-9dbb-46ad-b46d-8e101b49aea5').rate);
                        $scope.resource.user = parseFloat(store.get('31ee9332-9dbb-46ad-b46d-8e101b49aea5').user);
                        $scope.resource.agreed_hours_per_month = parseFloat(store.get('31ee9332-9dbb-46ad-b46d-8e101b49aea5').agreed_hours_per_month);
                        
                    }, (error) => {
                        Flash.clear();
                        Flash.create('danger', '<strong>Error</strong> ' + error.errorMsg, 0, { class: 'fade-in-up' });
                    });
            };


            $scope.updateResource = function (resource, formValidity) {
                if (!formValidity) {
                    var msg = "Please fill in required fields";
                    toastr.warning(msg, 'Warning');
                    return;
                }

                debugger;
                resource.start_date = moment(resource.start_date).format('YYYY-MM-DD');
                resource.end_date = moment(resource.end_date).format('YYYY-MM-DD');

                $scope.updateResourcePromise = resourcesService.updateResource(resource);

                $scope.updateResourcePromise
                    .then((res) => {
                        toastr.clear();
                        toastr.success('Resource updpated successfuly', 'success');
                    }, (error) => {
                        Flash.clear();
                        Flash.create('danger', '<strong>Error</strong> ' + error.errorMsg, 0, { class: 'fade-in-up' });
                    });

            };

            $scope.init();

        }]);
