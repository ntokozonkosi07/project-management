'use strict';


angular.module('uiApp')
  .controller('resourceController', ['$scope', 'toastr', 'loginService', 'Flash', 'projectService', 'store', '$state', 'resourcesService',
    function ($scope, toastr, loginService, Flash, projectService, store, $state, resourcesService) {

      $scope.init = function () {
        $scope.getResources();
      };

      $scope.getResources = function () {
        $scope.getResourcesPromise = resourcesService.getResources();

        $scope.getResourcesPromise
          .then((res) => {
            $scope.resources = res.data;
          }, (error) => {
            Flash.clear();
            Flash.create('danger', "Incorrect username or password!", 0, { class: 'fade-in-up' });
          });
      };

      $scope.dataTableActions = function (data, dataActionType) {
        debugger;
        $scope.resource = data;
        switch (dataActionType.action) {
          case 'editResource':
            store.set('31ee9332-9dbb-46ad-b46d-8e101b49aea5',data);
            $state.go('dash.editResource');
            break;
        }

      };

      $scope.init();

    }]);
