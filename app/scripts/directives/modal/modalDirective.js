"use strict";

angular.module("uiApp").directive('modal', function () {

    return {
        templateUrl: function (elem, attrs) {
            return attrs.mtemplateurl != undefined ? attrs.mtemplateurl : "scripts/directives/modal/modalTemplate.html";
        },
        restrict: 'E',
        transclude: true,
        replace: true,
        //scope: true,
        scope: {
            mdata: '=mdata',
            modalShownCallback: '&modalShownCallback',
            modalClosedCallback: '&modalClosedCallback'
        },
        link: function postLink(scope, element, attrs) {

            scope.mtitle = attrs.mtitle;
            scope.mwidth = attrs.mwidth;
            scope.mid = attrs.mid;
            scope.mad = attrs.mad === "true" ? true : false;
            //scope.mdata = attrs.mdata;
            scope.mtemplateurl = attrs.mtemplateurl;


            scope.$watch(attrs.visible, function (value) {
                if (value === true) {
                    $(element).modal('show');
                } else {
                    $(element).modal('hide');
                }
            });

            $(element).on('shown.bs.modal', function () {
                scope.modalShownCallback();
                scope.$apply(function () {
                    scope.$parent[attrs.visible] = true;
                });
            });

            $(element).on('hidden.bs.modal', function () {
                scope.$apply(function () {
                    scope.$parent[attrs.visible] = false;
                    scope.closemodal();
                });
            });

            scope.closemodal = function () {
                scope.modalClosedCallback();
                scope.$parent.showModal = false;
            };

        }
    };
});
