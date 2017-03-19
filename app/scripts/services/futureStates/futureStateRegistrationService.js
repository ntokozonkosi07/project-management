'user strict';
angular
    .module('uiApp')

    .service('stateService', [function () {
        return {
            addState: function (futureState) {
                angular.module('uiApp')
                    .stateProvider.state(futureState.state,
                    {
                        url: futureState.url,
                        controller: futureState.controller,
                        templateUrl: futureState.templateUrl
                    });
            }
        };
    }]);