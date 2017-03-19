'use strict';

/**
 * @ngdoc overview
 * @name uiAppApp
 * @description
 * # uiAppApp
 *
 * Main module of the application.
 */
angular
    .module('uiApp', ['ui.router', 'toastr', 'jcs-autoValidate', 'ngFlash', 'angular-storage','cgBusy'])
    .run(['validator',
        function (validator) {
            validator.setValidElementStyling(false);
        }]);
