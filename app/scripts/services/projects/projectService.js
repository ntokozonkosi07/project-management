'user strict';

angular
        .module('uiApp')
        .service('projectService',function(globals) {

                    return {
                        getProjects: function () {
                            return globals.getHttpRequest('http://projectservice.staging.tangentmicroservices.com:80/api/v1/projects/');
                        },
                        deleteProject: function (projectId) {
                            return globals.deleteHttpRequest('http://projectservice.staging.tangentmicroservices.com:80/api/v1/projects/'+projectId+'/');
                        },
                        createProject: function (project) {
                            return globals.postHttpRequest('http://projectservice.staging.tangentmicroservices.com:80/api/v1/projects/',project);
                        },
                        updateProject:function (project) {
                            return globals.putHttpRequest('http://projectservice.staging.tangentmicroservices.com:80/api/v1/projects/'+project.pk+'/',project);
                        }
                    };
                });