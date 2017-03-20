'user strict';

angular
        .module('uiApp')
        .service('resourcesService',function(globals) {

                    return {
                        getResources: function () {
                            return globals.getHttpRequest('http://projectservice.staging.tangentmicroservices.com:80/api/v1/resources/');
                        },
                        createResource: function (resource) {
                            return globals.postHttpRequest('http://projectservice.staging.tangentmicroservices.com:80/api/v1/resources/',resource);
                        },
                        updateResource:function (resource) {
                            return globals.putHttpRequest('http://projectservice.staging.tangentmicroservices.com:80/api/v1/resources/'+resource.id+'/',resource);
                        },

                        deleteProject: function (projectId) {
                            return globals.deleteHttpRequest('http://projectservice.staging.tangentmicroservices.com:80/api/v1/projects/'+projectId+'/');
                        },
                        
                        
                    };
                });