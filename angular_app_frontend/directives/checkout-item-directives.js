/**
 * Created by Nem on 6/4/16.
 */

app.directive('checkoutItem', function () {
    return {
        restrict: 'E',
        templateUrl: 'static/partials/checkout-list/checkout-item-template.html',
        scope: {
            key: '=',
            value: '=',
            package: '='
        },

        link: function (scope, element) {
            scope.windowWidth = window.innerWidth;

            scope.fixWindows = function (key) {
                if (key == 'misc') {
                    return 'MISC'
                }

                if (key == 'binge') {
                    return 'Binge Subscription'
                }

                if (key == 'on_demand') {
                    return 'On Demand Subscription'
                }

                if (key == 'ota') {
                    return 'Live Subscription'
                }

                if (key == 'ppv') {

                    return 'Pay Per Episode or Season'
                }
            }


        }
    }
})

app.directive('checkoutImageBlock', function ($http) {
    return {
        restrict: 'E',
        templateUrl: 'static/partials/checkout-list/checkout-image-block.html',
        scope: {
            service: '=',
            key: '='
        },

        link: function (scope, element) {
            scope.processServiceUrl = function (service) {
                if (scope.key == 'ota') {
                    return 'ota_sprite'
                }
                return service + "_sprite"
            }

            $http.get('viewing_windows/' + scope.service.chan.source)
                .then(function (data) {

                    if (scope.key != 'ppv') {
                        scope.service.windows = JSON.parse(data.data[0].windows)
                    }
                })


        }
    }
})

app.directive('actionBlock', function ($window, PackageFactory, ServiceTotalFactory) {

    return {
        restrict: 'E',
        templateUrl: 'static/partials/checkout-list/action-block.html',
        scope: {
            service: '=',
            package: '='
        },

        link: function (scope, element) {

            var isServiceAdded = function (service) {

                return _.some(scope.package.data.services.subscribed, function (elem) {
                    return elem.chan.source == service.chan.source
                })
            }

            var isServiceHidden = function (service) {

                return _.some(scope.package.data.services.hidden, function (elem) {
                    return elem.chan.source == service.chan.source
                })
            }


            var setPrice = function () {
                scope.package.data.services.price = computePrice();
            }

            var save = function (s) {
                PackageFactory.setPackage(s)
            }

            if (isServiceAdded(scope.service)) {
                scope.service.added = true
            }

            if (isServiceHidden(scope.service)) {
                scope.service.hidden = true
            }
            if (scope.package.data.services.subscribed) {

                setPrice();
            }

            function computePrice() {
                return _.chain(scope.package.data.services.subscribed)
                    .map(function (x) {
                        return parseFloat(x.details.price)

                    })
                    .reduce(function (s, e) {
                        return s += e
                    }).thru(function (sum) {


                        ServiceTotalFactory.setPrice(sum)

                        return sum

                    }).value()
            }


            scope.subscribe = function (service) {

                mixpanel.track('Checkout action buttons', {
                    "id": 9.1,
                    "service": service.chan.source,
                    "user": $window.sessionsStorage.user,
                    "event": "Already have it"

                })

                if (scope.package.data.services.subscribed == undefined) {
                    scope.package.data.services = {subscribed: []}
                }

                if (!isServiceAdded(service)) {
                    scope.package.data.services.subscribed.push(service);
                    service.added = true;
                    mixpanel.track("Already Have Service", {"service name": service.chan.display_name});
                    save(scope.package)
                }

                setPrice();


            }

            scope.linkToAffiliate = function (service) {

                mixpanel.track('Checkout action buttons', {
                    "id": 9.2,
                    "service": service.chan.source,
                    "user": $window.sessionsStorage.user,
                    "event": "Subscribe"

                })
                $window.open(service.details.subscription_link);
                mixpanel.track("Subscribe to Service", {"service name": service.chan.display_name});
                scope.subscribe(service)
            }

            scope.unsubscribe = function (service) {

                mixpanel.track('Checkout action buttons', {
                    "id": 9.3,
                    "service": service.chan.source,
                    "user": $window.sessionsStorage.user,
                    "event": "unsubscribe"

                })

                scope.package.data.services.subscribed = _.filter(scope.package.data.services.subscribed, function (elem) {
                    return elem.chan.source != service.chan.source
                })
                service.added = false;
                setPrice();
                save(scope.package)
            }

            scope.hideService = function (service) {

                mixpanel.track('Checkout action buttons', {
                    "id": 9.4,
                    "service": service.chan.source,
                    "user": $window.sessionsStorage.user,
                    "event": "hide"

                })
                if (scope.package.data.services.hidden == undefined) {
                    scope.package.data.services = {hidden: []}
                }

                scope.package.data.services.hidden.push(service.chan.source);
                service.hidden = true;
                save(scope.package)
            }
        }
    }


})


