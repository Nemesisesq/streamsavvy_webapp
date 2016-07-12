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

             scope.linkToAffiliate = function (service) {
                 if (key == 'ppv'){
                     $window.open(service.details.subscription_link);
                     mixpanel.track("Subscribe to Service", {"service name": service.chan.display_name});
                     scope.subscribe(service)
                 }
            }
        }
    }
})

app.directive('actionBlock', function ($window, PackageFactory) {

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
                    return elem == service.chan.source
                })
            }

            var isServiceHidden = function (service) {

                return _.some(scope.package.data.services.hidden, function (elem) {
                    return elem == service.chan.source
                })
            }

            var save = function (s) {
                PackageFactory.setPackage(s)
            }

            if (isServiceAdded(scope.service)) {
                service.added = true
            }

            if (isServiceHidden(scope.service)) {
                service.hidde = true
            }

            scope.subscribe = function (service) {
                debugger

                if (scope.package.data.services.subscribed == undefined) {
                    scope.package.data.services = {subscribed: []}
                }

                if (isServiceAdded(service)) {
                    scope.package.data.services.subscribed.push(service.chan.source);
                    service.added = true;
                    mixpanel.track("Already Have Service", {"service name": service.chan.display_name});
                    save(scope.package)
                }
            }

            scope.linkToAffiliate = function (service) {
                $window.open(service.details.subscription_link);
                mixpanel.track("Subscribe to Service", {"service name": service.chan.display_name});
                scope.subscribe(service)
            }

            scope.unsubscribe = function (service) {
                scope.package.data.services.subscribed = _.remove(scope.package.data.services.subscribed, service.chan.source)
                service.added = false;
                save(scope.package)
            }

            scope.hideService = function (service) {
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

            debugger;

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

            scope.removeElementFromDom = function (service) {

                element.remove()
            }

            $http.get('/service_description/' + scope.service.chan.source)
                .then(function (data) {
                    scope.service.details = data.data;
                    // console.log(data)

                })

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

$(document).ready(function () {
    _.sortBy($('.checkout-show-title'), function () {

        return $(this).width
    })
})
