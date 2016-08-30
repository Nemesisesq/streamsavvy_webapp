/**
 * Created by Nem on 6/12/15.
 */

function fixMetaTags() {

    // debugger;

    var x = $('body meta')
    y = $('body title')
    $('body meta').remove()
    $('body title').remove()
    $('head').append(x)
    $('head').append(y)


}

function runBlock($rootScope, MetaTags) {
    $rootScope.MetaTags = MetaTags;
}

function configure(UIRouterMetatagsProvider) {
    UIRouterMetatagsProvider
        .setTitlePrefix('Streamsavvy | ')
        // .setTitleSuffix(' | Making Streaming Easy')
        .setDefaultTitle('Streamsavvy')
        .setDefaultDescription('StreamSavvy engages people to discover and access the best TV content.')
        .setDefaultKeywords('keywords')
        .setStaticProperties({
            'fb:app_id': '904023313005052',
            'og:site_name': 'www.streamsavvy.tv'
        })
        .setOGURL(true);
}


var app = angular.module('myApp', [
    "ui.router",
    "ngCookies",
    "ui.bootstrap",
    "ngAnimate",
    'slick',
    'angular-growl',
    'environment',
    'ui.router.metatags',
    'ngStorage',
])


    .run(['$rootScope', 'MetaTags', runBlock])
    .config(['UIRouterMetatagsProvider', configure])

    .constant('SLING_CHANNELS', ['ESPN',
        'ESPN2',
        'AMC',
        'Food Network',
        'A & E',
        'History',
        'TNT',
        'El Rey',
        'HGTV',
        'IFC',
        'Disney Channel',
        'Polaris +',
        'Maker',
        'TBS',
        'Travel Channel',
        'Adult Swim',
        'CNN',
        'H2',
        'Cartoon Network',
        'ABC Family',
        'Lifetime',
        'Galavision',
        'Bloomberg Television'])


app.config(['growlProvider', '$httpProvider', function (growlProvider, $httpProvider) {
    growlProvider.globalReversedOrder(true);
    growlProvider.globalTimeToLive(2000);
    growlProvider.globalDisableCloseButton(true)
    $httpProvider.interceptors.push(growlProvider.serverMessagesInterceptor)

}]);

app.config(function ($httpProvider, $stateProvider, $urlRouterProvider, $windowProvider) {

    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';

    $stateProvider
        .state('nav', {
            abstract: true,//abstract means unless navigation's child is rendered, navigation itself can't be rendered
            templateUrl: "/static/partials/navigation.html",
            controller: 'navigation'

        })
        .state('nav.home', {

            url: '/',
            data: {
                isHomePage: true
            },
            views: {
                'home': {
                    templateUrl: 'static/partials/home.html',
                    controller: 'HomeController'
                },
                'footer': {
                    templateUrl: 'static/partials/footer.html'
                }
            },
            metaTags: {
                // 'title': 'Homepage',
                'title': ' Find the Best TV Without Cable',
                'description': ' StreamSavvy makes it easy to find, access, and stream the TV you want without cable. Visit the site to search, learn, and sign up.'
            },
            onEnter: function ($timeout) {
                $timeout(function () {
                    fixMetaTags()
                })

                $('div').css('max-width', window.innerWidth)

                $('body').removeClass('gradient-background');
            }

        })
        .state('dash', {
            templateUrl: '/static/partials/dashboard.html',
            abstract: true,
            onEnter: function ($state) {

                $window = $windowProvider.$get();
                if ($window.innerWidth < 767) {
                    $state.go('mobile.shows')
                }

                $('body').addClass('gradient-background');

                $('div').css('max-width', window.innerWidth)
            }
        })
        .state('dash.dashboard', {
            url: '/dashboard',
            data: {
                dashboard: true
            },
            metaTags: {
                // 'title': 'Dashboard',
                'title': ' Search for Your Favorite TV Shows',
                'description': " Search for your favorite TV shows and find where to watch them. StreamSavvy's algorithm gives you the best recommendations from hundreds of streaming services."
            },
            views: {

                'navigation': {
                    templateUrl: "/static/partials/navigation.html",
                    controller: 'navigation'
                },
                'progress': {
                    templateUrl: 'static/partials/progress.html',
                    controller: 'ProgressController'
                },
                'search': {
                    templateUrl: 'static/partials/search.html',
                    controller: 'search'
                },
                'shows': {
                    templateUrl: '/static/partials/show-grid/show-grid.html',
                    controller: 'ShowGridController'
                },
                'select': {
                    templateUrl: '/static/partials/selected-show/select.html'
                },
                'footer': {
                    templateUrl: 'static/partials/footer.html'
                }
            },
            onEnter: function ($timeout) {
                $('body').addClass('no-scroll');


                $timeout(function () {

                    fixMetaTags()
                })

            },
            onExit: function () {
                $('body').removeClass('no-scroll')
            }
        })
        .state('check', {
            templateUrl: '/static/partials/checkout.html',
            abstract: true
        })
        .state('check.out', {
            url: '/checkout',
            onEnter: function ($timeout) {
                $timeout(function () {

                    fixMetaTags()
                })

                $('div').css('max-width', window.innerWidth)
            },
            data: {
                checkout: true
            },
            metaTags: {
                // 'title': 'Checkout',
                'title': ' Subscribe and Add the TV Services You Want',
                'description': ' Manage all of your TV streaming services in one place. Subscribe to services you want and add the services you have. If you need a device, find that here too.'
            },
            views: {
                'navigation': {
                    templateUrl: "/static/partials/navigation.html",
                    controller: 'navigation'
                },
                checkoutList: {
                    templateUrl: "static/partials/checkout-list/checkout-list.html",
                    controller: 'CheckoutController'
                },
                'footer': {
                    templateUrl: 'static/partials/footer.html'
                }
            }
        })
        .state('mobile', {
            abstract: true,
            templateUrl: 'static/partials/mobile.html',
            controller: 'MobileController'

        })
        .state('mobile.shows', {
            url: '/m/shows',
            data: {},
            views: {
                'navigation': {
                    templateUrl: "/static/partials/navigation.html",
                    controller: 'navigation'
                },
                'search': {
                    templateUrl: 'static/partials/search.html',
                    controller: 'search'
                },
                'shows': {
                    templateUrl: '/static/partials/show-grid/show-grid.html',
                    controller: 'ShowGridController'
                },


            }
        })
        .state('mobile.services', {
            url: '/m/services',
            data: {},
            views: {

                'navigation': {
                    templateUrl: "/static/partials/navigation.html",
                    controller: 'navigation'
                },

                'services': {

                    templateUrl: "static/partials/mobile-checkout.html",
                    controller: 'CheckoutController'
                },


            }
        })
        .state('mobile.hardware', {
            url: '/m/hardware',
            data: {},
            views: {
                'navigation': {
                    templateUrl: "/static/partials/navigation.html",
                    controller: 'navigation'
                },
                'hardware': {
                    templateUrl: '/static/partials/hardware-panel/hardware-panel.html',
                    controller: 'HardwareController'
                },

                'footer': {
                    templateUrl: 'static/partials/footer.html'
                }

            }
        })


    $urlRouterProvider.otherwise("/")


});

//TODO uncomment this after developing the mobile checkout page

app.run(function ($window, $state) {


    $($window).resize(function () {
        var curr = $state.current.name

        var d_state = RegExp('dash').test(curr) ? true : false
        var m_state = RegExp('mobile').test(curr) ? true : false
        if (this.innerWidth > 767) {
            if (m_state) {

                if (/services/.test(curr)) {
                    $state.go('check.out')
                } else if (/dashboard/.test(curr)) {

                    $state.go('dash.dashboard')
                } else {
                    $state.go('nav.home')
                }

            }
        } else {
            if (!m_state) {

                if (/dashboard/.test(curr)) {
                    $state.go('mobile.shows')

                } else if (/check/.test(curr)) {
                    $state.go('mobile.services')
                } else {
                    $state.go('nav.home')
                }

            }
        }
    })
})

// app.controller('HomeController', function () {
//     $('body').attr('id', 'background')
// })


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


                if (scope.package.data.services.subscribed) {
                    return _.some(scope.package.data.services.subscribed, function (elem) {
                        return elem.chan.source == service.chan.source
                    })
                }
            }

            var isServiceHidden = function (service) {


                if (scope.package.data.services.hidden) {

                    return _.some(scope.package.data.services.hidden, function (elem) {
                        return elem.chan.source == service.chan.source
                    })
                }
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
                    "user": $window.sessionStorage.user,
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
                    "user": $window.sessionStorage.user,
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
                    "user": $window.sessionStorage.user,
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
                    "user": $window.sessionStorage.user,
                    "event": "hide"

                })
                if (scope.package.data.services.hidden == undefined) {
                    scope.package.data.services = {hidden: []}
                }

                scope.package.data.services.hidden.push(service);
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

/**
 * Created by Nem on 7/27/16.
 */
/* This is a place for general directives
* that can be applied site wide
**/

app.directive('imageonload', function($timeout) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {

            element.bind('load', function() {
                var that = this
                $timeout(function(){

                that.classList.add('loaded')
                    $('.img-mask').fadeIn()
                }, chance.natural({min: 10, max:700}))
            });
            element.bind('error', function(){
                console.log(this + 'image could not be loaded');
            });
        }
    };
})


/**
 * Created by Nem on 9/18/15.
 */
app.directive('ssImageBlock', function (http, $rootScope) {
    return {
        restrict: 'E',
        //replace: true,
        //transclude: true,
        scope: {
            category: '=',
            obj: '=',
            hello: '=',
            templateUrl: '='



        },
        templateUrl: '/static/partials/step-three/image_block.html',

        link: function (scope, element, attrs) {
            scope.that = "hello world";

            scope.toggleSelected = function (item) {
                http.getRestPackage()
                    .then(function (p) {
                        if(item.selected){
                            _.remove(p.hardware, function(elem){
                                return elem == item.url
                            })


                            // console.log(p)
                        } else{
                            p.hardware.push(item.url)
                        }

                        http.putPackage(p)
                            .then(function(data){

                                $rootScope.load()
                            })

                    })

            }


        }

    }
})

/**
 * Created by Nem on 6/1/16.
 */
app.directive('mobileTabs', function ($location, $anchorScroll, $rootScope) {
    return {
        // restrict: 'E',
        templateUrl: 'static/partials/mobile-toolbar.html',
        // controller: 'MobileController',

        link: function (scope) {

            scope.mobileCloseOverlay = function () {


                $rootScope.$broadcast('close_overlay')
            }

            scope.scrollTo = function (tag) {
                var old = $location.hash()
                $location.hash(tag);
                $anchorScroll();
                $location.hash(old)

            }

        }
    }
})

/**
 * Created by Nem on 5/11/16.
 */

app.directive('sourced', function(){
    return {
        restrict: 'A',
        scope: {
            service: '='
        },
        link : function(scope){
            if(!scope.service.hasOwnProperty('source')) {
                if(scope.service.hasOwnProperty('guidebox_data')){
                    scope.service.source = scope.service.guidebox_data.short_name
                } else {
                    scope.service.source = _.lowerCase(scope.service.name)
                }

            }
        }
    }
})

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
                //  ;

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

/**
 * Created by Nem on 9/18/15.
 */
