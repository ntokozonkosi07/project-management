angular
    .module('uiApp')
    .config(function (storeProvider) {
        storeProvider.setStore('sessionStorage');
    })
    .config(['$stateProvider', '$urlRouterProvider', 'toastrConfig', '$httpProvider',
        function ($stateProvider, $urlRouterProvider, toastrConfig, $httpProvider) {

            //Extending the funtions of the toaster
            angular.extend(toastrConfig, {
                maxOpened: 3,
                closeButton: true,
                positionClass: 'toast-top-right',
                timeOut: 5000
            });

            // keeping reference of $stateProvider, for future states
            angular.module('uiApp').stateProvider = $stateProvider;

            //Application states
            $stateProvider
                .state('login', {
                    url: '/',
                    templateUrl: 'views/login.html',
                    controller: 'loginController'
                });

            $urlRouterProvider.otherwise('/');

            $httpProvider.interceptors.push('tokenInjector');
        }])

    .service('tokenInjector', ['store', function (store) {
        var tokenInjector = {
            request: function (config) {
                config.headers['content-type'] = 'application/json';
                if (store.get('tokeid') !== null)
                    config.headers['Authorization'] = "Token " + store.get('tokeid');
                return config;
            }
        };
        return tokenInjector;
    }]);