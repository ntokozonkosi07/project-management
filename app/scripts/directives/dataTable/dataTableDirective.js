"use strict";

angular.module("uiApp").directive("tblDirective", ["$filter", function ($filter) {
    return {
        templateUrl: function (elem, attrs) {
            return attrs.templateurl;
        },
        scope: {
            tableData: "=tableData",
            selectedObject: "=selectedObject",
            extraData: "=extraData",
            callback: "&",
            mcallback: "&"
        },
        restrict: "E",
        transclude: true,
        link: function (scope, element, attr) {
            scope.title = attr.title;

            var sortingOrder = 'id';
            scope.showModal = false;

            scope.sortingOrder = sortingOrder;
            scope.pageSizes = [5, 10, 25, 50];
            scope.reverse = false;
            scope.filteredItems = [];
            scope.groupedItems = [];
            scope.itemsPerPage = attr.pagedItemsParam === undefined ? 10 : attr.pagedItemsParam;
            scope.pagedItems = [];
            scope.currentPage = 0;
            scope.currentItem = {};
            scope.newItem = {};
            scope.items = [];
            scope.baseSet = 0;
            scope.maxSet = attr.maxSet === undefined ? 5 : attr.maxSet;

            var searchMatch = function (haystack, needle) {
                if (!needle) {
                    return true;
                }
                return haystack.toString().toLowerCase().indexOf(needle.toLowerCase()) !== -1;
            };

            scope.prePopulate = function () {

                if (scope.tableData === undefined) {
                    return;
                }

                scope.items = scope.tableData;
                scope.search();
            };

            scope.$watch('tableData', function (newFoo, oldFoo) {
                scope.prePopulate();
            }, true);

            // init the filtered items
            scope.search = function () {
                scope.filteredItems = $filter('filter')(scope.items, function (item) {
                    for (var attr in item) {
                        if (searchMatch(item[attr], scope.query)) {
                            return true;
                        }
                    }
                    return false;
                });
                // take care of the sorting order
                if (scope.sortingOrder !== '') {
                    scope.filteredItems = $filter('orderBy')(scope.filteredItems, scope.sortingOrder, scope.reverse);
                }
                scope.currentPage = 0;
                // now group by pages
                scope.groupToPages();
            };

            // show items per page
            scope.perPage = function () {
                scope.groupToPages();
            };

            // calculate page in place
            scope.groupToPages = function () {
                scope.pagedItems = [];

                for (var i = 0; i < scope.filteredItems.length; i++) {
                    if (i % scope.itemsPerPage === 0) {
                        scope.pagedItems[Math.floor(i / scope.itemsPerPage)] = [scope.filteredItems[i]];
                    } else {
                        scope.pagedItems[Math.floor(i / scope.itemsPerPage)].push(scope.filteredItems[i]);
                    }
                }
            };

            scope.procedeOnItem = function (idx) {
                var itemToProcedeOn = scope.pagedItems[scope.currentPage][idx];
                scope.selectedObject = itemToProcedeOn;

                scope.callback({ obj: scope.selectedObject });

                //scope.$emit("onTabActivateEvent", {tab: 2 });
                //var idxInItems = scope.items.indexOf(itemToProcedeOn);
                //work with this data here

                //scope.showModal = !scope.showModal;
            };

            scope.procedeOnItemObject = function (_obj, _actionType) {
                scope.selectedObject = _obj;
                scope.callback({ "obj": _obj, "action": { "action": _actionType } });

            };

            scope.procedeOnItemObjectSelection = function (_obj) {
                scope.selectedObject = _obj;

                scope.mcallback({ obj: _obj });
            };

            scope.procedeOnItemObjectNoRedirect = function (_obj) {
                scope.selectedObject = _obj;
            };

            scope.isPropertyCreated = false;
            scope.createProperty = function () {

                scope.items.push(scope.newItem);
                scope.isPropertyCreated = true;
                //saving the new property
            };

            scope.range = function (start, end) {
                var ret = [];
                if (!end) {
                    end = start;
                    start = 0;
                }
                for (var i = start; i < end; i++) {
                    ret.push(i);
                }
                return ret;
            };

            scope.prevPage = function () {
                if (scope.currentPage > 0) {
                    scope.currentPage--;
                }
            };

            scope.firstPageSet = function () {
                if (scope.tableData.length > 0) {
                    scope.currentPage = 0;
                    scope.baseSet = 0;
                    scope.maxSet = 5;
                }
            };

            scope.prevPageSet = function (prevPageSet) {
                if ((scope.baseSet - prevPageSet) >= 0) {
                    scope.currentPage = scope.baseSet - prevPageSet;
                    scope.baseSet = scope.baseSet - prevPageSet;
                    scope.maxSet = scope.maxSet - prevPageSet;
                }
            };

            scope.nextPage = function () {
                if (scope.currentPage < scope.pagedItems.length - 1) {
                    scope.currentPage++;
                }
            };

            scope.lastPageSet = function () {

                while (true) {
                    var nextPageSet = 5;
                    if ((scope.baseSet === 0) || ((scope.baseSet + nextPageSet) <= (scope.tableData.length / scope.itemsPerPage))) {
                        scope.nextPageSet(nextPageSet);
                    } else {
                        return;
                    }
                }
            };

            scope.nextPageSet = function (nextPageSet) {
                if ((scope.baseSet === 0) || ((scope.baseSet + nextPageSet) <= (scope.tableData.length / scope.itemsPerPage))) {
                    scope.currentPage = scope.baseSet + nextPageSet;
                    scope.baseSet = scope.baseSet + nextPageSet;
                    scope.maxSet = scope.maxSet + nextPageSet;
                }
            };

            scope.setPage = function () {
                scope.currentPage = this.n;
            };

            // functions have been describe .process the data for display
            scope.tableData === undefined || scope.tableData === null ? scope.search() : scope.prePopulate();

            // change sorting order
            scope.sort_by = function (newSortingOrder) {
                if (scope.sortingOrder === newSortingOrder) {
                    scope.reverse = !scope.reverse;
                }

                scope.sortingOrder = newSortingOrder;
            };

            scope.selectRow = function (obj) {

                $.each(scope.items, function (key, item) {
                    item.selected = false;
                });
                scope.currentItem = scope.items[scope.items.indexOf(obj.item)];
                scope.items[scope.items.indexOf(obj.item)].selected = true;

            };

            scope.valuationRequested = false;
            scope.requestValuation = function () {
                scope.valuationRequested = true;
            };

            scope.redirect = function () {
                scope.callback({ obj: scope.selectedObject });
            };

            scope.buildColumns = function (num) {
                debugger;
                return new Array(num);
            };
        }
    };
}]);

angular
    .module('uiApp')
    .filter('slice', function () {
        return function (arr, start, end) {
            return arr.slice(start, end);
        };
    });