app.directive('viewWindow', function (http, $rootScope, PackageFactory, $q) {
    return {
        restrict: 'AEC',
        //replace: true,
        //transclude: true,
        scope: {
            w: '=',
            content: '=',
            savePackage: '=',
            package: '='


        },
        templateUrl: '/static/partials/step-one/view-window.html',

        link: function (scope, element, attrs) {


            scope.id = scope.w.type;

            scope.channels = scope.content.channels.web.episodes.all_sources;

            scope.sources = _.union(scope.channels, scope.content.content_provider)

            scope.that = "hello world";

            var checkWindow = function () {
                
                var v = scope.content.viewingWindows[scope.id];
                if (!v.selected) {

                    v = _.omit(v, 'channel')

                    scope.content.viewingWindows[scope.id] = v;
                }
                return v
            }


            scope.savePackage = function () {
                var content = checkWindow();


                PackageFactory.updatePackageChannels(scope);
                
                
                PackageFactory.setPackage(scope.package)
            }

            //scope.$watchCollection('package.content', function () {
            //    PackageFactory.setPackage(scope.package)
            //});

            scope.prePopulateWindowProvider = function (content, prop) {


                //var array = _.intersection($scope.package.providers, content.content_provider);

                var array = _.filter(scope.channels, function (prov) {
                    return _.includes(_.map(scope.package.providers, function (elem) {
                        return elem.name
                    }), prov.name)
                })

                if (prop == 'onDemand') {

                    _.remove(array, function (n) {
                        return false

                    })
                } else if (prop == 'fullseason') {

                    _.remove(array, function (n) {
                        return false
                    })
                }

                return _.isEmpty(array) ? false : _.first(array).display_name;

            }

            //var updatePackageChannels = function () {
            //
            //
            //
            //    return $q(function (resolve, reject) {
            //        var chans = _.map(scope.package.content, function (elem) {
            //            var x = []
            //            _.forEach(scope.$parent.directiveVW , function (w) {
            //
            //                var window = elem.viewingWindows[w.type];
            //                if (window !== undefined) {
            //                    if (!_.includes(scope.package.providers, window.channel.source)) {
            //                        x.push(window.channel)
            //                    }
            //                }
            //
            //            })
            //
            //            return x
            //        })
            //
            //        chans = _.flatten(chans)
            //
            //        scope.package.providers = chans
            //    })
            //
            //
            //}

            scope.saveWindowProvider = function (channel) {
                var viewingWindow = scope.content.viewingWindows[scope.id];

                if (viewingWindow.selected) {
                    viewingWindow.channel = channel;
                } else {
                    _.omit(viewingWindow, 'channel')
                }

                scope.savePackage()

                PackageFactory.updatePackageChannels(scope);



                //if (scope.package.chosenProviders !== undefined) {
                //    if (!_.includes(scope.package.providers, channel.source)) {
                //         ;
                //        scope.package.providers.push(channel)
                //    }
                //} else {
                //}

                //scope.savePackage()

            }


        }

    }

})

/**
 * Created by Nem on 7/26/16.
 */
app.filter('unique', function () {
    return function (collection, keyname) {
        var output = [],
            keys = [];

        angular.forEach(collection, function (item) {
            var key = item[keyname];
            if (keys.indexOf(key) === -1) {
                keys.push(key);
                output.push(item);
            }
        });

        return output;
    };
});

app.filter('unchosen', function () {
    return function (collection, scope) {
        var res = _.filter(collection, function (item) {
            return !_.some(scope.package.data.content, ['title', item.title])
        })

        return res
    }
})


app.filter('liveFilter', function(){
    return function (collection, bool) {

        var res = _.filter(collection, function(item){
            return item.model.hasOwnProperty('category') == bool
        })

        return res

    }
})
/**
 * Created by Nem on 11/17/15.
 */

function isLive(elem) {
    if (elem.source != 'hulu_free') {
        return _.includes(elem.type, 'tv') || _.includes(elem.type, 'tele') || elem.type === 'free' || _.includes(elem.display_name.toLowerCase(), 'now');
    }


}

function isOnDemand(elem) {

    if (elem.source == 'netflix') {
        return false
    }

    if (elem.source == 'hulu_free') {
        return false
    }

    return _.includes(elem.type, 'sub')
}

app.filter('channel', function () {
    return function (input, type) {


        var list = _.filter(input, function (elem) {
            if (type == 'live') {
                return isLive(elem);
            }
            if (type == 'onDemand') {
                return isOnDemand(elem)
            }
            if (type == 'fullseason') {
                return _.includes(elem.type, 'sub')
            }
            if (type == 'alacarte') {
                //
                return _.includes(elem.type, 'purchase')
            }
        })

        return list
    }
})

app.filter('onDemand', function () {
    return function (input) {

        var list = _.filter(input, function (elem) {
            return elem.name != 'Netflix';
        })
        // console.log(list)
        // console.log('list')

        return list
    }

});

app.filter('fullSeason', function () {

    return function (input) {


        var list = _.filter(input, function (elem) {
            return elem.name == 'Netflix';
        })

        return list
    }

});

app.filter('unwantedChannels', function () {
    var unwantedChannelIDs = [
        150,//150
        26,
        157,
        171,  //DirecTV
        169, //Dish
        234, 70, //Food Network
         36, //HBO
        12, 54, //USA
        32, //FX
        170, //AT&T U-verse
        // 281, //Hulu with Showtime
        69, //Cinemax
        // 141, ///Showtime Freeview
        67, //TV Guide
        // 1, //Hulu_Free
        235, 16, //Watch HGTV
        22, 237, 240, //MTV
        31, //Bravo
        // 17, //A&E
        20, 101, //Syfy
        48, 59, //Comedy Central
        // 133, //Starz
        21, 241, 239, //VH1
         18, 123, //History Channel,
        795,//channel 4
        121, 190, //Esquire, Esquire Network
        // 14, 267 //Showtime

    ];
    return function (input) {
        var list = _.filter(input, function (elem) {
            var res = _.some(unwantedChannelIDs, function (x) {
                if (elem !== undefined) {
                    if (elem.chan.id !== undefined) {
                        return x === elem.chan.id;
                    } else {
                        return x === elem.chan.guidebox_data.id
                    }
                }
            })
            return !res
        })
        return list
    }
})

app.filter('onSling', function (Fuse, SLING_CHANNELS) {
    return function (input, bool) {
        return _.filter(input, function (elem) {


            var sling_fuse = new Fuse(SLING_CHANNELS, {threshold: .1});

            if (elem.diplay_name != undefined && sling_fuse.search(elem.display_name)) {
                return true == bool
            }
            if (elem.name != undefined && !_.isEmpty(sling_fuse.search(elem.name))) {
                return true == bool
            }

            if (elem.is_on_sling) {

                return true == bool
            }
            if (elem.on_sling) {

                return true == bool
            }

            if (elem.guidebox_data) {
                if (elem.guidebox_data.on_sling) {
                    return true == bool
                }
            }

            if (elem.name == 'Netflix') {
                return false
            }

            return false == bool

        })
    }
})

    .filter('onNetflix', function (_) {

        //  ;
        return function (array) {
            return _.filter(array, function(elem){
                var res = elem.on_netflix || _.some(elem.channel, ['source', 'netflix']) || _.some(elem.channel, ['source', 'netflix'])

                return res
            })
        }

    })
app.filter('unique', function() {
    return function (arr, field) {
        return _.uniq(arr, function(a) { return a[field]; });
    };
});

app.filter('customSorter', function(){
    return function(list){
        var newPpv = list.ppv;

        delete list['ppv']

        list.ppv = newPpv;

        return list
    }
})

app.filter('detailSorter', function() {
    return function (x, y){


        var order = ["live", "binge", "on_demand", "ppv"]
        return _.sortBy(x, function (key, value) {
            return _.indexOf(order, elem.key)
        })
    }
})

app.factory('http', function ($http, $log, $q) {
    return {
        get: function (url) {
            var deferred = $q.defer();
            $http.get(url)
                .success(function (data) {
                    deferred.resolve(
                        data
                    )
                });
            return deferred.promise;
        },
        getPackage: function () {
            var deferred = $q.defer();
            $http.get('/api/packageobj/')
                .success(function (data) {
                    deferred.resolve(
                        data.results[0]
                    )
                })
                .error(function (e, code) {
                    deferred.reject(e);
                    $log.error(e, code)
                });
            return deferred.promise;
        },
        getRestPackage: function () {
            var deferred = $q.defer();
            $http.get('/api/package')
                .success(function (data) {
                    deferred.resolve(
                        data.results[0]
                    )
                })
                .error(function (e, code) {
                    deferred.reject(e);
                    $log.error(e, code)
                });
            return deferred.promise;
        },

        putPackage: function (newPackage) {


            var deferred = $q.defer();
            $http.put(newPackage.url, newPackage)
                .success(function (data) {

                    deferred.resolve(data)
                })
                .error(function (e, code) {
                    deferred.reject(e);
                    $log.error(e, code)
                });
            return deferred.promise;

        },

        getDetail: function (url) {
            var deferred = $q.defer();
            $http.get(url)
                .success(function (data) {

                    deferred.resolve(
                        data
                    )
                })
                .error(function (e, code) {
                    deferred.reject(e);
                    $log.error(e, code)
                });
            return deferred.promise;
        },

        login: function (credentials) {
            return $http({
                method: 'POST',
                // url: "api-token-auth/",
                url: "login/",
                data: credentials


            })

        },

        register: function (credentials) {

            return $http({
                method: 'POST',
                url: "/sign_up/",
                data: credentials

            })
        },

        getHardware: function () {
            var deffered = $q.defer();
            $http.get('/api/hardware')
                .success(function (data) {
                    deffered.resolve(data)
                })
                .error(function (e) {
                    $log.error(e)
                });
            return deffered.promise;


        }


    }
});

/**
 * Created by Nem on 1/13/16.
 */


//angular.module('streamsavvy')

app.factory('s3FeedbackInterceptor', function ($q) {

    return {
        'request': function (config) {
            var x = config;
            return config
        },

        'response': function (response) {


            return response
        }
    }

})

    .factory('LogoutInterceptor', function ($window) {
        return {
            response: function (config) {
                //

                return config
            }
        }
    })

    .factory('IdTokenInterceptor', function () {
        return {
            request: function(config) {
                if(window.sessionStorage.anon_user && config.method == 'GET' && config.url == '/api/package/'){
                    config.url = config.url + '?anon_user=' + window.sessionStorage.anon_user


                }

                return config
            },

            response: function(response) {
                //

                if(response.config.url == "/api/users" && response.data.results[0].email == ""){
                    if(!window.sessionStorage.anon_user){
                        window.sessionStorage.anon_user = response.data.results[0].username
                    }
                //
                }

                return response


            }
        }

    })

    .factory('TokenAuthInterceptor', function ($window, $q) {
        return {
            request: function (config) {



                config.headers = config.headers || {}
                if ($window.sessionStorage.token) {
                    config.headers.Authorization = $window.sessionStorage.token;
                }
                return config
            },
            response: function (response) {
                if (response.status === 401) {
                    // handle the case where the user is not authenticated
                }
                if (response.data.token) {
                    $window.sessionStorage.token = response.data.token
                }

                if (response.data != undefined && response.data.hasOwnProperty('token')) {
                    $window.sessionStorage.token = response.data.token
                }
                return response || $q.when(response);
            }
        }
    })

    .config(['$httpProvider', '$provide', '$windowProvider' ,function ($httpProvider, $provide, $windowProvider) {
        $httpProvider.interceptors.push('s3FeedbackInterceptor');
        $httpProvider.interceptors.push('LogoutInterceptor');
        $httpProvider.interceptors.push('TokenAuthInterceptor')
        $httpProvider.interceptors.push('IdTokenInterceptor')

    }])

