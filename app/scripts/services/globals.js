'user strict';
angular
    .module('uiApp')
    .service('globals', function globals($http, $q, $state) {

        var defer = $q.defer();

        var httpRequestErrorHandling = function (error) {
            debugger;
            var tempErrorMsg;

            if (error.status === 404
                || error.status === 408
                || error.status === 410) {
                tempErrorMsg = "There was a problem reaching the server. Please try again. If the problem persist, contact the administrator";
            } else if(error.status === 401){
                tempErrorMsg = "Unauthorised to query services";
            } else{
                tempErrorMsg = "Internal Server Error. Please contact the administrator";
            }

            console.log("==========");
            console.log(tempErrorMsg);
            console.log("==========");

            return tempErrorMsg;
        };

        httpRequestErrorHand = function(error){
                        defer.reject({
                            errorMsg: errorhttpRequestErrorHandling(error)
                        });
        };
        var resovle = function(res){
            defer.resolve(res);
        };

        return {
            getHttpRequest: function (url) {
                var defer = $q.defer();
                $http.get(url)
                    .then(
                    function (res) {
                        defer.resolve(res);
                    },
                    function (error) {
                        var errorMsg = httpRequestErrorHandling(error);

                        defer.reject({
                            errorMsg: errorMsg
                        });
                    });
                return defer.promise;
            },
            postHttpRequest: function (url, param) {
                debugger;
                var defer = $q.defer();

                $http.post(url, param)
                    .then(function (res) {

                        defer.resolve(res);
                    },
                    function (error) {
                        var errorMsg = httpRequestErrorHandling(error);

                        defer.reject({
                            errorMsg: errorMsg
                        });
                    });
                return defer.promise;
            },
            deleteHttpRequest: function (url) {
                var defer = $q.defer();

                $http.delete(url)
                    .then(function (res) {

                        defer.resolve(res);
                    },
                    function (error) {
                        var errorMsg = httpRequestErrorHandling(error);

                        defer.reject({
                            errorMsg: errorMsg
                        });
                    });
                return defer.promise;
            },
            putHttpRequest: function (url,data) {

                $http.put(url,data)
                    .then(resovle,
                    function (error) {
                        var errorMsg = httpRequestErrorHandling(error);

                        defer.reject({
                            errorMsg: errorMsg
                        });
                    });
                return defer.promise;
            },
            patchtHttpRequest: function (url,data) {
                var defer = $q.defer();

                $http.patch(url,data)
                    .then(function (res) {

                        defer.resolve(res);
                    },
                    function (error) {
                        var errorMsg = httpRequestErrorHandling(error);

                        defer.reject({
                            errorMsg: errorMsg
                        });
                    });
                return defer.promise;
            }
        };
    });