app.directive('alignRemoveButton', function (CheckoutFactory) {
    return {
        restrict: 'A',

        link: function (scope, element, attrs) {

            CheckoutFactory.getLongestShowLength()

        }
    }
})

app.factory('CheckoutFactory', function () {
    var _longestShowLength;
    return {
        setLongestShowLength: function (length) {
            _longestShowLength = length;
        },

        getLongestShowLength: function () {
            return _longestShowLength;
        }
    }
})

app.directive('checkoutShows', function () {
    return {
        restrict: 'E',
        templateUrl: 'static/partials/checkout-item-shows.html',
        scope: {
            show: '=',
        },

        link: function (scope, element) {

        }
    }
})

app.directive('checkoutService', function ($http, $window) {
    return {
        restrict: 'E',
        templateUrl: 'static/partials/checkout-list/checkout-service-template.html',
        scope: {
            service: '=',
            key: '=',
            package: '='
        },
        link: function (scope, elem, attrs) {

            //  ;

            if (_.includes(scope.package.data.services.subscribed, elem)) {
                scope.service.added = true
            }

            if (_.includes(scope.package.data.services.hidden, elem)) {
                scope.service.hidden = true
            }

            $http.get('/service_description/' + scope.service.chan.source)
                .then(function (data) {
                    scope.service.details = data.data
                    // console.log(data)

                })

            scope.windowWidth = window.innerWidth;
            scope.removeServiceFromPackage = function (service) {

                scope.package.data.services.pop(service)
            }

            scope.removeElementFromDom = function (service) {

                element.remove()
            }
        }
    }
})

app.directive('ppvCheckoutItem', function ($window, $http) {
    return {
        restrict: 'E',
        templateUrl: 'static/partials/checkout-list/ppv-checkout-item.html',
        scope: {
            key: '=',
            value: '=',
            package: '='
        },
        link: function (scope, element, attrs) {

            scope.windowWidth = $window.innerWidth

            scope.value = _.map(scope.value, function (elem) {
                $http.get('/service_description/' + elem.chan.source)
                    .then(function (data) {
                        elem.details = data.data
                    })
                return elem
            })

            scope.linkToAffiliate = function (service) {
                mixpanel.track('PPV clicked', {
                    "id": 10,
                    "service": service.chan.source,
                    "user": $window.sessionStorage.user
                })
                $window.open(service.details.subscription_link);
                mixpanel.track("Subscribe to Service", {"service name": service.chan.display_name});
            }
        }
    }
})


app.directive('checkoutInstructions', function () {
    return {
        templateUrl: 'static/partials/checkout-list/checkout-instructions.html',
        restrict: 'E',
        link: function (scope, element, attrs) {

        }
    }
})

app.directive('hardwareRow', function () {
    return {
        templateUrl: 'static/partials/checkout-list/hardware-template.html',
        restrict: 'E',
        controller: 'HardwareController'
    }
})

$(document).ready(function () {
    _.sortBy($('.checkout-show-title'), function () {

        return $(this).width
    })
})