/* Modernizr 2.6.2 (Custom Build) | MIT & BSD
 * Build: http://modernizr.com/download/#-shiv-cssclasses-load
 */
window.Modernizr=function(a,b,c){function u(a){j.cssText=a}function v(a,b){return u(prefixes.join(a+";")+(b||""))}function w(a,b){return typeof a===b}function x(a,b){return!!~(""+a).indexOf(b)}function y(a,b,d){for(var e in a){var f=b[a[e]];if(f!==c)return d===!1?a[e]:w(f,"function")?f.bind(d||b):f}return!1}var d="2.6.2",e={},f=!0,g=b.documentElement,h="modernizr",i=b.createElement(h),j=i.style,k,l={}.toString,m={},n={},o={},p=[],q=p.slice,r,s={}.hasOwnProperty,t;!w(s,"undefined")&&!w(s.call,"undefined")?t=function(a,b){return s.call(a,b)}:t=function(a,b){return b in a&&w(a.constructor.prototype[b],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(b){var c=this;if(typeof c!="function")throw new TypeError;var d=q.call(arguments,1),e=function(){if(this instanceof e){var a=function(){};a.prototype=c.prototype;var f=new a,g=c.apply(f,d.concat(q.call(arguments)));return Object(g)===g?g:f}return c.apply(b,d.concat(q.call(arguments)))};return e});for(var z in m)t(m,z)&&(r=z.toLowerCase(),e[r]=m[z](),p.push((e[r]?"":"no-")+r));return e.addTest=function(a,b){if(typeof a=="object")for(var d in a)t(a,d)&&e.addTest(d,a[d]);else{a=a.toLowerCase();if(e[a]!==c)return e;b=typeof b=="function"?b():b,typeof f!="undefined"&&f&&(g.className+=" "+(b?"":"no-")+a),e[a]=b}return e},u(""),i=k=null,function(a,b){function k(a,b){var c=a.createElement("p"),d=a.getElementsByTagName("head")[0]||a.documentElement;return c.innerHTML="x<style>"+b+"</style>",d.insertBefore(c.lastChild,d.firstChild)}function l(){var a=r.elements;return typeof a=="string"?a.split(" "):a}function m(a){var b=i[a[g]];return b||(b={},h++,a[g]=h,i[h]=b),b}function n(a,c,f){c||(c=b);if(j)return c.createElement(a);f||(f=m(c));var g;return f.cache[a]?g=f.cache[a].cloneNode():e.test(a)?g=(f.cache[a]=f.createElem(a)).cloneNode():g=f.createElem(a),g.canHaveChildren&&!d.test(a)?f.frag.appendChild(g):g}function o(a,c){a||(a=b);if(j)return a.createDocumentFragment();c=c||m(a);var d=c.frag.cloneNode(),e=0,f=l(),g=f.length;for(;e<g;e++)d.createElement(f[e]);return d}function p(a,b){b.cache||(b.cache={},b.createElem=a.createElement,b.createFrag=a.createDocumentFragment,b.frag=b.createFrag()),a.createElement=function(c){return r.shivMethods?n(c,a,b):b.createElem(c)},a.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+l().join().replace(/\w+/g,function(a){return b.createElem(a),b.frag.createElement(a),'c("'+a+'")'})+");return n}")(r,b.frag)}function q(a){a||(a=b);var c=m(a);return r.shivCSS&&!f&&!c.hasCSS&&(c.hasCSS=!!k(a,"article,aside,figcaption,figure,footer,header,hgroup,nav,section{display:block}mark{background:#FF0;color:#000}")),j||p(a,c),a}var c=a.html5||{},d=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,e=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,f,g="_html5shiv",h=0,i={},j;(function(){try{var a=b.createElement("a");a.innerHTML="<xyz></xyz>",f="hidden"in a,j=a.childNodes.length==1||function(){b.createElement("a");var a=b.createDocumentFragment();return typeof a.cloneNode=="undefined"||typeof a.createDocumentFragment=="undefined"||typeof a.createElement=="undefined"}()}catch(c){f=!0,j=!0}})();var r={elements:c.elements||"abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video",shivCSS:c.shivCSS!==!1,supportsUnknownElements:j,shivMethods:c.shivMethods!==!1,type:"default",shivDocument:q,createElement:n,createDocumentFragment:o};a.html5=r,q(b)}(this,b),e._version=d,g.className=g.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(f?" js "+p.join(" "):""),e}(this,this.document),function(a,b,c){function d(a){return"[object Function]"==o.call(a)}function e(a){return"string"==typeof a}function f(){}function g(a){return!a||"loaded"==a||"complete"==a||"uninitialized"==a}function h(){var a=p.shift();q=1,a?a.t?m(function(){("c"==a.t?B.injectCss:B.injectJs)(a.s,0,a.a,a.x,a.e,1)},0):(a(),h()):q=0}function i(a,c,d,e,f,i,j){function k(b){if(!o&&g(l.readyState)&&(u.r=o=1,!q&&h(),l.onload=l.onreadystatechange=null,b)){"img"!=a&&m(function(){t.removeChild(l)},50);for(var d in y[c])y[c].hasOwnProperty(d)&&y[c][d].onload()}}var j=j||B.errorTimeout,l=b.createElement(a),o=0,r=0,u={t:d,s:c,e:f,a:i,x:j};1===y[c]&&(r=1,y[c]=[]),"object"==a?l.data=c:(l.src=c,l.type=a),l.width=l.height="0",l.onerror=l.onload=l.onreadystatechange=function(){k.call(this,r)},p.splice(e,0,u),"img"!=a&&(r||2===y[c]?(t.insertBefore(l,s?null:n),m(k,j)):y[c].push(l))}function j(a,b,c,d,f){return q=0,b=b||"j",e(a)?i("c"==b?v:u,a,b,this.i++,c,d,f):(p.splice(this.i++,0,a),1==p.length&&h()),this}function k(){var a=B;return a.loader={load:j,i:0},a}var l=b.documentElement,m=a.setTimeout,n=b.getElementsByTagName("script")[0],o={}.toString,p=[],q=0,r="MozAppearance"in l.style,s=r&&!!b.createRange().compareNode,t=s?l:n.parentNode,l=a.opera&&"[object Opera]"==o.call(a.opera),l=!!b.attachEvent&&!l,u=r?"object":l?"script":"img",v=l?"script":u,w=Array.isArray||function(a){return"[object Array]"==o.call(a)},x=[],y={},z={timeout:function(a,b){return b.length&&(a.timeout=b[0]),a}},A,B;B=function(a){function b(a){var a=a.split("!"),b=x.length,c=a.pop(),d=a.length,c={url:c,origUrl:c,prefixes:a},e,f,g;for(f=0;f<d;f++)g=a[f].split("="),(e=z[g.shift()])&&(c=e(c,g));for(f=0;f<b;f++)c=x[f](c);return c}function g(a,e,f,g,h){var i=b(a),j=i.autoCallback;i.url.split(".").pop().split("?").shift(),i.bypass||(e&&(e=d(e)?e:e[a]||e[g]||e[a.split("/").pop().split("?")[0]]),i.instead?i.instead(a,e,f,g,h):(y[i.url]?i.noexec=!0:y[i.url]=1,f.load(i.url,i.forceCSS||!i.forceJS&&"css"==i.url.split(".").pop().split("?").shift()?"c":c,i.noexec,i.attrs,i.timeout),(d(e)||d(j))&&f.load(function(){k(),e&&e(i.origUrl,h,g),j&&j(i.origUrl,h,g),y[i.url]=2})))}function h(a,b){function c(a,c){if(a){if(e(a))c||(j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}),g(a,j,b,0,h);else if(Object(a)===a)for(n in m=function(){var b=0,c;for(c in a)a.hasOwnProperty(c)&&b++;return b}(),a)a.hasOwnProperty(n)&&(!c&&!--m&&(d(j)?j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}:j[n]=function(a){return function(){var b=[].slice.call(arguments);a&&a.apply(this,b),l()}}(k[n])),g(a[n],j,b,n,h))}else!c&&l()}var h=!!a.test,i=a.load||a.both,j=a.callback||f,k=j,l=a.complete||f,m,n;c(h?a.yep:a.nope,!!i),i&&c(i)}var i,j,l=this.yepnope.loader;if(e(a))g(a,0,l,0);else if(w(a))for(i=0;i<a.length;i++)j=a[i],e(j)?g(j,0,l,0):w(j)?B(j):Object(j)===j&&h(j,l);else Object(a)===a&&h(a,l)},B.addPrefix=function(a,b){z[a]=b},B.addFilter=function(a){x.push(a)},B.errorTimeout=1e4,null==b.readyState&&b.addEventListener&&(b.readyState="loading",b.addEventListener("DOMContentLoaded",A=function(){b.removeEventListener("DOMContentLoaded",A,0),b.readyState="complete"},0)),a.yepnope=k(),a.yepnope.executeStack=h,a.yepnope.injectJs=function(a,c,d,e,i,j){var k=b.createElement("script"),l,o,e=e||B.errorTimeout;k.src=a;for(o in d)k.setAttribute(o,d[o]);c=j?h:c||f,k.onreadystatechange=k.onload=function(){!l&&g(k.readyState)&&(l=1,c(),k.onload=k.onreadystatechange=null)},m(function(){l||(l=1,c(1))},e),i?k.onload():n.parentNode.insertBefore(k,n)},a.yepnope.injectCss=function(a,c,d,e,g,i){var e=b.createElement("link"),j,c=i?h:c||f;e.href=a,e.rel="stylesheet",e.type="text/css";for(j in d)e.setAttribute(j,d[j]);g||(n.parentNode.insertBefore(e,n),m(c,0))}}(this,document),Modernizr.load=function(){yepnope.apply(window,[].slice.call(arguments,0))};
/**
 * Created by Nem on 6/27/15.
 */

function check_if_on_sling(obj) {

    if (obj.chan.on_sling) {
        return true
    } else if (obj.chan.is_on_sling) {
        return true
    } else {
        return false
    }

}

var payPerServices = ['vudu', 'amazon_buy', 'google_play', 'itunes', 'youtube_purchase'];


app.factory('N', function (envService) {
    var _netflix_shows = []

    return {
        setShows: function (shows) {
            _netflix_shows = shows
        },
        getShows: function () {
            var f = new Fuse(_netflix_shows, {threshold: .2});
            return f;
        }

    }
})

app.service('loginEventService', function ($rootScope) {
    this.broadcast = _.debounce(function () {
        $rootScope.$broadcast("open_login")
    }, 500)
    this.listen = _.debounce(function (callback) {
        $rootScope.$on("open_login", callback)

    }, 500)
})

