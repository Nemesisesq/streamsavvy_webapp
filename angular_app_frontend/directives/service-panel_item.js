/**
 * Created by Nem on 5/11/16.
 */
app.directive('servicePanelItem', function sPanelItem() {
    return {
        scope: {
            value: '=',
            key: '=',
        },

        templateUrl: '/static/partials/service-panel/panel-item.html',
        link: function (scope) {

            var titles = {
                'ppv': 'Pay Per View',
                'ota': 'Over The Air',
                'not_ota': "",

            }

            scope.open = false;

            scope.formatServiceTitle = function (key) {
                return titles[key]

            }

        }
    }
})
    .directive('serviceList', function () {
        return {
            scope: {
                value: '=',
                key: '=',
            },

            templateUrl: '/static/partials/service-panel/service-list.html',
            link: function (scope) {

                var titles = {
                    'ppv': 'Pay Per View',
                    'ota': 'Over The Air',
                    'not_ota': "",

                }

                scope.open = false;

                scope.formatServiceTitle = function (key) {
                    return titles[key]

                }

            }
        }

    })
    .directive('hideDuplicate', function (_) {

        function checkPrevious(element) {
            var dupeCollection = _.initial(angular.element('[hide-duplicate]'));
            if (dupeCollection.length > 0) {
                var res = _.some(dupeCollection, function (elem) {
                    elem = angular.element(elem);
                    return elem.scope().show.title == element.scope().show.title
                })

                return res
            }

            return res

        }

        return {
            restrict: 'A',
            link: function (scope, element, attrs, controller) {
                // debugger;

                if (checkPrevious(element)) {
                    element.remove()

                }
            }

        }

    })
    .directive('combineShowtime', function ($timeout) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs, controller) {
                scope.$watchCollection('pkg.data.content', function () {
                    $timeout(function () {
                        if (scope.listOfServices) {
                            scope.listOfServices.not_ota = _.compact(scope.listOfServices.not_ota);
                            var re = new RegExp(/showtime/i);
                            var combinedShowtimeServices = _.chain(scope.listOfServices.not_ota)
                                .filter(function (index) {

                                    return re.test(index.chan.display_name)
                                })
                                .reduce(function (sum, n) {
                                    sum.shows = _.chain(sum.shows)
                                        .concat(n.shows)
                                        .uniqBy('title')
                                        .value();
                                    return sum
                                })
                                .value();

                            var nonShowtimeServices = _.chain(scope.listOfServices.not_ota)
                                .filter(function (index) {
                                    return !re.test(index.chan.display_name)
                                }).value()

                            scope.listOfServices.not_ota = _
                                .chain(nonShowtimeServices)
                                .concat(combinedShowtimeServices)
                                .compact()
                                .value()
                        }
                    }, 0)
                })

            }
        }
    })
