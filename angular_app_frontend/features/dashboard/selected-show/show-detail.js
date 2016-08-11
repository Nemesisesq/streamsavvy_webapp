/**
 * Created by Nem on 3/7/16.
 */

app.directive('showDetail', function (PackageFactory, $q, SLING_CHANNELS) {
    return {
        restrict: 'E',
        templateUrl: '/static/partials/selected-show/select.html',
        controller: 'ShowGridController',

        link: function (scope) {


            // $('.background').scroll(function () {
            //     // console.log($('#sticky').offset().top)
            //     if($('#sticky').offset().top <= 51){
            //         $('#sticky').addClass('fixed')
            //     }
            //
            //     if($('.scrolling-part').offset().top >= 80){
            //         $('#sticky').removeClass('fixed')
            //     }
            // })

            scope.emptyServices = (function () {
                var res = $('#overlay-icons').children().length == 0;
                return res
            })


            scope.formatDate = function (dateString) {
                return moment(dateString).format('MMMM D, Y')
            }

            scope.fixTitle = function (key) {
                if (key == 'misc') {
                    return 'MISC'
                }

                if (key == 'binge') {
                    return 'Binge Subscription'
                }

                if (key == 'on_demand') {
                    return 'On Demand Subscription'
                }

                if (key == 'live') {
                    return 'Live Subscription'
                }

                if (key == 'pay_per_view') {

                    return 'Pay Per Episode or Season'
                }
            }
            scope.hasOwnApp = function (key, item) {
                servicesWithApps = ['CBS', 'NBC', 'HBO', 'HBO NOW', 'Showtime', 'Starz', 'History Channel'];
                if (key == 'live' && item.name != 'Sling' && item.name != 'OTA') {
                    if (item.hasOwnProperty('display_name')) {

                        return _.some(servicesWithApps, function (elem) {
                            return elem == item.display_name;
                        })
                    }
                    return _.some(servicesWithApps, function (elem) {
                        return elem == item.name;
                    })
                }
                return true
            }
        }
    }
})


app.directive('openDetail', function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            // alert('Hello World');
            $timeout(function () {
                if (scope.$last && scope.show.justAdded) {
                    var ev = {};
                    ev.currentTarget = element[0];
                    ev.target = element.context.children[0];
                    scope.showDetail(scope.show, ev);
                    scope.show.justAdded = false
                }
            }, 1000)
        }
    }
})

app.directive('viewingWindow', function (_, $http, PackageFactory, $window, $timeout) {
    return {
        restrict: 'E',
        templateUrl: '/static/partials/selected-show/viewingWindows.html',
        controller: 'ViewWindowController',
        scope: {
            service: '=',
            detail: '='
        },

        link: function (scope, element, attrs) {

            var pkg = PackageFactory.getPackage()

            var isServiceAdded = function (service) {


                if (pkg.data.services.subscribed) {
                    return _.some(pkg.data.services.subscribed, function (elem) {
                        return elem.source == service.source
                    })
                }
            }

            debugger

            $http.get('/service_description/' + scope.service.source)
                .then(function (data) {
                    scope.service.details = data.data
                    // console.log(data)

                })

            scope.closeAllTooltips = function () {
                _.forEach(scope.detail.sortedServices, function (key) {
                    _.forEach(scope.detail[key], function (elem) {
                        elem.isOpen = false

                    })
                })
            };
            scope.openTooltip = function () {
                this.closeAllTooltips();

                scope.service.isOpen = !scope.service.isOpen;
                var that = this
                $timeout(function () {

                    that.closeAllTooltips()
                }, 8000)

            }

            scope.linkToAffiliate = function () {

                debugger;

                $window.open(scope.service.details.subscription_link);
                mixpanel.track("Subscribe to Service", {"service name": scope.service.display_name});


                if (pkg.data.services.subscribed == undefined) {
                    pkg.data.services = {subscribed: []}
                }

                if (!isServiceAdded(scope.service)) {
                    pkg.data.services.subscribed.push(scope.service);
                    scope.service.added = true;
                    mixpanel.track("Subscription in overlay clicked", {"service name": scope.service.display_name});
                    PackageFactory.setPackage(pkg)
                }

                scope.service.isOpen = false;
            }

            if($window.innerWidth < 786){
                scope.ttPlacement = 'top'
            } else {
                scope.ttPlacement = 'left'
            }

        }
    }
})


app.controller('ViewWindowController', function ($scope) {

})