app.service('refreshPackageService', function ($rootScope) {
    this.broadcast = _.debounce(function () {
        $rootScope.$broadcast("refresh_package")
    }, 500)
    this.listen = _.debounce(function (callback) {
        $rootScope.$on("refresh_package", callback)
    }, 500)
})

app.service('authEventService', function ($rootScope) {
    this.broadcast = _.debounce(function () {
        $rootScope.$broadcast("logged_in")

    }, 500)

    this.listen = _.debounce(function (callback) {
        $rootScope.$on("logged_in", callback)
    }, 500)
})

app.service('sInfo', function($rootScope){
    this.broadcast = _.debounce(function(){
        $rootScope.$broadcast("send_sInfo")
    }, 500)

    this.listen = _.debounce(function(callback){
        $rootScope.$on("send_sInfo", callback)
    })
})

app.factory('ServiceTotalFactory', function () {
    var _price = 0

    return {
        setPrice: function (s) {
            _price += s
        },

        getPrice: function () {
            return _price
        }
    }
})

app.factory('PackageFactory', ['$http', '$q', '_', '$window', 'loginEventService', 'authEventService', 'sInfo' ,function ($http, $q, _, $window, loginEventService, authEventService, sInfo) {
    // ;

    var _package = {};

    var _env = ""

    var _test = 1;

    var _chosenShow = {};

    var _listOfServices = [];

    var _getEmail = function () {
        //

        $http.get('/api/users')
            .then(function (data) {
                if (data.data.results[0].email) {

                    $window.sessionStorage.user = data.data.results[0].email;
                    // $localStorageProvider.set(userInfo, data.data.results[0]);

                    // $window.sessionStorage.anon_user = false
                }
            })


    }

    return {
        getEmail: function () {

            return $http.get('/api/users')
                .then(function (data) {
                    $window.sessionStorage.user = data.data.results[0].email
                    sInfo.broadcast()
                    return data
                }, function (err) {
                    return err
                })


        },

        setChosenShow: function (show) {
            _chosenShow = show
        }

        ,

        getChosenShow: function () {
            return _chosenShow;
        },

        setPackage: function (ssPackage) {
            _package = ssPackage;

            if (!_.isEmpty(ssPackage)) {
                this.postPackage(ssPackage)
            }
        },

        postPackage: _.debounce(function (ssPackage) {

            // if($window.sessionStorage.token == undefined){
            //     loginEventService.broadcast()
            // }
            $http.put(ssPackage.url, ssPackage)
                .then(function success(response) {
                    _getEmail()
                    authEventService.broadcast()
                    sInfo.broadcast()
                }, function error(response) {
                    auth_denied = [403, 401];
                    if (_.includes(auth_denied, response.status)) {
                        mixpanel.track('Save package denied')
                        //TODO remove funcitonality and add logging
                        // location.hash != '#/' && loginEventService.broadcast()
                    }
                })
        }, 0),

        getPackage: function () {
            return _package || "";
        }

        ,

        getSSTest: function () {
            // ;
            return _test;
        }
        ,

        getListOfServices: function () {

            return _listOfServices;
        }
        ,
        setListOfServices: function (listOfServices) {
            _listOfServices = listOfServices;
        }
        ,

        getServicePanelList: function () {
            var ssPackage = this.getPackage();
            if ('data' in ssPackage) {
                return $http.post('/node-data/servicelist', ssPackage)
            }
        }
        ,

        getCheckoutPanelList: function () {
            //  ;
            var ssPackage = this.getPackage();
            if ('data' in ssPackage) {
                return $http.post('/node-data/checkoutlist', ssPackage)
            }
        }
        ,

        getSonyVueList: function () {
            var ssPackage = this.getPackage();
            if (ssPackage.hasOwnProperty('data')) {
                return $http.post('/node-data/sonyVue', ssPackage)
            }
        }


    }


}]);


app.run(function (PackageFactory, $http, http, $rootScope, $window, refreshPackageService, $q, $localStorage) {

    var getPackageOnLoad = function () {
        return $http.get('/api/package/')
            .then(function (data) {


                data = data.data.results[0];
                PackageFactory.setPackage(data);

                refreshPackageService.broadcast()

                $window.sessionStorage.user = data.url

                return data

            }, function (err) {

                if ($window.sessionStorage.hasOwnProperty('token')) {
                    delete $window.sessionStorage['token']
                }

            })
    };

    var refreshTokenIfStale = function () {
        if ($window.sessionStorage.token) {
            return $http.post('/api-token-verify/', {token: $window.sessionStorage.token})
                .then(function (data) {
                    return data

                }, function (err) {
                    $http.post('/api-refresh-token/', {token: $window.sessionStorage.token})
                        .then(function (data) {
                            $window.sessionStorage.token = data.token;
                        })
                })
        } else {
            return $q.resolve()
        }
    }


    getPackageOnLoad()


});

app.factory('_', function ($window) {
    return $window._;
})

app.factory('Fuse', function ($window) {
    return $window.Fuse
})

app.factory('Fuzzy', function ($window) {
    return $window.fuzzy
})

app.factory('classie', function ($window) {
    return $window.classie
})

app.factory('ShowDetailAnimate', function ($timeout, $q, $window) {
    // ;

    var bodyEl = document.body,
        // gridEl = $('#theGrid')[0],
        // sidebarEl = document.getElementById('theSidebar'),
        // gridItemsContainer = gridEl.querySelector('div.row'),
    //contentItemsContainer = gridEl.querySelector('section.server'),
    //gridItems = gridItemsContainer.querySelectorAll('.grid__item'),
    //contentItems = contentItemsContainer.querySelectorAll('.content__item'),
    //closeCtrl = contentItemsContainer.querySelector('.close-button'),
        current = -1,
        lockScroll = false,
        xscroll = "",
        yscroll = "",
        isAnimating = false,
    //menuCtrl = document.getElementById('menu-toggle'),
    //menuCloseCtrl = sidebarEl.querySelector('.close-button'),
        docElem = window.document.documentElement,
        support = {transitions: Modernizr.csstransitions},
    // transition end event name
        transEndEventNames = {
            'WebkitTransition': 'webkitTransitionEnd',
            'MozTransition': 'transitionend',
            'OTransition': 'oTransitionEnd',
            'msTransition': 'MSTransitionEnd',
            'transition': 'transitionend'

        },
    //transEndEventName = transEndEventNames[Modernizr.prefixed('transition')];

        getViewport = function (axis) {
            var client, inner;
            if (axis === 'x') {
                client = docElem['clientWidth'];
                inner = window['innerWidth'];
            }
            else if (axis === 'y') {
                client = docElem['clientHeight'];
                inner = window['innerHeight'];
            }

            return client < inner ? inner : client;
        }
    scrollX = function () {
        return window.pageXOffset || docElem.scrollLeft;
    }
    scrollY = function () {
        return $('#search-and-shows').scrollTop()
    }


    onEndTransition = function (el, callback) {
        var onEndCallbackFn = function (ev) {
            if (support.transitions) {
                if (ev.target != this) return;
                this.removeEventListener(transEndEventName, onEndCallbackFn);
            }
            if (callback && typeof callback === 'function') {
                callback.call(this);
            }
        };
        if (support.transitions) {
            el.addEventListener(transEndEventName, onEndCallbackFn);
        }
        else {
            onEndCallbackFn();
        }
    }

    return {
        loadContent: function (positionItem, scaleItem, container) {
            // add expanding element/placeholder
            var dummy = document.createElement('div');
            dummy.className = 'placeholder';

            // set the width/heigth and position

            dummy.style.WebkitTransform = 'translate3d(' + (positionItem.offsetLeft + 14) + 'px, ' + (positionItem.offsetTop ) + 'px, 0px) scale3d(' + (scaleItem.offsetWidth / container.offsetWidth) + ',' + scaleItem.offsetHeight / getViewport('y') + ',1)';
            dummy.style.transform = 'translate3d(' + (positionItem.offsetLeft + 14) + 'px, ' + (positionItem.offsetTop ) + 'px, 0px) scale3d(' + (scaleItem.offsetWidth / container.offsetWidth) + ',' + scaleItem.offsetHeight / getViewport('y') + ',1)';

            // add transition class
            classie.add(dummy, 'placeholder--trans-in');

            // insert it after all the grid items
            container.appendChild(dummy);

            // body overlay
            classie.add(bodyEl, 'view-single');
            //
            return $timeout(function () {

                // expands the placeholder
                if ($window.innerWidth < 768) {
                    dummy.style.WebkitTransform = 'translate3d(0, ' + (scrollY()) + 'px, 0px)';
                    dummy.style.transform = 'translate3d(0, ' + (scrollY()) + 'px, 0px)';
                } else {

                dummy.style.WebkitTransform = 'translate3d(0, ' + (scrollY() + 50) + 'px, 0px)';
                dummy.style.transform = 'translate3d(0, ' + (scrollY() + 50) + 'px, 0px)';
                }
                // disallow scroll
                window.addEventListener('scroll', this.noscroll);
                onEndTransition(dummy, function () {
                    // add transition class
                    classie.remove(dummy, 'placeholder--trans-in');
                    classie.add(dummy, 'placeholder--trans-out');
                    // position the server container
                    //contentItemsContainer.style.top = scrollY() + 'px';
                    // show the main server container
                    //classie.add(contentItemsContainer, 'server--show');
                    // show server item:
                    //classie.add(contentItems[current], 'content__item--show');
                    // show close control
                    //classie.add(closeCtrl, 'close-button--show');
                    // sets overflow hidden to the body and allows the switch to the server scroll
                    classie.addClass(bodyEl, 'noscroll');

                    isAnimating = false;
                });
            }, 25);

        },

        hideContent: function (positionItem, scaleItem, container) {
            //var gridItem = gridItems[current], contentItem = contentItems[current];
            // ;

            //classie.remove(contentItem, 'content__item--show');
            //classie.remove(contentItemsContainer, 'server--show');
            //classie.remove(closeCtrl, 'close-button--show');
            classie.remove(bodyEl, 'view-single');

            return $timeout(function () {
                //  ;

                var dummy = container.querySelector('.placeholder');

                function firstStep() {
                    //  ;
                    classie.removeClass(bodyEl, 'noscroll');
                    return 'hello first'
                }

                $q.when(firstStep())
                    .then(function (data) {
                        dummy.style.WebkitTransform = 'translate3d(' + (positionItem.offsetLeft + 14) + 'px, ' + (positionItem.offsetTop ) + 'px, 0px) scale3d(' + (scaleItem.offsetWidth / container.offsetWidth) + ',' + scaleItem.offsetHeight / getViewport('y') + ',1)';
                        dummy.style.transform = 'translate3d(' + (positionItem.offsetLeft + 14) + 'px, ' + (positionItem.offsetTop ) + 'px, 0px) scale3d(' + (scaleItem.offsetWidth / container.offsetWidth) + ',' + scaleItem.offsetHeight / getViewport('y') + ',1)';
                        return "hello world"
                    }).then(function (data) {
                    return $timeout(function () {
                        onEndTransition(dummy, function () {
                            // reset server scroll..
                            positionItem.parentNode.scrollTop = 0;
                            dummy.remove()
                            //classie.remove(gridItem, 'grid__item--loading');
                            //classie.remove(gridItem, 'grid__item--animate');
                            lockScroll = false;
                            window.removeEventListener('scroll', this.noscroll);
                        })
                        current = -1;
                    }, 400)
                })

                // ;


                // reset current
            }, 25);
        },
        noscroll: function () {
            if (!lockScroll) {
                lockScroll = true;
                xscroll = scrollX();
                yscroll = scrollY();
            }
            window.scrollTo(xscroll, yscroll);
        }

    }
});

