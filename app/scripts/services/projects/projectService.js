'user strict';

angular
        .module('uiApp')
        .service('projectService',function(globals) {

                    return {
                        getProjects: function () {
                            return globals.getHttpRequest('http://projectservice.staging.tangentmicroservices.com:80/api/v1/projects/');
                        },
                        deleteProject: function (ProjectId) {
                            return globals.deleteHttpRequest('http://projectservice.staging.tangentmicroservices.com:80/api/v1/projects/'+ProjectId+'/');
                        }
                    };
                });