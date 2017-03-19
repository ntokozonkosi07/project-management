'user strict';

angular
        .module('uiApp')
        .service('userService',function(globals) {

                    return {
                        getUsers: function () {
                            return globals.getHttpRequest('http://userservice.staging.tangentmicroservices.com:80/api/v1/users/');
                        }
                    };
                });