app.factory('Utils', function(){
    return {

        fixGuideboxData : function (c) {
        if (typeof c.guidebox_data == 'string') {
            var jsonString = c.guidebox_data.replace(/'/g, '"');
            jsonString = cleanString(jsonString)
            c.guidebox_data = JSON.parse(jsonString)
        }


        return c

    }

    }
})


app.controller('CheckoutController', function ($scope, $state, $http, $timeout, $filter, PackageFactory, refreshPackageService, $window, $q) {

    $('div').css('max-width', window.innerWidth)

    $q.when(PackageFactory.getPackage())
        .then(function (data) {
            $scope.package = data

            if (_.isEmpty(data.data.content) || data.data == undefined) {
                $state.go('dash.dashboard')
            }

        })


    $scope.$on('subcribe', function (service) {
        $scope.package.services.subscribed.push(service)
        service.added = true
    })

    $scope.$on('unsubscribe', function (service) {
        _.remove($scope.package.services.subscribed, service)
    })

    $scope.$on('hide', function (service) {
        $scope.package.services.hidden.push(service);
        service.hidden = true
    })


    function get_service_list() {
        $scope.package = PackageFactory.getPackage();
        if ('data' in $scope.package) {
            PackageFactory.getCheckoutPanelList()
                .then(function (data) {
                    $scope.list = data.data

                    var only_ppv = data.data['ppv']
                    var x = _.cloneDeep(data.data)
                    delete x['ppv']
                    var non_ppv = x

                    var values = _.chain(non_ppv)
                        .values()
                        .flatten()
                        .map(function (elem) {
                            return elem.chan.source
                        })
                        .value()


                    only_ppv = _.map(only_ppv, function (elem) {
                        return elem.chan.source
                    })

                    mixpanel.track('Service List', {
                        "id": 8,
                        "non ppv services": values,
                        "ppv services": only_ppv,
                        "count": values.length,
                        "ppv_count": only_ppv.length,
                        "user": $window.sessionStorage.user
                    })
                    return values
                })
                .then(function (values) {
                    $scope.package.data.services.subscribed = _.filter($scope.package.data.services.subscribed, function (elem) {
                        var res = elem.chan? _.includes(values, elem.chan.source): _.includes(values, elem.source)
                        return res

                    })
                })
                .then(function (data) {

                    PackageFactory.getSonyVueList($scope.package)
                        .then(function (data) {
                            //We set Sling and Playstation Services on the scope.
                            $scope.svs = data.data

                            if ($scope.list.hasOwnProperty('live')) {
                                $scope.list.live = _.concat(data.data, $scope.list.live)
                            } else {
                                $scope.list.live = data.data
                            }

                        })
                })
        }
    }

    refreshPackageService.listen(get_service_list);
    $scope.list = {}
    $scope.list.added = [];
    var payPerServices = ['google_play', 'itunes', 'youtube_purchase', 'vudu', 'amazon_buy'];
    $scope.addService = function (service) {
        _.includes($scope.package.data.services, service.display_name) || $scope.package.push(service)
    };

    $scope.$watchCollection(function () {
        try {
            return PackageFactory.getPackage().data.content
        }
        catch (e) {
            // console.log(e)
        }
    }, function () {
        get_service_list();
        $scope.list = PackageFactory.getListOfServices();
    })
});


/**
 * Created by Nem on 12/29/15.
 */

app.controller('FeedbackCtrl', function ($scope) {
   
    $scope.isMobile = window.innerWidth > 540;

    $scope.options = {
        ajaxURL: 'feedback/',
        html2canvasURL: 'static/html2Canvas/build/html2canvas.js',

    }
})
/**
 * Created by Nem on 10/7/15.
 */

app.directive('footer', function ($state) {

    return {
        restrict: 'E',
        templateUrl: 'static/partials/footer.html',
        link: function (scope, elemtnt, attrs) {

            function fixFooter() {

                if ($state.current.name == 'nav.home') {
                    $('div[ui-view="home"]').height(window.innerHeight)
                }
            }

            var target = document.querySelector("[ui-view]")

            var config = {attributes: true, childList: true, characterData: true};

            var observer = new MutationObserver(function (mutations) {


                fixFooter();
                mutations.forEach(function (mutation) {
                })

            })

            observer.observe(target, config)
            $(window).resize(fixFooter)


        }
    }


})

$(document).ready(function () {




    //  ;

})

/**
 * Created by Nem on 8/29/16.
 */


app.controller('MobileController', function ($scope) {

    $scope.goodbye = 'nurse'
    $scope.mobileCloseOverlay = function () {



        $scope.$broadcast('close_overlay')

    }
})

/**
 * Created by chirag on 8/3/15.
 */
app.controller('HomeController', function ($scope, $http, http, $cookies, $location, $window) {

    $('body').attr('id', 'background')
    $('div').css('max-width', window.innerWidth)

    $('#letsDoThis').click(function () {


        mixpanel.track('Navigation', {
            "event_id": 2,
            "event": "Call to Action",
            "user": $window.sessionStorage.user
        })

    })

});


app.directive('sectionOne', function () {
    return {
        restrict: 'E',
        templateUrl: '/static/partials/section-one.html'
    }
})

app.directive('sectionTwo', function () {
    return {
        restrict: 'E',
        templateUrl: '/static/partials/section-two.html'
    }
})

app.directive('sectionThree', function () {
    return {
        restrict: 'E',
        templateUrl: '/static/partials/section-three.html'
    }
})

app.directive('sectionFour', function () {
    return {
        restrict: 'E',
        templateUrl: '/static/partials/section-four.html'
    }

})

app.controller('carousel', function () {

})

angular.module('ui.bootstrap.carousel', ['ui.bootstrap.transition'])
    .controller('CarouselController', ['$scope', '$timeout', '$transition', '$q', function ($scope, $timeout, $transition, $q) {
    }]).directive('carousel', [function () {
    return {}
}]);

app.controller('ModalController', function ($scope, http, $uibModal, $log, $rootScope, $timeout, loginEventService) {

    //$scope.login = 'Click Here to Login'

    var modalOpen = false

    $scope.items = ['item1', 'item2', 'item3'];

    $rootScope.openLogInModal = _.debounce(function () {
        if (modalOpen) return;


        modalOpen = true;


        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: '/static/partials/modal.html',
            controller: 'ModalInstanceController',
            size: 'sm',
            resolve: {
                items: function () {
                    return $scope.items;
                }
            }
        });


        modalInstance.result.then(function (selectedItem) {


        }, function () {
            $log.info('Modal dismissed at: ' + new Date());

            modalOpen = false

            $rootScope.$broadcast('login.modal.closed')

        });
    }, 500);

    loginEventService.listen($rootScope.openLogInModal)
    //if ($rootScope.currentStep == 3) {
    //    $rootScope.openLogInModal()
    //}
});

app.controller('ModalInstanceController', function ($scope, $rootScope, $modalInstance, items, $location, $cookies, http, growl, $window, PackageFactory, sInfo) {

    $scope.socialLogin = true;

    var pkg = PackageFactory.getPackage()

    $scope.auth = {
        twitter: $('#twitter_login').attr('href') + '?pkg=' + pkg.url,
        facebook: $('#facebook_login').attr('href')+ '?pkg=' + pkg.url + '&anon_user=' + window.sessionStorage.anon_user,
    }

    $scope.credentials = {}


    $('body').on('click', '#facebook_social_auth', function () {

        mixpanel.track('Authentication', {
            "id": 4.1,
            "event": "facebook_social",
            "method": "email",
            "user": $window.sessionStorage.user

        })
            window.sessionStorage.pkg = pkg
    })


    $scope.login = function (credentials) {
        //credentials.next = "/api/";
        credentials.csrfmiddlewaretoken = $cookies.get('csrftoken');
        credentials.submit = "Log in";
        credentials.username = credentials.email;
        $window.sessionStorage.user = {"email": credentials.email}
        http.login(credentials)
            .then(function (data) {
                mixpanel.track('Authentication', {
                    "id": 4.2,
                    "event": "login",
                    "method": "email",
                    "user": $window.sessionStorage.user
                })

                $rootScope.logged_in = true;
                $modalInstance.close();
                growl.success('Login Successful', {
                    onclose: function () {

                        window.location.reload()

                    },
                    ttl: 1000,
                    disableCountDown: true
                })

            }, function (err) {

                if (err.data.hasOwnProperty('username')) {

                    growl.error('username is required')
                }

                if (err.data.hasOwnProperty('non_field_errors')) {
                    growl.error(err.data.non_field_errors[0])
                }

                $scope.credentials = {}
            })
        $scope.credentials = {}
    };

    $scope.register = function (credentials) {
        //credentials.next = "/api/";

        credentials.csrfmiddlewaretoken = $cookies.get('csrftoken');
        credentials.submit = "Register";
        credentials.username = credentials.email;
        credentials.package = PackageFactory.getPackage().url;


        if (credentials.password == credentials.confirm_password) {


            http.register(credentials)
                .then(function (data) {
                    $window.sessionStorage.user = {"email": credentials.email}

                    mixpanel.track('Authentication', {
                        "id": 4.3,
                        "event": "register",
                        "method": "email",
                        "user": $window.sessionStorage.user
                    })

                    $window.sessionStorage.reg_pkg_id = data.data.pkg

                    growl.success('Registration Successful')
                    $modalInstance.close()
                    sInfo.broadcast()
                    window.location.reload()
                }, function (err) {

                    if (err.status == 500) {
                        growl.error(err.data.detail)
                    } else if (err.hasOwnProperty('data')) {
                        growl.error(err.data.username[0])

                    } else if (err.data.hasOwnProperty('non_field_errors')) {
                        growl.error(err.data.non_field_errors[0])
                    }
                    $scope.credentials = {}
                })
        } else {
            growl.error("passwords don't match")
        }
    };


    $scope.items = items;

    $scope.selected = {
        item: $scope.items[0]
    }

    $scope.ok = function () {
        $modalInstance.close($scope.selected.item);
    }

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel')
    }

})

/**
 * Created by Nem on 6/28/15.
 */
