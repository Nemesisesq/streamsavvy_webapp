/**
 * Created by Nem on 6/12/15.
 */
var app = angular.module('myApp', [
        "ui.router",
        "ngCookies",
        "ui.bootstrap",
        "ngAnimate",
        'slick',
        'angular-growl',
        'environment',
    ])
    .config(function(envServiceProvider){
        envServiceProvider.config({
            domains: {
                development: ['localhost', '127.0.01'],
                production: ['streamsavvy.com/#/'],
                staging: ['herokuapp.com/#/']
            },

            vars: {
                development: {
                    serviceListUrl : '//localhost:5000/service_list',
                    checkoutListUrl : '//localhost:5000/checkout_list',
                    nodeDetailUrl : '//localhost:5000/viewing_windows'

                },

                staging : {
                    serviceListUrl : '//ss-node-data-staging.herokuapp.com/service_list',
                    checkoutListUrl : '//ss-node-data-staging.herokuapp.com/checkout_list',
                    nodeDetailUrl : '//ss-node-data-staging.herokuapp.com/viewing_windows'

                },
                production: {
                    serviceListUrl : '//enigmatic-garden-37567.herokuapp.com/service_list',
                    checkoutListUrl : '/enigmatic-garden-37567.herokuapp.com/checkout_list',
                    nodeDetailUrl : '//enigmatic-garden-37567.herokuapp.com/viewing_windows'

                }
            }
        });
        envServiceProvider.check();
    })
        .constant('CONFIG', {
            'URL': location.origin
        })
        .constant('VIEW_WINDOWS', [
            {type: 'live', headerText: 'Live Over the Air.', toolTip: 'get your content as soon as it dropped.'},
            {type: 'onDemand', headerText: 'On Demand Subscription.', toolTip: 'day/+ after live airing.'},
            {type: 'fullseason', headerText: 'Binge Watch Full Seasons', toolTip: 'season behind.'},
            {
                type: 'alacarte',
                headerText: 'Watch Current Season or Episodes for a fee',
                toolTip: 'day/+ after live airing with no committment'
            }
        ])
        .constant('BANNED_CHANNELS', ['HBO Go',
            'Guidebox',
            'MSNBC',
            'HBO',
            'Dish',
            'DirecTV',
            'AT&T U-verse',
            'FX',
            'Xfinity',
            // 'Showtime Anytime',
            'STARZ Play'])

        .constant('SERVICE_PRICE_LIST', [
            {
                name: 'Pay Per View',
                price: 0.00,
                description: 'If a subscription service is not for you, these apps allow you to purchase a show at a time.' +
                ' Or you can purchase an entire season once it has finished airing.',
                subscriptionLink: 'https://play.google.com/store/movies/category/TV?hl=en',
                gPlayLink: '',
                iOSAppStoreLink: ''
            },
            {
                name: 'netflix', price: 9.99, description: 'Best described as a "binge watch" service. ' +
            'Typically, full seasons are launched all at once and a season behind what is currently showing on TV. Netflix also offers original programming now.' +
            ' This is also released a full season at a time.',
                subscriptionLink: 'https://www.netflix.com/',
                gPlayLink: 'https://play.google.com/store/apps/details?id=com.netflix.mediaclient&hl=en',
                iOSAppStoreLink: 'https://itunes.apple.com/us/app/netflix/id363590051?mt=8&utm_source=Lifehacker+Newsletter&utm_campaign=84a4c2a72c-UA-142218-1&utm_medium=email'
            },
            {
                name: 'hulu_plus',
                price: 7.99,
                description: 'An on-demand service (think DVR) that offers shows from certain networks (ABC, limited NBC, FOX, CW, etc)' +
                ' a day after they air. Subscription prices depend on whether or not you purchase an ad-free package or not.',
                subscriptionLink: 'http://www.hulu.com/start',
                gPlayLink: 'https://play.google.com/store/apps/details?id=com.hulu.livingroomplus',
                iOSAppStoreLink: 'https://itunes.apple.com/us/app/hulu/id376510438?mt=8'
            },
            {
                name: 'amazon_prime',
                price: 8.25,
                description: 'An on-demand and binge combo. Some programming is offered in full-season format and some is on-demand after it airs live.' +
                ' Some shows are free while others are not. Amazon is also building a strong offering of original shows. ' +
                'It comes free with an annual Prime membership.',
                subscriptionLink: 'http://www.amazon.com/gp/video/getstarted',
                gPlayLink: 'https://play.google.com/store/apps/details?id=com.amazon.mShop.android.shopping',
                iOSAppStoreLink: 'https://itunes.apple.com/us/app/amazon-video/id545519333?mt=8&ign-mpt=uo%3D2'
            },
            {
                name: 'hbo_now',
                price: 14.99,
                description: 'Watch HBO shows the moment they air, on-demand, or binge. They also offer all back seasons of episodes.',
                subscriptionLink: 'https://order.hbonow.com/',
                gPlayLink: 'https://play.google.com/store/apps/details?id=com.hbo.hbonow&hl=en',
                iOSAppStoreLink: 'https://itunes.apple.com/us/app/hbo-now/id971265422?mt=8&ign-mpt=uo%3D2'
            },
            {
                name: 'sling-tv', price: 20.00,
                description: 'Live streaming service that makes shows available as they simultaneously air on cable.' +
                ' The main Sling package gives you a "skinny bundle" of some of the most popular cable channels (ESPN, CNN, HGTV, etc.) ' +
                'with the option to add extra mini packages on top of your main Sling package.',
                subscriptionLink: 'https://www.sling.com/',
                gPlayLink: 'https://play.google.com/store/apps/details?id=com.sling',
                iOSAppStoreLink: 'https://itunes.apple.com/us/app/sling-tv-live-and-on-demand/id945077360?mt=8'
            },
            {
                name: 'Over The Air',
                price: 0.00,
                description: 'Watching over the air (OTA) is like watching live television.' +
                ' There is no monthly cost, but a digital antenna is needed to pull in the signal.',
                subscriptionLink: 'http://amzn.com/B00X4RA74A',
                gPlayLink: '',
                iOSAppStoreLink: ''
            },
            {
                name: 'showtime',
                price: 10.99,
                description: 'Watch Showtime shows the moment they air, on-demand, or binge. They also offer all back seasons of episodes.',
                subscriptionLink: 'http://www.sho.com/order?source=acq_shoanytime_about',
                gPlayLink: 'https://play.google.com/store/apps/details?id=com.showtime.showtimeanytime',
                iOSAppStoreLink: 'https://itunes.apple.com/us/app/showtime-anytime/id484232467?mt=8'
            },
            {
                name: 'cbs',
                price: 5.99,
                description: 'New CBS episodes on demand the day after they air and almost all past seasons of CBS shows for binging.' +
                ' In select markets, you can stream CBS live.',
                subscriptionLink: 'https://www.cbs.com/all-access/',
                gPlayLink: 'https://play.google.com/store/apps/details?id=com.cbs.ott',
                iOSAppStoreLink: 'https://itunes.apple.com/us/app/cbs/id530168168?mt=8'
            },
            {
                name: 'nbc',
                price: 0.00,
                description: 'A DVR-like, on-demand app that offers shows from NBC a day after they air. You do have to watch commercials, but it\'s free.',
                subscriptionLink: 'http://www.nbc.com/video',
                gPlayLink: 'https://play.google.com/store/apps/details?id=com.nbcuni.nbc&hl=en',
                iOSAppStoreLink: 'https://itunes.apple.com/us/app/nbc-watch-now-stream-full/id442839435?mt=8'
            },
            {
                name: 'thecw',
                price: 0.00,
                description: 'An on-demand and binge combo for classic CW shows and some new original content.',
                subscriptionLink: 'http://www.cwseed.com/',
                gPlayLink: 'https://play.google.com/store/apps/details?id=com.cw.seed.android&hl=en',
                iOSAppStoreLink: 'https://itunes.apple.com/us/app/the-cw/id491730359?mt=8'
            },
            {
                name: 'PBS App',
                price: 0.00,
                description: 'A streaming App for PBS.',
                subscriptionLink: 'http://www.pbs.org/video/',
                gPlayLink: '',
                iOSAppStoreLink: ''
            },
            {
                name: 'starz',
                price: 8.99,
                description: 'Download and watch past episodes and seasons of your favorite Starz shows. Unlike HBO Now and Showtime,' +
                ' you can\'t watch shows as they air. They do let you download shows to watch at a later time when you may not have access to wifi.',
                subscriptionLink: 'https://www.starz.com/buy-starz/?TID=',
                gPlayLink: 'https://play.google.com/store/apps/details?id=com.bydeluxe.d3.android.program.starz&hl=en',
                iOSAppStoreLink: 'https://itunes.apple.com/us/app/starz/id550221096?mt=8'
            },
            {
                name: 'Seeso',
                price: 3.99,
                description: 'NBC\'s binge watching app for classic and hard-to-find comedy as well as original content. No commercials.',
                subscriptionLink: 'https://www.seeso.com/',
                gPlayLink: 'https://play.google.com/store/apps/details?id=seeso.com&hl=en',
                iOSAppStoreLink: 'https://itunes.apple.com/us/app/seeso/id1053181816?mt=8'
            },
            {
                name: 'tubi_tv', price: 0.00, description: 'Free binge watching app for unique and classic content.',
                subscriptionLink: 'https://tubitv.com/',
                gPlayLink: 'https://play.google.com/store/apps/details?id=com.tubitv&hl=en',
                iOSAppStoreLink: 'https://itunes.apple.com/us/app/tubi-tv-stream-free-movies/id886445756?mt=8   '
            }

        ])

        .constant('MAJOR_NETWORKS', [
            'ABC'
        ])

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
    ;

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
                'modal': {
                    templateUrl: 'static/partials/modal/modalContainer.html',
                    controller: 'ModalController'
                },
                'home': {
                    templateUrl: 'static/partials/home.html',
                    controller: 'HomeController'
                },
                'footer': {
                    templateUrl: 'static/partials/footer.html'
                }
            }

        })
        .state('blog', {
            abstract: true,
            templateUrl: "static/partials/blog.html"
        })
        .state('blog.blog-one', {
            url: '/blog/blog-one/1',
            data: {
                blog: 1
            },
            views: {
                'navigation': {
                    templateUrl: "/static/partials/navigation.html",
                    controller: 'navigation'
                },
                'blog-one': {
                    templateUrl: 'static/partials/blog/blog-one.html'
                },
                'footer': {
                    templateUrl: 'static/partials/footer.html'
                }
            }
        })
        .state('explain', {
            abstract: true,
            templateUrl: "static/partials/explain.html"
        })
        .state('explain.still-confused', {
            url: '/explain/still-confused',
            data: {
                explain: 1
            },
            views: {
                'navigation': {
                    templateUrl: "/static/partials/navigation.html",
                    controller: 'navigation'
                },
                'still-confused': {
                    templateUrl: 'static/partials/explain/still-confused.html'
                },
                'footer': {
                    templateUrl: 'static/partials/footer.html'
                }
            }
        })
        .state('error', {
            abstract: true,
            templateUrl: "static/partials/error.html"
        })
        .state('error.coming-soon', {
            url: '/error/coming-soon',
            data: {
                error: 1
            },
            views: {
                'coming-soon': {
                    templateUrl: 'static/partials/error/coming-soon.html'
                }
            }
        })
        .state('login', {
            url: '/login',
            template: 'Hello world'
        })
        .state('journey-one', {
            abstract: true,
            templateUrl: "/static/partials/journey-one.html",
            data: {hmdcActive: true}
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

        .state('check', {
            templateUrl: '/static/partials/checkout.html',
            abstract: true
        })
        .state('check.out', {
            url: '/checkout',
            data: {
                checkout: true
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

        .state('dash.dashboard', {
            url: '/dashboard',
            data: {
                dashboard: true
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
                'services': {
                    templateUrl: '/static/partials/service-panel/service-panel.html',
                    controller: 'ServicePanelController'
                },
                'hardware': {
                    templateUrl: '/static/partials/hardware-panel/hardware-panel.html',
                    controller: 'HardwareController'
                },
                'select': {
                    templateUrl: '/static/partials/selected-show/select.html'
                },
                'footer': {
                    templateUrl: 'static/partials/footer.html'
                }
            },
            onEnter: function () {
                $('body').addClass('no-scroll');

            },
            onExit: function () {
                $('body').removeClass('no-scroll')
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
                'footer': {
                    templateUrl: 'static/partials/footer.html'
                }

            }
        })
        .state('mobile.services', {
            url: '/m/services',
            data: {},
            views: {

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

//TODO uncomment this after developingt the mobile checkout page

app.run(function ($window, $state) {
    $($window).resize(function () {
        var curr = $state.current.name

        var d_state = RegExp('dash').test(curr) ? true : false
        var m_state = RegExp('mobile').test(curr) ? true : false
        if (this.innerWidth > 767) {
            if (m_state) {

                if (/services/.test(curr)) {
                    $state.go('check.out')
                } else {

                    $state.go('dash.dashboard')
                }

            }
        } else {
            if (!m_state) {

                if (/dashboard/.test(curr)) {
                    $state.go('mobile.shows')

                }

                if (/check/.test(curr)) {
                    $state.go('mobile.services')
                }

            }
        }
    })
})

app.controller('HomeController', function () {
    $('body').attr('id', 'background')
})
