'user strict';

angular
        .module('uiApp')
        .service('loginService',function(globals) {

                    return {
                        login: function (credentials) {
                            return globals.postHttpRequest('http://userservice.staging.tangentmicroservices.com:80/api-token-auth/', credentials);
                        }
                    };
                });