app.controller('navigation', function ($scope, http, $http, $cookies, $window, $location, $state, $rootScope, $timeout, loginEventService, authEventService, PackageFactory, $localStorage) {

    $scope.$storage = $localStorage;

    function getNameOrEmail() {


        if ($scope.$storage.hasOwnProperty('userInfo')) {
            var s = $scope.$storage.userInfo;
            if (s.first_name && s.last_name) {
                return s.first_name + ' ' + s.last_name
            }

            if (s.first_name) {
                return s.first_name
            }

            return s.email
        }
    }

    PackageFactory.getEmail()
        .then(function (data) {
            data.data.results[0].email ? $rootScope.logged_in = true : $rootScope.logged_in = false

            $localStorage.userInfo = data.data.results[0]
            $scope.nameOrEmail = getNameOrEmail()
        }, function () {

            $rootScope.logged_in = false
        });


    $scope.menuOpen = false

    angular.element(document).keydown(function (e) {
        $scope.$apply(function () {

            var keyCode = e.which || e.keyCode;

            if (keyCode == 27 && $scope.menuOpen) { // escape key maps to keycode `27`
                $scope.showLeftPush()

            }
        })
    })

    // $(document).click(function (event) {
    //
    //
    //     var target = event.target
    //
    //     if ($scope.menuOpen && target ) {
    //         $scope.hideLeftPush()
    //     }
    // })

    $('#sidebarDashNav').click(function () {

        mixpanel.track('Navigation', {
            "event_id": 1,
            "event": "Sidebar navigation to dash",
            "user": $window.sessionStorage.user
        })
    })

    $scope.goBack = function () {
        mixpanel.track('Navigation', {
            "event_id": 12,
            "event": "Checkout back to dash",
            "user": $window.sessionStorage.user
        })

        window.history.back();
    }

    $scope.goToDash = function () {

        mixpanel.track('Navigation', {
            "event": "Sidebar Navigation to dash",
            "user": $window.sessionStorage.user
        })
        location.href = '#/dashboard'
    }


    loginEventService.listen(function () {
        $scope.logged_in = false;

    })
    authEventService.listen(function () {

        if ($window.sessionStorage.token) {
            $scope.logged_in = true;
        } else {
            logged_in = false;
        }

        delete $window.sessionStorage['anon_user']

    })


    $scope.logout = function () {
        mixpanel.track('Authentication', {
            "event": "logout",
            "method": "email",
            "user": $window.sessionStorage.user
        })
        delete $window.sessionStorage['token'];
        delete $scope.$storage['userInfo'];
        location.pathname = '/logout/';
        $scope.logged_in = false


    }

    $scope.login = function () {
        $rootScope.openLogInModal()
        var pkg_url = PackageFactory.getPackage()

        mixpanel.track("Login modal opened", {
            "from": "nav side bar",
            "current_page": $location.absUrl(),
            "package_id": pkg_url.url
        })
    }

    $scope.cp = $location.$$url == "/checkout";

    $scope.menuOpen ? $('#menu-mask').fadeIn() : $('#menu-mask').fadeOut();

    $scope.isHomePage = $state.current.data.isHomePage;

    $timeout(function () {
        $scope.isHomePage && $('div#mainPage').css({'min-height': '100vh'});
    }, 0)

    $scope.isActive = function (hash) {
        return document.location.hash == hash;


    }


    $scope.hmdc = $state.current.data.hmdcActive;


    var menuLeft = document.getElementById('cbp-spmenu-s1'),
        mainPage = document.getElementById('mainPage'),
        showLeftPush = document.getElementById('showLeftPush'),
        body = document.body;


    $scope.showLeftPush = function () {
        $scope.menuOpen = !$scope.menuOpen;
        $('#cbp-spmenu-s1').toggleClass('cbp-spmenu-open')
        $scope.menuOpen ? $('#menu-mask').fadeIn() : $('#menu-mask').fadeOut()
        $('#showLeftPush').toggleClass('cbp-spmenu-push-toright');
        // $('nav').focus()
        //classie.toggle(this, 'active')

        // ;
        //classie.toggle(body, 'cbp-spmenu-push-toright');
        //classie.toggle(menuLeft, 'cbp-spmenu-open');
        //classie.toggle(mainPage, 'cbp-spmenu-push-toright');
        // $('#mainPage').toggleClass('cbp-spmenu-push-toright');
        // $('#dashPage').toggleClass('cbp-spmenu-push-toright');


        //$('#showLeftPush').toggleClass('cbp-spmenu-push-toright');
        // $('#ss-panel-right').toggleClass('fixed-menu-transform');
        // $('#ss-navigation-view').toggleClass('cbp-spmenu-push-toright');

        //disableOther('showLeftPush');
    };
    $scope.hideLeftPush = function () {
        //classie.toggle(this, 'active')
        $scope.menuOpen = false;

        // ;
        //classie.toggle(body, 'cbp-spmenu-push-toright');
        //classie.toggle(menuLeft, 'cbp-spmenu-open');
        $('#cbp-spmenu-s1').removeClass('cbp-spmenu-open')
        //classie.toggle(mainPage, 'cbp-spmenu-push-toright');
        // $('#mainPage').toggleClass('cbp-spmenu-push-toright');
        // $('#dashPage').toggleClass('cbp-spmenu-push-toright');

        $('#menu-mask').fadeOut()


        $('#showLeftPush').removeClass('cbp-spmenu-push-toright');

        // $('nav').focus()


        //$('#showLeftPush').toggleClass('cbp-spmenu-push-toright');
        // $('#ss-panel-right').toggleClass('fixed-menu-transform');
        // $('#ss-navigation-view').toggleClass('cbp-spmenu-push-toright');

        //disableOther('showLeftPush');
    };


});

app.run(function ($rootScope, PackageFactory, $localStorage) {

    // console.log($rootScope.logged_in)

})

$(document).ready(function () {



    //function disableOther(button) {
    //    if (button !== 'showLeftPush') {
    //        classie.toggle(showLeftPush, 'disabled');
    //    }
    //
    //}
});

app.controller('ProgressController', function ($scope, $state, $rootScope, $location, PackageFactory, $interval) {

    var package = PackageFactory.getPackage();

    //$interval(function(){
    //     ;
    //    //package = PackageFactory.getPackage();
    //    //$scope.package  = package;
    //}, 500);

    $scope.package = package;

    var stateStep = $state.current.data.step;
    $scope.stateStep = stateStep;
    $rootScope.currentStep = stateStep;
    $scope.step = {
        one: {
            text: 'Step One',
            show: false,
            active: false
        },
        two: {
            text: 'Step Two',
            show: false,
            active: false
        },
        three: {
            text: 'Step Three',
            show: false,
            active: false
        },
        four: {
            text: 'Step Four',
            show: false,
            active: false
        }
    };

    $scope.isActive = function (step) {
        if (stateStep == step) {
            return true
        } else {
            return false
        }


        return 'inactive'
    }

    $scope.navigate = function (stateStep) {

        if ($scope.stateStep > stateStep)
            $location.path('/getting-started/step/' + stateStep)

    }

    if (stateStep == 1) {
        $scope.step.one.show = true

    } else if (stateStep == 2) {
        $scope.step.two.show = true


    } else if (stateStep == 3) {
        $scope.step.three.show = true

    } else if (stateStep == 4) {
        $scope.step.four.show = true

    }

    $scope.progressBar = function (step) {
        package = PackageFactory.getPackage();
        var barValue = 0;

        // ;

        if (!_.isEmpty(package) && 2 == $scope.stateStep && 2 == step) {

            barValue = package.hardware.length/3 *100 || 0;
        }

         ;

        if(!_.isEmpty(package) && 1 == $scope.stateStep && 1 ==step) {

            barValue = package.content.length/5 * 100 || 0;
        }


        return $scope.stateStep > step ? 100 : barValue;
    }
});


/**
 * Created by Nem on 7/18/15.
 */
