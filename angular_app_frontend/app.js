/**
 * Created by Nem on 6/12/15.
 */

function fixMetaTags() {

    // debugger;

    var x = $('body meta')
    y = $('body title')
    console.log(x)
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


                $timeout(function(){

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
                $timeout(function(){

                fixMetaTags()
                })
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
            templateUrl: 'static/partials/mobile.html'

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