app.controller('search', function ($scope, $rootScope, $http, $window, http, PackageFactory, _, Fuse, SLING_CHANNELS, N, growl, Utils, $state) {

    $scope.hex = true;

    $rootScope.typeaheadOpen = false;

    // $scope.noResults = true


    $scope.modelOptions = {
        debounce: {
            default: 500,
            blur: 250
        },
        getterSetter: true
    };

    $scope.suggestions = [];
    $scope.selectedIndex = -1;

    $('#searchInput').bind('input', function () {
        $(this).val().length > 0 ? $('.floating-label').addClass('float') : $('.floating-label').removeClass('float')
    })


    $scope.checkMatched = function () {
        return $scope.searchResult[$scope.searchText - 1] === _.last($scope.searchText)
    }

    var search_query = ""

    $scope.search = function (val) {

        if (val) {

            search_query = val
            return $http.get('/api/search?q=' + val)
                .then(function (data) {
                    // ;
                    var sorted = _.chain(data.data)
                        .filter(function (elem) {
                            return elem.title !== null || elem.name != null
                        })
                        .sortBy(function (elem) {

                            return 0
                        })
                        .value()

                    $scope.selectedIndex = -1

                    $scope.suggestions = sorted;
                    $('.custom-popup-wrapper').css('display', 'block')
                    return sorted
                });
        } else {
            $scope.suggestions = [];
            $scope.typeaheadOpen = false;
            return "hello world"
        }
    };


    var cleanString = function (s) {
        s = s.replace(/\\n/g, "\\n")
            .replace(/\\'/g, "\\'")
            .replace(/\\"/g, '\\"')
            .replace(/\\&/g, "\\&")
            .replace(/\\r/g, "\\r")
            .replace(/\\t/g, "\\t")
            .replace(/\\b/g, "\\b")
            .replace(/\\f/g, "\\f")
            .replace(RegExp(/None/g), '"false"');

        // remove non-printable and other non-valid JSON chars
        s = s.replace(/[\u0000-\u0019]+/g, "");


        return s

    }

    // var fixGuideboxData = function (c) {
    //     if (typeof c.guidebox_data == 'string') {
    //         var jsonString = c.guidebox_data.replace(/'/g, '"');
    //         jsonString = cleanString(jsonString)
    //         c.guidebox_data = JSON.parse(jsonString)
    //     }
    //
    //
    //     return c
    //
    // }

    $rootScope.addToSelectedShows = function (suggestion, model, label, event) {

        var ssPackage = PackageFactory.getPackage();

        if ('hidden' in ssPackage.data.services) {
            ssPackage.data.services.hidden = [];
        }

        if (suggestion !== undefined) {
            if (_.some(ssPackage.data.content, ['url', suggestion.url])) {
                growl.warning('You already added ' + suggestion.title + ' to your package!');
                $scope.suggestions = [];
                return
            }

            var parser = document.createElement('a');
            parser.href = suggestion.url


            if (suggestion.category) {
                suggestion.justAdded = true;
                ssPackage.data.content.push(suggestion);

            } else {


                url = /api/.test(parser.pathname) ? parser.pathname : '/api' + parser.pathname
                $http.get(url)
                    .then(function (data) {

                        suggestion = Utils.fixGuideboxData(data.data)

                        if (suggestion.guidebox_data.id !== undefined && typeof suggestion.guidebox_data.id === 'number') {
                            $scope.loading = true;

                            suggestion.justAdded = true;

                            if (_.includes(ssPackage.data, function (elem) {
                                    return elem.url == suggestion.url

                                })) {
                                growl.warning('You already added ' + suggestion.title + ' to your package!');
                                return
                            }
                            ssPackage.data.content.push(suggestion);


                            PackageFactory.setPackage(ssPackage);

                            $scope.loading = false;
                            mixpanel.track("Show added", {
                                "id": 5,
                                "show_title": suggestion.title,
                                "search_query": search_query,
                                "user": $window.sessionStorage.user
                            });
                        }

                        $scope.popularShows = _.filter($scope.popularShows, function (item) {
                            return item.title != suggestion.title
                        })

                    })
            }
        }
        $('.custom-popup-wrapper').css('display', 'none')
        $scope.searchText = '';
        $scope.suggestions = [];
        $state.go('dash.dashboard')


    };

    $scope.checkKeyDown = function (event) {

        if (event.keyCode === 40) {
            event.preventDefault();
            if ($scope.selectedIndex + 1 !== $scope.suggestions.length) {
                $scope.selectedIndex++;
            }
        } else if (event.keyCode === 38) {
            event.preventDefault();
            if ($scope.selectedIndex - 1 !== -1) {
                $scope.selectedIndex--
            }
        } else if (event.keyCode === 13) {
            if ($scope.selectedIndex > -1) {

                $scope.addToSelectedShows($scope.suggestions[$scope.selectedIndex]);
            }
        } else if (event.keyCode === 8) {
            $scope.searchResult = '';
        }


    };


    $scope.$watch('selectedIndex', function (val) {
        if (val !== -1) {
            $scope.searchText = $scope.suggestions[$scope.selectedIndex].title
        }
    });

    var logEmptySearchResults = _.debounce(function (o, n) {
        if ($scope.noResults && $scope.searchText && o != n) {
            mixpanel.track("Empty Search Results", {
                "id": 15,
                "search_query": $scope.searchText,
                "user": $window.sessionStorage.user
            });
        }
    }, 1000);


    $scope.$watch('noResults', function (o, n) {
        logEmptySearchResults(o, n);
    })


});

app.directive('search', function () {
    return {
        restrict: 'E',
        templateUrl: '/static/partials/search.html',
        controller: 'search'
    }
})

/**
 * Created by Nem on 7/25/16.
 */


app.directive('categoryDetail', function ($http, _) {
    return {
        restrict: 'E',
        controller: 'ShowGridController',
        templateUrl: '/static/partials/categories/categories.html',
        link: function (scope, event, attrs) {
            scope.get_desc = function (category) {

                return $http.get('module_descriptions/' + category)
                    .then(function (data) {
                        var group = _.groupBy(data.data, function (elem) {
                            if (elem.img == 'ota') {
                                return 'ota'
                            }

                            if (elem.img == 'fubotv') {
                                return 'soccer'
                            }
                            return 'core'
                        })
                        scope.cat = group;
                        return data
                    })
            }
            scope.get_desc('Sports')
            scope.$on('category_clicked', function (event, item) {
                scope.get_desc(item.title)
                    .then(function (data) {
                    })
            })
        }
    }
})

app.directive('moduleRow', function ($http, PackageFactory, _, $window) {
    return {
        restrict: 'E',
        templateUrl: '/static/partials/categories/row-template.html',
        // controller: 'ModuleControler',

        link: function (scope, event, attrs) {

            scope.openAffiliateLink = function (row) {


                mixpanel.track('Checkout action buttons', {
                    "id": 19,
                    "service": row.service,
                    "user": $window.sessionStorage.user,
                    "event": "Subscribe"

                })

                if (row.affiliate_link) {

                    $window.open(row.affiliate_link);
                    mixpanel.track("Sports service clicked", {"service name": row.service});
                } else {
                    mixpanel.track('Service with No Link Clicked', {
                        "id": 20,
                        "user": $window.sessionStorage.user,

                    })
                }


            }
            if (scope.key == 'ota') {
                scope.rowTitle = 'Big Game'
                scope.desc = '(must have)'

            } else if (scope.key == 'soccer') {

                scope.rowTitle = 'Soccer'
            } else {
                scope.rowTitle = 'Core Package'
                scope.desc = '(select one)'
            }

            scope.addCollection = function (row) {
                var pkg = PackageFactory.getPackage();

                if (_.some(pkg.data[row.category], ['img', row.img])) {
                    return
                }
                if (pkg.data[row.category] == undefined) {
                    pkg.data[row.category] = []
                }


                pkg.data[row.category] = _.filter(pkg.data[row.category], function (elem) {
                    return elem.level != 'Core Sports Package' || row.level != "Core Sports Package"
                })


                pkg.data[row.category].push(row);
                pkg.data[row.category] = _.uniqBy(pkg.data[row.category], 'img');

                row.added = true;

                PackageFactory.setPackage(pkg);
            }

            scope.inPkg = function (row) {
                var pkg = PackageFactory.getPackage()

                return _.some(pkg.data[row.category], ['img', row.img])
            }
        }
    }
})

app.directive('comingSoon', function (_) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            scope.isClickable = true
            var notReady = ['News', 'Live']
            if (_.includes(notReady, scope.show.title)) {
                scope.isClickable = false;
                element.addClass('coming-soon')
                // this.$parent.$parent.hideDetail()
            }
        }
    }
})



/**
 * Created by Nem on 5/24/16.
 */
app.controller('HardwareController', function ($scope, PackageFactory, $state, $window, loginEventService, $rootScope) {

    $scope.devices = [
        {
            name: 'Roku',
            image: 'https://s3.amazonaws.com/streamsavvy/Roku4.png',
            url: 'http://www.dpbolvw.net/click-7926773-12551146-1459950711000',
            price: 49.99
        },
        {
            name: 'Mohu Leaf',
            image: 'https://s3.amazonaws.com/streamsavvy/Mohu.png',
            url: 'https://www.amazon.com/Mohu-Paper-thin-Reversible-Performance-MH-110583/dp/B004QK7HI8',
            price: 39.00
        }
    ]

    $scope.state = $state.current.name;

    $scope.linkToAffiliate = function (device) {
        $window.open(device.url);
        mixpanel.track("Buy Device", {
            "id": 11,
            "service name": device.chan.display_name,
            "user": $window.sessionStorage.user
        });
    }

    $scope.pkg = PackageFactory.getPackage();

    $scope.proceedToCheckout = function () {
        location.href = '#/checkout';

        $scope.pkg = PackageFactory.getPackage();
        var showList = _.map($scope.pkg.data.content, function (showObject) {
            return showObject.title;
        });

        mixpanel.track("Proceeded to Checkout", {
            "id": 7,
            "show_List": showList,
            "user": $window.sessionStorage.user
        });
    };

    if($window.sessionStorage.redirectToCheckout=='true'){
        $state.go('check.out')
        $window.sessionStorage.redirectToCheckout = false
    }

    $scope.go = function () {

        if (!$rootScope.logged_in) {
            $window.sessionStorage.redirectToCheckout = true
            loginEventService.broadcast()
        } else {
            $scope.proceedToCheckout();
        }

        $rootScope.$on('login.modal.closed', function () {
            if (!$window.sessionStorage.token) {
                mixpanel.track("To Checkout w/o login", {
                    "id": 17,
                    // "show_List": showList,
                    "user": $window.sessionStorage.user
                })

                $scope.proceedToCheckout()
            }
        })


    }

    $scope.collapseHardware = true;
    var serviceHeight = $(window).height() - 46;

    if ($scope.collapseHardware) {
        $('.service-panel.ng-scope').css({'height': serviceHeight + 'px'});

    }

    $scope.mixpanelTrackReadyToCutCord = function () {
        var showList = [];
        _.forEach($scope.pkg.data.content, function (showObject) {
            showList.push(showObject.title);
        });
        // console.log(showList);

    }

    $scope.servicesGT0 = function () {
        return !_.isEmpty(PackageFactory.getListOfServices())
    }

    $scope.$watchCollection(function () {


            if (PackageFactory.getPackage().data) {
                return PackageFactory.getPackage().data.content
            }
        },
        function () {
            if (PackageFactory.getPackage().data) {

                $scope.pkgHasContent = PackageFactory.getPackage().data.content.length > 0
            }
        })

});

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
            var timer;
            scope.openTooltip = function () {
                if (scope.service.isOpen) {
                    scope.service.isOpen = !scope.service.isOpen;
                    return
                }

                this.closeAllTooltips();
                scope.service.isOpen = !scope.service.isOpen;
            }

            scope.linkToAffiliate = function () {


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

            if ($window.innerWidth < 786) {
                scope.ttPlacement = 'top'
            } else {
                scope.ttPlacement = 'left'
            }

        }
    }
})


app.controller('ViewWindowController', function ($scope) {

})


app.directive('sportsOverlay', function ($http) {
    return {
        restrict: 'E',
        scope: {
            cs: '='
        },
        templateUrl: '/static/partials/selected-show/sports-overlay.html',
        controller: 'ShowGridController',
        link: function (scope, elem, attr) {

            scope.$watchCollection('cs', function () {
                $http.get('/schedule/' + scope.cs.id)
                    .then(function (data) {
                        scope.schedule = data.data
                    })

            })

            scope.foxNbcSling = function (game, item) {
                if (_.includes(game.result_time.network, 'FOX')) {
                    return /sling/i.test(item.source)
                }
            }

            scope.$on('close_tooltips', function () {
                scope.$broadcast('children_close_tooltips')
            })


        }
    }
})


app.directive('sportStreamingSuggestion', function (_, $http, PackageFactory, $window, $timeout) {
    return {
        restrict: 'E',
        templateUrl: '/static/partials/selected-show/sportsWindows.html',
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


            $http.get('/service_description/' + scope.service.source)
                .then(function (data) {
                    scope.service.details = data.data
                    // console.log(data)

                })

            scope.closeAllTooltips = function () {

                    scope.$emit('close_tooltips')
                // _.forEach(scope.detail.sortedServices, function (key) {
                //     _.forEach(scope.detail[key], function (elem) {
                //         elem.isOpen = false
                //
                //     })
                // })
            };
            var timer;
            scope.openTooltip = function () {
                if (scope.service.isOpen) {
                    scope.service.isOpen = !scope.service.isOpen;
                    return
                }

                this.closeAllTooltips();
                scope.service.isOpen = !scope.service.isOpen;
            }

            scope.$on('children_close_tooltips', function(){
                scope.service.isOpen = false
            })

            scope.linkToAffiliate = function () {


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

            if ($window.innerWidth < 786) {
                scope.ttPlacement = 'top'
            } else {
                scope.ttPlacement = 'left'
            }

        }
    }
})

app.controller('ServicePanelController', function ($scope, $http, $timeout, PackageFactory) {

    $scope.hello = 'world';

    var ssPackage = PackageFactory.getPackage();
    $scope.pkg = PackageFactory.getPackage();
    var payPerServices = ['vudu', 'amazon_buy', 'google_play', 'itunes', 'youtube_purchase'];


    function check_if_on_sling(obj) {

        if (obj.chan.on_sling) {
            return true
        } else if (obj.chan.is_on_sling) {
            return true
        } else {
            return false
        }

    }

    // $scope.payPerShows = [];
    var updateServices = function () {

        if (ssPackage.hasOwnProperty('data')) {





            $scope.listOfServices = undefined;
            PackageFactory.getServicePanelList(ssPackage)
                .then(function (data) {
                    $scope.listOfServices = data.data
                    return data
                })
                .then(function (data) {
                    $scope.listOfServices = _.forEach($scope.listOfServices, function (val, key) {
                        $scope.listOfServices[key].open = true
                    })

                    return data

                })
                .then(function (data) {

                    PackageFactory.setListOfServices($scope.listOfServices);
                });

            PackageFactory.getSonyVueList(ssPackage)
                .then(function(data){
                    //We set Sling and Playstation Services on the scope.
                    $scope.svs = data.data
                })

            PackageFactory.setListOfServices($scope.listOfServices);
        }
    }

    updateServices()
    $scope.$watchCollection(function () {
        var _data = PackageFactory.getPackage().data;
        if (_data != undefined) {
            return _data.content
        }

        else {
            return []
        }

    }, function () {
        ssPackage = PackageFactory.getPackage();
        $scope.pkg = PackageFactory.getPackage();

        updateServices()
    })

     $scope.$watchCollection('package.data.sports', function () {
       ssPackage = PackageFactory.getPackage();
        $scope.pkg = PackageFactory.getPackage();

        updateServices()
    })


});


function interceptor(obj) {
    return obj
}

function checkForHuluWithShowtime(services) {
    return _.some(services, function (elem) {
        try {

            return elem.source == "hulu_with_showtime";
        }

        catch (e) {

            return false
        }
    });
}

function removeHuluIfShowtimeContent(services) {
    return _.filter(services, function (elem) {
        if (elem.source == "hulu_with_showtime") {
            return false
        }

        if (elem.source == "showtime_free") {
            return false
        }

        if (elem.source == "hulu_free") {
            return false
        }

        if (elem.source == "hulu_plus") {
            return false
        }

        if (elem.display_name == "Showtime Anytime") {
            return false
        }

        return true
    });
}

app.controller('ShowGridController', function ($scope, $rootScope, $q, $http, $timeout, PackageFactory, $compile, ShowDetailAnimate, $window, $log, $sessionStorage, sInfo, Utils, unchosenFilter, growl) {

    $('body').addClass('gradient-background')


    var masterPopShows = []

    $scope.addPopularShow = function (suggestion) {

        var ssPackage = PackageFactory.getPackage();

        if ('hidden' in ssPackage.data.services) {
            ssPackage.data.services.hidden = [];
        }

        if (suggestion !== undefined) {
            if (_.some(ssPackage.data.content, ['url', suggestion.url])) {
                growl.warning('You already added ' + suggestion.title + ' to your package!');
                $scope.suggestions = [];
                return
            }

            var parser = document.createElement('a');
            parser.href = suggestion.url

            url = /api/.test(parser.pathname) ? parser.pathname : '/api' + parser.pathname
            $http.get(url)
                .then(function (data) {

                    suggestion = Utils.fixGuideboxData(data.data)

                    if (suggestion.guidebox_data.id !== undefined && typeof suggestion.guidebox_data.id === 'number') {
                        $scope.loading = true;

                        suggestion.justAdded = true;

                        if (_.includes(ssPackage.data, function (elem) {
                                return elem.url == suggestion.url

                            })) {
                            growl.warning('You already added ' + suggestion.title + ' to your package!');
                            return
                        }
                        ssPackage.data.content.push(suggestion);

                        PackageFactory.setPackage(ssPackage);

                        $scope.loading = false;
                        mixpanel.track("Show added", {
                            "id": 5,
                            "show_title": suggestion.title,
                            "user": $window.sessionStorage.user
                        });
                    }
                    return data
                })
                .then(function (data) {
                    $scope.popularShows = unchosenFilter(masterPopShows, $scope)


                    getNextPopularShows()
                })
        }
    };


    var openingDetail = false

    $scope.removeShow = function (show, $event) {
        var pkg = PackageFactory.getPackage()

        $q.when($($event.currentTarget).parent().fadeOut)
            .then(function (data) {

                if (show.category) {
                    // TODO fix this ugly hack
                    pkg.data.sports = _.filter(pkg.data.sports, function (elem) {
                        return elem != show;
                    })
                }

                pkg.data.content = _.filter(pkg.data.content, function (elem) {
                    return elem != show;
                })

                PackageFactory.setPackage(pkg)

                $scope.package = pkg
                return data
            })
            .then(function () {
                $scope.popularShows = unchosenFilter(masterPopShows, $scope)
            })


    }


    $scope.$watch(function () {
        return PackageFactory.getChosenShow();
    }, function () {


        var cs = PackageFactory.getChosenShow();

        //
        if (!_.isEmpty(cs)) {

            $http.post('/node-data/detailsources', cs)
                .then(function (data) {
                    $scope.detailSources = data.data
                })
        }
    })


    //$rootScope.showDetailDirective = false;


    $scope.hello = 'clear package';

    $scope.clearContent = function () {
        var pkg = PackageFactory.getPackage();

        pkg.data.content = [];

        PackageFactory.setPackage(pkg)
    };

    $rootScope.showSearchView = true;


    $('body').removeAttr('id');
    // $('body').addClass('gradient-background');

    var next = ""
    $http.get('api/popular-shows')
        .success(function (data) {
            masterPopShows = data.results;
            next = data.next
            $scope.popularShows = unchosenFilter(masterPopShows, $scope)
            return data
        })
        .then(function () {
            // ;
            //$('.popular-shows').slick();
        });

    var getNextPopularShows = function () {
        if ($scope.popularShows.length < 20) {
            $http.get(next)
                .then(function (data) {
                    masterPopShows = _.concat(masterPopShows, data.data.results)
                    $scope.popularShows = unchosenFilter(masterPopShows, $scope)
                    next = data.data.next
                })
        }
    }


    $scope.delete = function (content) {
        _.remove($scope.package.content, content);
        $scope.savePackage()
        PackageFactory.updatePackageChannels($scope)
    }

    var openingDetail;

    $scope.showDetail = _.debounce(function (item, ev, attrs) {


        $('body').css({'overflow': 'hidden'})

        if ($window.innerWidth < 768) {
            $('body').addClass('black-mobile-bg')
            $('#search-and-shows').fadeOut()
        }

        $('#search-and-shows').addClass('no-scroll');


        if (openingDetail || !_.isEmpty($('.placeholder'))) {
            return
        }

        openingDetail = true;


        window.scrollTo(0, 0);
        // $('body').css('overflow', 'hidden');

        if (!item.is_category) {
            PackageFactory.setChosenShow(item);
        } else {
            $scope.$broadcast('category_clicked', item)
        }

        if (item == $scope.cs) {
            $http.post('/node-data/detailsources', $scope.cs)
                .then(function (data) {
                    $scope.detailSources = data.data
                })
        }


        // verifySelectedShowDetails()
        var positionItem = ev.currentTarget,
            scaleItem = ev.target,
            container = document.getElementById('search-and-shows');
        $(scaleItem).attr('id', 'scaled-from')
        $(positionItem).attr('id', 'is-opened')
        $rootScope.showSearchView = false;
        $rootScope.$broadcast('save_package');
        $('#mobile-nav-buttons').fadeOut();

        $scope.showCloseButton = true

        $('.mobile-tab-close').fadeIn();

        ShowDetailAnimate.loadContent(positionItem, scaleItem, container)
            .then(function (v) {
                return $timeout(function () {

                    // var detail = angular.element(document.createElement('show-detail'));

                    // $rootScope.showDetailDirective = true;

                }, 500)

            })
            .then(function (v) {
                if (item.is_category) {
                    $('category-detail').addClass('fade-in')
                    scrolledDistance = $('#search-and-shows').scrollTop()
                    $('category-detail').css({top: 55 + scrolledDistance})
                } else {


                    $('show-detail').addClass('fade-in');
                    var showDetailTop = $('show-detail').offset().top,
                        scrolledDistance = $('#search-and-shows').scrollTop()
                    $('show-detail').css({top: 55 + scrolledDistance})

                }
            })

        $('.show-grid').addClass('blur-and-fill');

        openingDetail = false


    }, 50);

    $(document).keyup(function (event) {
        var keyCode = event.which || event.keyCode;
        if (keyCode == 27) {
            $scope.hideDetail()
        }

    })

    $scope.hideDetail = function (ev, loc) {


        $('.mobile-tab-close').fadeOut();
        $scope.showCloseButton = false;
        $('#mobile-nav-buttons').fadeIn();

        mixpanel.track('Close overlay', {
            "id": 6,
            "user": $window.sessionStorage.user,
            "event": loc

        })
        var positionItem = document.getElementById('is-opened'),
            scaleItem = document.getElementById('scaled-from'),
            container = document.getElementById('search-and-shows');
        $q.when(function () {
            $('category-detail').removeClass('fade-in')

            $('show-detail').removeClass('fade-in')


        }())
            .then(function () {


                $rootScope.showDetailDirective = false
            })
            .then(ShowDetailAnimate.hideContent.bind(null, positionItem, scaleItem, container))
            .then(function (v) {
                return $timeout(function () {
                    //  ;

                    $rootScope.showSearchView = true;
                    $('.show-grid').removeClass('blur-and-fill');
                }, 500)
            })
            .then(function (v) {
                // ;
                // $('body').css('overflow', 'scroll');
                $(scaleItem).removeAttr('id');
                $(positionItem).removeAttr('id');

                $('#search-and-shows').removeClass('no-scroll');


                if ($window.innerWidth < 768) {
                    $('body').css({'overflow': 'scroll'});
                    $('body').removeClass('black-mobile-bg');
                    $('#search-and-shows').fadeIn();


                }

            })


    };

    $scope.$on('close_overlay', $scope.hideDetail);

    $('div').css('max-width', window.innerWidth)

    var bgh =$('#bg-img').height()
    var bgw =$('#bg-img').width()

    $('#bg-img + img').height(bgh)
    $('#bg-img + img').width(bgw)


    $scope.$watch(function () {
        return PackageFactory.getPackage()
    }, function () {
        $scope.package = PackageFactory.getPackage();


    });

    $scope.$watch(function () {
        return PackageFactory.getChosenShow()
    }, function () {
        $scope.cs = PackageFactory.getChosenShow();


    })


    $scope.savePackage = function () {
        PackageFactory.setPackage($scope.package)
    }

    $scope.$on('save_package', function () {
        PackageFactory.setPackage($scope.package)
    });

    $scope.$watchCollection('package.data.content', function () {
        PackageFactory.setPackage($scope.package)
    })
    $scope.$watchCollection('package.data.sports', function () {
        PackageFactory.setPackage($scope.package)
    })


    var email_device = _.debounce(function () {

        var client = new ClientJS();
        var data = {

            email: $sessionStorage.user || 'anon',
            fingerprint: client.getFingerprint(),
            browser: client.getBrowser(),
            browserVersion: client.getBrowserVersion(),
            device: client.getDevice(),
            deviceType: client.getDeviceType(),
            deviceVendor: client.getDeviceVendor(),
            time: moment.now(),
            timeZone: client.getTimeZone(),
            platform: clientInformation.platform,
            appVersion: clientInformation.appVersion,
            package: PackageFactory.getPackage()

        }

        $http.post('/edr/', data)
            .then(function (data) {

            }, function (err) {
                // $log(err)
            })
    }, 500)

    // $scope.$watch($sessionStorage.user, function () {
    //     debugger;
    //     email_device()
    // })

    sInfo.listen(email_device)


});



/**
 * Created by Nem on 7/25/16.
 */
app.controller('ModuleController', function ($scope, $http) {
    $scope.snt = [
        {
            title: "Sports",
            is_category: true,
            img_url: "https://s3.amazonaws.com/streamsavvy/sports.png"
        }, {
            title: "News",
            is_category: true,
            img_url: "https://s3.amazonaws.com/streamsavvy/news.png"
        }, {
            title: "Live",
            is_category: true,
            img_url: "https://s3.amazonaws.com/streamsavvy/livetv.png"
        }
    ]
})
