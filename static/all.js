/**
 * Created by Nem on 6/12/15.
 */
var app = angular.module('myApp', ["ui.router", "ngCookies", "ui.bootstrap", "ngAnimate", 'slick', 'angular-growl'])
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
                if($window.innerWidth< 767){
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

app.run(function($window, $state){
    $($window).resize(function(){
        if (this.innerWidth > 767){
            $state.go('dash.dashboard')
        } else {
            $state.go('mobile.shows')
        }
    })
})

app.controller('HomeController', function () {
    $('body').attr('id', 'background')
})

/**
 * Created by Nem on 6/4/16.
 */
serviceInformation = {
    ppv: {
        name: 'Pay Per View',
        price: 0.00,
        description: 'If a subscription service is not for you, these apps allow you to purchase a show at a time.' +
        ' Or you can purchase an entire season once it has finished airing.',
        subscriptionLink: 'https://play.google.com/store/movies/category/TV?hl=en',
        gPlayLink: '',
        iOSAppStoreLink: ''
    },
    netflix: {
        name: 'netflix', price: 9.99, description: 'Best described as a "binge watch" service. ' +
        'Typically, full seasons are launched all at once and a season behind what is currently showing on TV. Netflix also offers original programming now.' +
        ' This is also released a full season at a time.',
        subscriptionLink: 'https://www.netflix.com/',
        gPlayLink: 'https://play.google.com/store/apps/details?id=com.netflix.mediaclient&hl=en',
        iOSAppStoreLink: 'https://itunes.apple.com/us/app/netflix/id363590051?mt=8&utm_source=Lifehacker+Newsletter&utm_campaign=84a4c2a72c-UA-142218-1&utm_medium=email'
    },
    hulu_plus: {
        name: 'hulu_plus',
        price: 7.99,
        description: 'An on-demand service (think DVR) that offers shows from certain networks (ABC, limited NBC, FOX, CW, etc)' +
        ' a day after they air. Subscription prices depend on whether or not you purchase an ad-free package or not.',
        subscriptionLink: 'http://www.hulu.com/start',
        gPlayLink: 'https://play.google.com/store/apps/details?id=com.hulu.livingroomplus',
        iOSAppStoreLink: 'https://itunes.apple.com/us/app/hulu/id376510438?mt=8'
    }
    ,
    amazon_prime: {
        name: 'amazon_prime',
        price: 8.25,
        description: 'An on-demand and binge combo. Some programming is offered in full-season format and some is on-demand after it airs live.' +
        ' Some shows are free while others are not. Amazon is also building a strong offering of original shows. ' +
        'It comes free with an annual Prime membership.',
        subscriptionLink: 'http://www.amazon.com/gp/video/getstarted',
        gPlayLink: 'https://play.google.com/store/apps/details?id=com.amazon.mShop.android.shopping',
        iOSAppStoreLink: 'https://itunes.apple.com/us/app/amazon-video/id545519333?mt=8&ign-mpt=uo%3D2'
    }
    ,
    hbo_now: {
        name: 'hbo_now',
        price: 14.99,
        description: 'Watch HBO shows the moment they air, on-demand, or binge. They also offer all back seasons of episodes.',
        subscriptionLink: 'https://order.hbonow.com/',
        gPlayLink: 'https://play.google.com/store/apps/details?id=com.hbo.hbonow&hl=en',
        iOSAppStoreLink: 'https://itunes.apple.com/us/app/hbo-now/id971265422?mt=8&ign-mpt=uo%3D2'
    }
    ,
    'sling-tv': {
        name: 'sling-tv', price: 20.00,
        description: 'Live streaming service that makes shows available as they simultaneously air on cable.' +
        ' The main Sling package gives you a "skinny bundle" of some of the most popular cable channels (ESPN, CNN, HGTV, etc.) ' +
        'with the option to add extra mini packages on top of your main Sling package.',
        subscriptionLink: 'https://www.sling.com/',
        gPlayLink: 'https://play.google.com/store/apps/details?id=com.sling',
        iOSAppStoreLink: 'https://itunes.apple.com/us/app/sling-tv-live-and-on-demand/id945077360?mt=8'
    }
    ,
    ota: {
        name: 'Over The Air',
        price: 0.00,
        description: 'Watching over the air (OTA) is like watching live television.' +
        ' There is no monthly cost, but a digital antenna is needed to pull in the signal.',
        subscriptionLink: 'http://amzn.com/B00X4RA74A',
        gPlayLink: '',
        iOSAppStoreLink: ''
    }
    ,
    showtime: {
        name: 'showtime',
        price: 10.99,
        description: 'Watch Showtime shows the moment they air, on-demand, or binge. They also offer all back seasons of episodes.',
        subscriptionLink: 'http://www.sho.com/order?source=acq_shoanytime_about',
        gPlayLink: 'https://play.google.com/store/apps/details?id=com.showtime.showtimeanytime',
        iOSAppStoreLink: 'https://itunes.apple.com/us/app/showtime-anytime/id484232467?mt=8'
    }
    ,
    cbs: {
        name: 'cbs',
        price: 5.99,
        description: 'New CBS episodes on demand the day after they air and almost all past seasons of CBS shows for binging.' +
        ' In select markets, you can stream CBS live.',
        subscriptionLink: 'https://www.cbs.com/all-access/',
        gPlayLink: 'https://play.google.com/store/apps/details?id=com.cbs.ott',
        iOSAppStoreLink: 'https://itunes.apple.com/us/app/cbs/id530168168?mt=8'
    }
    ,
    nbc: {
        name: 'nbc',
        price: 0.00,
        description: 'A DVR-like, on-demand app that offers shows from NBC a day after they air. You do have to watch commercials, but it\'s free.',
        subscriptionLink: 'http://www.nbc.com/video',
        gPlayLink: 'https://play.google.com/store/apps/details?id=com.nbcuni.nbc&hl=en',
        iOSAppStoreLink: 'https://itunes.apple.com/us/app/nbc-watch-now-stream-full/id442839435?mt=8'
    }
    ,
    thecw: {
        name: 'thecw',
        price: 0.00,
        description: 'An on-demand and binge combo for classic CW shows and some new original content.',
        subscriptionLink: 'http://www.cwseed.com/',
        gPlayLink: 'https://play.google.com/store/apps/details?id=com.cw.seed.android&hl=en',
        iOSAppStoreLink: 'https://itunes.apple.com/us/app/the-cw/id491730359?mt=8'
    }
    ,
    pbs: {
        name: 'PBS App',
        price: 0.00,
        description: 'A streaming App for PBS.',
        subscriptionLink: 'http://www.pbs.org/video/',
        gPlayLink: '',
        iOSAppStoreLink: ''
    }
    ,
    starz: {
        name: 'starz',
        price: 8.99,
        description: 'Download and watch past episodes and seasons of your favorite Starz shows. Unlike HBO Now and Showtime,' +
        ' you can\'t watch shows as they air. They do let you download shows to watch at a later time when you may not have access to wifi.',
        subscriptionLink: 'https://www.starz.com/buy-starz/?TID=',
        gPlayLink: 'https://play.google.com/store/apps/details?id=com.bydeluxe.d3.android.program.starz&hl=en',
        iOSAppStoreLink: 'https://itunes.apple.com/us/app/starz/id550221096?mt=8'
    }
    ,
    seeso: {
        name: 'Seeso',
        price: 3.99,
        description: 'NBC\'s binge watching app for classic and hard-to-find comedy as well as original content. No commercials.',
        subscriptionLink: 'https://www.seeso.com/',
        gPlayLink: 'https://play.google.com/store/apps/details?id=seeso.com&hl=en',
        iOSAppStoreLink: 'https://itunes.apple.com/us/app/seeso/id1053181816?mt=8'
    }
    ,
    tubi_tv: {
        name: 'tubi_tv', price: 0.00, description: 'Free binge watching app for unique and classic content.',
        subscriptionLink: 'https://tubitv.com/',
        gPlayLink: 'https://play.google.com/store/apps/details?id=com.tubitv&hl=en',
        iOSAppStoreLink: 'https://itunes.apple.com/us/app/tubi-tv-stream-free-movies/id886445756?mt=8   '
    }


}

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


app.directive('checkoutImageBlock', function () {
    return {
        restrict: 'E',
        templateUrl: 'static/partials/checkout-list/checkout-image-block.html',
        scope: {
            service: '=',
            key: '='
        },

        link: function (scope, element) {

            scope.processServiceUrl = function(service){
                if(scope.key == 'ota') {
                    return 'ota_sprite'
                }


                return service + "_sprite"
            }

        }
    }
})

app.directive('actionBlock', function () {

    return {
        restrict: 'E',
        templateUrl: 'static/partials/checkout-list/action-block.html',
        scope: {
            service: '=',
            package: '='
        },

        link: function (scope, element) {


            scope.isServiceAdded = function (service) {

                return _.some(scope.package.data.services, function (elem) {
                    return _.includes(elem.chan, service.chan.source)
                })
            }

            scope.addService = function (service) {

                scope.isServiceAdded(service) || scope.package.data.services.push(service)

            }

            scope.removeServiceFromPackage = function (service) {

                scope.package.data.services.pop(service)
            }

            scope.removeElementFromDom = function () {
              
                element.parent().parent().remove()
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
    var _longestShowLength
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

$(document).ready(function () {
    _.sortBy($('.checkout-show-title'), function () {

        return $(this).width
    })
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


                            console.log(p)
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
app.directive('mobileTabs', function ($location, $anchorScroll) {
    return {
        // restrict: 'E',
        templateUrl: 'static/partials/mobile-toolbar.html',

        link: function (scope) {

            scope.scrollTo = function (tag) {
                var old=$location.hash()
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
                        debugger
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


            scope.formatDate = function (dateString) {
                // debugger
                return moment(dateString).format('MMMM D, Y')
            }

            scope.fixTitle = function (key) {
                if (key == 'misc') {
                    return 'MISC'
                }

                if (key == 'binge') {
                    return 'BINGE'
                }

                if (key == 'on_demand') {
                    return 'ON DEMAND'
                }

                if (key == 'live') {
                    return 'LIVE'
                }

                if (key == 'pay_per_view') {

                    return 'PAY PER EPISODE / SEASON'
                }
            }

            scope.hasOwnApp = function (key, item) {
                // debugger;

                servicesWithApps = [ 'CBS', 'NBC', 'HBO', 'HBO NOW', 'Showtime', 'Starz', 'History Channel'];
                if (key == 'live' && item.name != 'Sling' && item.name != 'OTA') {

                    if (item.hasOwnProperty('display_name')){

                        return _.some(servicesWithApps, function(elem){
                            return elem == item.display_name;
                        })
                    }

                    return _.some(servicesWithApps,  function(elem){
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
                // debugger;
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

app.directive('otaSlingNetflix', function () {
    return {
        restrict: 'A',

        link: function (scope, element, attrs) {

            if (element.scope().$parent.key == 'binge') {
                if (scope.cs.on_netflix && !_.some(scope.detailSources.binge, ['source', 'netflix'])) {

                    element.append('<div class="col-sm-4"><img class="" src="https://s3.amazonaws.com/streamsavvy/service_logos/netflix"></div>')
                }

            }

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
                //        debugger;
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
                //debugger
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
        console.log(list)
        console.log('list')

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
        133, //Starz
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
        // debugger;
        return function (array) {
            return _.filter(array, 'on_netflix')
        }

    })
app.filter('unique', function() {
    return function (arr, field) {
        return _.uniq(arr, function(a) { return a[field]; });
    };
});
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
            var deffered = $q.defer();
            $http({
                method: 'POST',
                url: "o/token",
                data:credentials

            })
                .success(function (data) {
                    deffered.resolve(data)
                })
                .error(function (e, code) {
                    $log.error(e, code)
                });
            return deffered.promise;
        },

        getHardware: function(){
            var deffered = $q.defer();
            $http.get('/api/hardware')
                .success(function(data){
                    deffered.resolve(data)
                })
                .error(function(e){
                    $log.error(e, code)
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
          var x = config
          return config
        },

        'response': function (response) {


          return response
        }
      }

    })

  .factory('TokenAuthInterceptor', function ($window, $q) {
      return {
        'request': function (config) {
          config.headers = config.headers || {}
          if ($window.sessionStorage.token) {
            config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
          }

          return config
        },
        response: function (response) {
          if (response.status === 401) {
            // handle the case where the user is not authenticated
          }
          return response || $q.when(response);
        }
      }
    })

  .config(function ($httpProvider, $provide, $windowProvider) {
    $httpProvider.interceptors.push('s3FeedbackInterceptor');
    $httpProvider.interceptors.push('TokenAuthInterceptor')

  })

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

function interceptor(obj) {
    console.log(obj)

}

var payPerServices = ['vudu', 'amazon_buy', 'google_play', 'itunes', 'youtube_purchase'];

app.factory('N', function () {
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

app.factory('PackageFactory', ['$http', '$q', 'VIEW_WINDOWS', '_', function ($http, $q, VIEW_WINDOWS, _) {
    // ;

    var _package = {};

    var _env = ""

    var _test = 1;

    var _chosenShow = {};

    var _listOfServices = [];


    function getBaseShowServiceCatagories(ssPackage) {
        debugger;
        return _.chain(ssPackage.data.content)
            .map(function (elem) {
                _.forEach(elem.channel, function (c) {
                    c.source = c.guidebox_data.short_name
                })
                var list
                elem.guidebox_data.sources == undefined ? list = elem.channel : list = _.concat(elem.channel, elem.guidebox_data.sources.web.episodes.all_sources, elem.guidebox_data.sources.ios.episodes.all_sources);
                return list
            })
            .flatten()
            .uniqBy('source')
            .thru(function (services) {
                debugger;
                if (checkForHuluWithShowtime(services)) {
                    services = removeHuluIfShowtimeContent(services)
                }

                return services
            })
            .uniqBy(function (elem) {
                if (elem.display_name) {
                    return elem.display_name
                } else {
                    return elem.name
                }
            })
            .tap(interceptor)
            .map(function (elem) {
                if (elem.source == 'hulu_free') {
                    elem.source = 'hulu_plus';
                    elem.id = 10
                    return elem
                }

                return elem;
            });
    }

    return {
        setChosenShow: function (show) {
            _chosenShow = show
        },

        getChosenShow: function () {
            return _chosenShow;
        },

        setPackage: function (ssPackage) {


            _package = ssPackage;

            if (!_.isEmpty(ssPackage)) {
                this.postPackage(ssPackage)
            }

        },

        postPackage: function (ssPackage) {
            $http.put(ssPackage.url, ssPackage);
        },

        getPackage: function () {
            return _package;
        },

        getSSTest: function () {
            // ;
            return _test;
        },

        updatePackageChannels: function (scope) {
            //debugger;

            if (scope.package.content.length == 0) {
                scope.package.providers = [];
            }


            return $q(function (resolve, reject) {

                var chans = _.map(scope.package.content, function (elem) {
                    var x = []

                    _.forEach(VIEW_WINDOWS, function (w) {

                        if (elem.viewingWindows !== undefined && elem.viewingWindows[w.type] !== undefined) {
                            var window = elem.viewingWindows[w.type];

                            if (window.selected && window.channel !== undefined) {
                                x.push(window.channel)
                            }

                        }

                    })


                    return x
                })

                chans = _.flatten(chans)

                //debugger;

                chans = _.uniq(chans, function (elem) {

                    if (elem.service !== undefined) {
                        return elem.service
                    }
                    return elem.source
                })

                scope.package.providers = chans
            })


        },

        totalServiceCost: function () {


            var t = 0;

            var pkg = _package;
            if (true) {

                t = _.map(pkg.providers, function (elem) {
                    return elem.price;
                })

                t = _.compact(t);

                t = _.reduce(t, function (total, n) {
                    return total + n
                })
            }

            t = _.round(t, 2)

            return t


        },
        totalHardwareCost: function () {


            var t = 0;

            var pkg = _package;


            t = _.map(pkg.hardware, function (elem) {
                return elem.retail_cost;
            })

            t = _.compact(t);

            t = _.reduce(t, function (total, n) {
                return total + n
            })


            t = _.round(t, 2)

            return t


        },

        getListOfServices: function () {

            return _listOfServices;
        },
        setListOfServices: function (listOfServices) {
            _listOfServices = listOfServices;
        },

        createListOfServices: function () {

            var ssPackage = this.getPackage();
            if ('data' in ssPackage) {
                var list = getBaseShowServiceCatagories(ssPackage)

                    .map(function (elem) {
                        var o = {chan: elem}
                        o.shows = _.filter(ssPackage.data.content, function (show) {
                            if (show.guidebox_data.sources) {
                                var source_check = _.some(show.guidebox_data.sources.web.episodes.all_sources, ['source', elem.source])
                            } else {
                                source_check = false
                            }

                            var url_check = _.some(show.channel, ['url', elem.url]);
                            return url_check || source_check
                        })

                        if (o.chan.guidebox_data) {
                            if (o.chan.guidebox_data.is_over_the_air) {
                                o.chan.is_over_the_air = o.chan.guidebox_data.is_over_the_air;
                            }
                        }

                        return o

                    })
                    .groupBy(function (elem) {
                        if (elem.chan.is_over_the_air) {
                            return 'ota'
                        }
                        if (check_if_on_sling(elem)) {
                            return 'sling'
                        }


                        else {
                            return 'not_ota'
                        }
                    })
                    .thru(function (list) {

                        var showsOta = _.map(list.ota, function (elem) {
                            return elem.shows
                        })

                        if (list.ota && list.ota.length > 1) {
                            list.ota[0].shows = _.uniqBy(_.flatten(showsOta), 'url');
                            list.ota = [list.ota[0]];
                        }

                        var showsPpv = _.map(list.ppv, function (elem) {
                            return elem.shows
                        })

                        if (list.ppv && list.ppv.length > 1) {
                            list.ppv[0].shows = _.uniqBy(_.flatten(showsPpv), 'url');
                            list.ppv = [list.ppv[0]];
                        }


                        return list


                    })

                    .value();
                this.setListOfServices(list)

                return list
            }
        },

        catagorizeShowsByService: function (ssPackage) {
            return getBaseShowServiceCatagories(ssPackage)
            // .map(function (elem) {
            //     debugger;
            //
            //     if (elem.guidebox_data != undefined) {
            //         elem.source = elem.guidebox_data.short_name
            //     }
            //     return elem
            // })

                .map(function (elem) {
                    //debugger
                    if (elem.guidebox_data != undefined) {
                        elem.display_name = elem.guidebox_data.name
                        return elem
                    } else {
                        return elem
                    }
                })
                .map(function (elem) {
                    var o = {chan: elem}
                    o.shows = _.filter(ssPackage.data.content, function (show) {
                        if (show.guidebox_data.sources) {
                            var source_check = _.some(show.guidebox_data.sources.web.episodes.all_sources, ['source', elem.source])
                        } else {
                            source_check = false
                        }

                        var url_check = _.some(show.channel, ['url', elem.url]);
                        return url_check || source_check
                    })

                    if (o.chan.guidebox_data) {
                        if (o.chan.guidebox_data.is_over_the_air) {
                            o.chan.is_over_the_air = o.chan.guidebox_data.is_over_the_air;
                        }
                    }

                    return o

                })
                .filter(function (elem) {
                    return elem.chan.source != "netflix" && elem.chan.source != 'misc_shows'
                })
                .uniqBy(function (elem) {
                    return elem.chan.source
                })
                .tap(interceptor)
                .groupBy(function (elem) {

                    if (elem.chan.is_over_the_air) {
                        return 'ota'
                    }
                    if (check_if_on_sling(elem)) {
                        return 'sling'
                    }

                    if (_.includes(payPerServices, elem.chan.source)) {
                        return 'ppv'

                    }
                    else {
                        return 'not_ota'
                    }
                })
                .tap(interceptor)
                .thru(function (list) {

                    var showsOta = _.map(list.ota, function (elem) {
                        return elem.shows
                    })

                    if (list.ota && list.ota.length > 1) {
                        list.ota[0].shows = _.uniqBy(_.flatten(showsOta), 'url');
                        list.ota = [list.ota[0]];
                    }

                    var showsPpv = _.map(list.ppv, function (elem) {
                        return elem.shows
                    })

                    if (list.ppv && list.ppv.length > 1) {
                        list.ppv[0].shows = _.uniqBy(_.flatten(showsPpv), 'url');
                        list.ppv = [list.ppv[0]];
                    }

                    if (_.some(list.ota, function (item) {
                            return item.chan.source == 'nbc'
                        })) {
                        var nbc = _.takeWhile(list.ota, function (item) {
                            return item.chan.source == 'nbc'
                        })


                        if (list.not_ota == undefined) {
                            list.not_ota = nbc
                        } else {
                            list.not_ota = _.concat(list.not_ota, nbc)
                        }
                    }


                    return list

                })


                .value();
        }
    }


}]);


app.run(function (PackageFactory, $http, http, $rootScope) {
    $http.get('/api/package/')
        .then(function (data) {
            //debugger
            //$rootScope.env = data.data.env

            console.log(data);

            data = data.data.results[0]
            PackageFactory.setPackage(data)

        })
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

app.factory('ShowDetailAnimate', function ($timeout, $q) {
    //debugger;

    var bodyEl = document.body,
        // gridEl = $('#theGrid')[0],
        // sidebarEl = document.getElementById('theSidebar'),
        // gridItemsContainer = gridEl.querySelector('div.row'),
    //contentItemsContainer = gridEl.querySelector('section.content'),
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
                dummy.style.WebkitTransform = 'translate3d(0, ' + (scrollY() + 50) + 'px, 0px)';
                dummy.style.transform = 'translate3d(0, ' + (scrollY() + 50) + 'px, 0px)';
                // disallow scroll
                window.addEventListener('scroll', this.noscroll);
                onEndTransition(dummy, function () {
                    // add transition class
                    classie.remove(dummy, 'placeholder--trans-in');
                    classie.add(dummy, 'placeholder--trans-out');
                    // position the content container
                    //contentItemsContainer.style.top = scrollY() + 'px';
                    // show the main content container
                    //classie.add(contentItemsContainer, 'content--show');
                    // show content item:
                    //classie.add(contentItems[current], 'content__item--show');
                    // show close control
                    //classie.add(closeCtrl, 'close-button--show');
                    // sets overflow hidden to the body and allows the switch to the content scroll
                    classie.addClass(bodyEl, 'noscroll');

                    isAnimating = false;
                });
            }, 25);

        },

        hideContent: function (positionItem, scaleItem, container) {
            //var gridItem = gridItems[current], contentItem = contentItems[current];
            //debugger;

            //classie.remove(contentItem, 'content__item--show');
            //classie.remove(contentItemsContainer, 'content--show');
            //classie.remove(closeCtrl, 'close-button--show');
            classie.remove(bodyEl, 'view-single');

            return $timeout(function () {
                // debugger;

                var dummy = container.querySelector('.placeholder');

                function firstStep() {
                    // debugger;
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
                            // reset content scroll..
                            positionItem.parentNode.scrollTop = 0;
                            container.removeChild(dummy);
                            //classie.remove(gridItem, 'grid__item--loading');
                            //classie.remove(gridItem, 'grid__item--animate');
                            lockScroll = false;
                            window.removeEventListener('scroll', this.noscroll);
                        })
                        current = -1;
                    }, 400)
                })

                //debugger;


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


app.controller('CheckoutController', function ($scope, $http, $timeout,$filter, PackageFactory, SERVICE_PRICE_LIST) {

    $scope.package = PackageFactory.getPackage();
    $scope.listP = PackageFactory.createListOfServices();

    $scope.list = {}

    $scope.list.added = [];
    
    var payPerServices = ['google_play','itunes','youtube_purchase','vudu','amazon_buy'];

    $scope.addService = function (service) {
        _.includes($scope.package.data.services, service.display_name) || $scope.package.push(service)

    };
    $scope.notOtaServiceDetail = function(mystery_service) {
        if(_.some(payPerServices,mystery_service.chan.source)){
            console.log('this is the payperview service ' + mystery_service.chan.source);
            mystery_service.description = SERVICE_PRICE_LIST[0].description;
            mystery_service.price = SERVICE_PRICE_LIST[0].price;
            //mystery_service.subscriptionLink = SERVICE_PRICE_LIST[0].subscriptionLink;
            //mystery_service.gPlayLink = SERVICE_PRICE_LIST[0].gPlayLink;
            
            
        }
        else{
            var serviceMatch = _.find(SERVICE_PRICE_LIST,function(elem){
                return elem.name == mystery_service.chan.source;
            });
            if(serviceMatch != undefined){

                _.assignIn(mystery_service, serviceMatch);

            }
        }
    };

    $scope.otaServiceDetail = function(live_mystery_service){
        if(live_mystery_service.chan.is_on_sling){
            var slingService = _.find(SERVICE_PRICE_LIST,function(elem){ return elem.name == 'SlingTV'});
            _.assignIn(live_mystery_service, slingService);

        }
        else if(live_mystery_service.chan.is_over_the_air){
            var otaService = _.find(SERVICE_PRICE_LIST,function(elem){ return elem.name == 'Over The Air'});
             _.assignIn(live_mystery_service, otaService);
        }
    };
    $scope.removeService = function(service,serviceArray) {
        if(serviceArray == 'ota'){
           _.pull($scope.list.ota,service);
        }
        else{
           _.pull($scope.list.not_ota,service);
        }
        PackageFactory.setListOfServices($scope.list);
    };
    $scope.openTab = function(servicePurchase){
        if(servicePurchase != undefined)
        {
           $scope.url = servicePurchase.subscriptionLink;
        }

    }
    
    $scope.$watchCollection(function () {
        return PackageFactory.getPackage().data.services

    }, function () {
        PackageFactory.setPackage($scope.package)
    })
    
    
    //TODO remove this nonsense
    $scope.$watchCollection(function () {
        return PackageFactory.getPackage().data.content

    }, function () {
        $scope.package = PackageFactory.getPackage();
        $scope.list = PackageFactory.getListOfServices();
        _.forEach($scope.list.not_ota, function(not_ota_service){
            if(not_ota_service != undefined){
                $scope.notOtaServiceDetail(not_ota_service);
            }

        } );
        _.forEach($scope.list.ota, function(ota_service){
            if(ota_service != undefined){
                $scope.otaServiceDetail(ota_service);
            }
        })
    })
   

    
    
    
    
    
    
});

/**
 * Created by chirag on 3/28/16.
 */

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

/**
 * Created by chirag on 8/3/15.
 */
app.controller('home', function ($scope, $http, http, $cookies, $location) {


    $scope.login = function (credentials) {
        //credentials.next = "/api/";
        credentials.csrfmiddlewaretoken = $cookies.get('csrftoken');
        credentials.submit = "Log in";
        http.login(credentials)
            .then(function (data) {
                console.log(data);
                $location.url('search');
                $scope.logged_in = true;
            })
    };

    $scope.logout = function () {
        $http.get('django_auth/logout/')
            .success(function () {
                $location.url('/');
                $scope.logged_in = false;
            })
    }


});

/**
 * Created by Nem on 6/28/15.
 */
app.controller('navigation', function ($scope, http, $http, $cookies, $location, $state, $rootScope, CONFIG, $timeout) {


    $scope.menuOpen ? $('#menu-mask').fadeIn(): $('#menu-mask').fadeOut();

    $scope.isHomePage = $state.current.data.isHomePage;

    $timeout(function(){
        $scope.isHomePage && $('div#mainPage').css({'min-height':'100vh'});
    }, 0)

    $scope.isActive = function (hash) {
        return document.location.hash == hash;


    }


    $scope.hmdc = $state.current.data.hmdcActive;

    $scope.logout = function () {
        $location.path(CONFIG.URL + '/django_auth/logout/');
        //.success(function () {
        //    $rootScope.logged_in = false;
        //    console.log($rootScope.logged_in)
        //})
    }

    var menuLeft = document.getElementById('cbp-spmenu-s1'),
        mainPage = document.getElementById('mainPage'),
        showLeftPush = document.getElementById('showLeftPush'),
        body = document.body;


    $scope.showLeftPush = function () {
        //classie.toggle(this, 'active')
        $scope.menuOpen = !$scope.menuOpen;

        //debugger;
        //classie.toggle(body, 'cbp-spmenu-push-toright');
        //classie.toggle(menuLeft, 'cbp-spmenu-open');
        $('#cbp-spmenu-s1').toggleClass('cbp-spmenu-open')
        //classie.toggle(mainPage, 'cbp-spmenu-push-toright');
        // $('#mainPage').toggleClass('cbp-spmenu-push-toright');
        // $('#dashPage').toggleClass('cbp-spmenu-push-toright');

        $scope.menuOpen ? $('#menu-mask').fadeIn(): $('#menu-mask').fadeOut()


        $('#showLeftPush').toggleClass('cbp-spmenu-push-toright');


        //$('#showLeftPush').toggleClass('cbp-spmenu-push-toright');
        // $('#ss-panel-right').toggleClass('fixed-menu-transform');
        // $('#ss-navigation-view').toggleClass('cbp-spmenu-push-toright');

        //disableOther('showLeftPush');
    };


});

app.run(function ($rootScope) {
    angular.element('#status').text() === 'True' ? $rootScope.logged_in = true : $rootScope.logged_in = false;
    console.log($rootScope.logged_in)

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
app.controller('search', function ($scope, $rootScope, $http, http, PackageFactory, _, Fuse, BANNED_CHANNELS, SLING_CHANNELS, SERVICE_PRICE_LIST, N, MAJOR_NETWORKS, growl) {


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

    $scope.search = function (val) {
        if (val) {
            return $http.get('/api/search?q=' + val)
                .then(function (data) {
                    //debugger;
                    var sorted = _.sortBy(data.data.results, function (elem) {
                        return elem.title.length
                    })

                    if (data.data.searchText == val) {
                        $scope.suggestions = sorted;
                        return sorted
                    }
                    $scope.selectedIndex = -1
                });
        } else {
            $scope.suggestions = [];
            return "hello world"
        }
    };

    $rootScope.addToSelectedShows = function (suggestion, model, label, event) {
        var ssPackage = PackageFactory.getPackage();
        if (suggestion !== undefined) {
            if (_.some(ssPackage.data.content, ['url', suggestion.url])) {
                growl.warning('You already added ' + suggestion.title + ' to your package!');
                $scope.suggestions = [];
                return
            }


            if (suggestion.guidebox_data.id !== undefined && typeof suggestion.guidebox_data.id === 'number') {
                //debugger;
                $scope.loading = true

                suggestion.justAdded = true;

                ssPackage.data.content.push(suggestion);

                PackageFactory.setPackage(ssPackage);

                $scope.loading = false
            }

        }
        $scope.searchText = '';
        $scope.suggestions = [];


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
            if($scope.selectedIndex > -1){

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




});


/**
 * Created by Nem on 5/24/16.
 */
app.controller('HardwareController', function ($scope, PackageFactory) {

    $scope.pkg = PackageFactory.getPackage();


    /*  $('.service-panel').on('scroll', function () {
     $('.not-ready').fadeOut()
     })

     $('.service-panel').on('scroll', function () {
     debugger
     _.debounce(function () {

     $('.not-ready').fadeIn()
     }, 100)()
     })*/
    $scope.collapseHardware = true;
    var serviceHeight = $(window).height() - 46;

    if ($scope.collapseHardware) {
        $('.service-panel.ng-scope').css({'height': serviceHeight + 'px'});

    }

    $scope.toggleHardwarePanel = function () {


        if (!$scope.collapseHardware) {
            $('.service-panel.ng-scope').animate({'height': serviceHeight + 'px'});
            $('.hardware-panel.ng-scope').animate({'height': '46px'});
        } else {
            $('.hardware-body').animate({height: '40vh'});
            $('.hardware-panel.ng-scope').animate({'height': '40vh'});
            $('.service-panel.ng-scope').animate({height: '60vh'});

        }
        $scope.collapseHardware = !$scope.collapseHardware;

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

app.controller('ServicePanelController', function ($scope, $http, $timeout, PackageFactory, VIEW_WINDOWS) {

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

        if ('data' in ssPackage) {
            $scope.listOfServices = undefined;
            $scope.listOfServices = PackageFactory.catagorizeShowsByService(ssPackage);
            $scope.listOfServices = _.forEach($scope.listOfServices, function (val, key) {
                $scope.listOfServices[key].open = true
            })
            PackageFactory.setListOfServices($scope.listOfServices);
        }
    }

    updateServices()
    $scope.$watchCollection(function () {
        var _data =  PackageFactory.getPackage().data;
        if (_data != undefined) {
            return _data.content
        } else {
            return []
        }

    }, function () {
        ssPackage = PackageFactory.getPackage();
        $scope.pkg = PackageFactory.getPackage();

        updateServices()
    })


});


function interceptor(obj) {
    console.log(obj)

}

function checkForHuluWithShowtime(services) {
    return _.some(services, function (elem) {
        return elem.source == "hulu_with_showtime";
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

        if (elem.display_name == "Showtime Anytime"){
            return false
        }

        return true
    });
}

app.controller('ShowGridController', function ($scope, $rootScope, $q, $http, $timeout, PackageFactory, VIEW_WINDOWS, $compile, ShowDetailAnimate, $window) {

    var liveServices = ['sling', 'cbs', 'nbc', 'abc', 'thecw', 'showtime_subscription', 'hbo_now', 'showtime', 'fox'];
    var onDemandServices = ['hulu_plus', 'hulu_free', 'nbc', 'starz', 'showtime_subscription', 'crackle'];
    var bingeServices = ['netflix', 'amazon_prime', 'seeso', 'tubi_tv', 'starz', 'starz_tveverywhere', 'showtime_subscription'];
    var payPerServices = ['google_play', 'itunes', 'amazon_buy', 'youtube_purchase', 'vudu'];

    var openingDetail = false


    $scope.$watch(function () {
        return PackageFactory.getChosenShow();
    }, function () {


        $scope.cs = PackageFactory.getChosenShow();

        $scope.detailSources = (function () {

            if ($scope.cs.guidebox_data != undefined) {


                var x = _($scope.cs.channel)
                    .concat($scope.cs.guidebox_data.sources.web.episodes.all_sources, $scope.cs.guidebox_data.sources.ios.episodes.all_sources)
                    .map(function (elem) {

                        if (elem.guidebox_data != undefined) {
                            elem.source = elem.guidebox_data.short_name
                        }
                        return elem
                    }).map(function (elem) {
                        if (elem.source == 'hulu_free') {
                            elem.source = 'hulu_plus';
                            return elem
                        }

                        return elem;
                    })
                    .thru(function (services) {
                        debugger;
                        if (checkForHuluWithShowtime(services)) {
                            services = removeHuluIfShowtimeContent(services)
                        }

                        return services
                    })
                    .tap(interceptor)

                    .uniqBy('source')
                    .uniqBy(function (elem) {
                        if (elem.display_name) {
                            return elem.display_name

                        } else {
                            return elem.name
                        }
                    })
                    .tap(interceptor)
                    .groupBy(function (service) {
                        if (liveServices.includes(service.source)) {
                            return 'live'
                        }
                        if (service.is_on_sling || service.on_sling) {
                            return 'live'
                        }
                        if (onDemandServices.includes(service.source)) {
                            return 'on_demand'
                        }
                        if (bingeServices.includes(service.source)) {
                            return 'binge'
                        }
                        if (payPerServices.includes(service.source)) {
                            return 'pay_per_view'
                        }

                        return 'misc'
                    })
                    .thru(function (services) {
                        _.forEach(services.misc, function (service) {
                            if (service.source == 'hbo_now') {
                                services.live.push(service);
                                services.on_demand.push(service);
                                services.binge.push(service);
                            }
                            else if (service.source == 'showtime_subscription') {
                                services.on_demand.push(service);
                                service.binge.push(service);
                                service.live.push(service);
                            }
                            else if (service.source == 'starz') {
                                service.binge.push(service);
                                service.on_demand.push(service);
                            }
                        })

                        if (services.live) {
                            _.map(services.live, function (elem) {
                                // debugger

                                if (elem.is_over_the_air) {
                                    var elemCopy = _.cloneDeep(elem);
                                    elemCopy.name = 'OTA';
                                    delete elemCopy['id'];
                                    delete elemCopy['$$hashKey'];

                                    elemCopy.source = 'ota';

                                    services.live.push(elemCopy)
                                }

                                if (elem.hasOwnProperty('guidebox_data') && elem.guidebox_data.is_over_the_air) {
                                    var elemCopy = _.cloneDeep(elem);

                                    elemCopy.name = 'OTA';
                                    delete elemCopy['id'];
                                    delete elemCopy['$$hashKey'];

                                    elemCopy.source = 'ota';

                                    services.live.push(elemCopy)
                                }

                                if (elem.is_on_sling || elem.on_sling) {
                                    var elemCopy = _.cloneDeep(elem);

                                    elemCopy.name = 'Sling';
                                    delete elemCopy['id'];
                                    delete elemCopy['$$hashKey'];

                                    elemCopy.source = 'sling-tv.svg';

                                    services.live.push(elemCopy)


                                }

                                if (elem.source == "cbs") {


                                    if (!services.binge) {
                                        services.binge = []
                                    }
                                    services.binge.push(elem);

                                    if (!services.on_demand) {
                                        services.on_demand = []
                                    }
                                    services.on_demand.push(elem)
                                }

                                if (elem.source == "hbo_now") {

                                    if (!services.binge) {
                                        services.binge = []
                                    }
                                    services.binge.push(elem)

                                    if (!services.on_demand) {
                                        services.on_demand = []
                                    }

                                    services.on_demand.push(elem)
                                }
                                debugger;

                                if (elem.source == "showtime_subscription" || elem.source == "showtime") {

                                    if (!services.binge) {
                                        services.binge = []
                                    }
                                    services.binge.push(elem)

                                    if (!services.on_demand) {
                                        services.on_demand = []
                                    }

                                    services.on_demand.push(elem)
                                }

                                //

                                return elem

                            })
                        }

                        if ($scope.cs.on_netflix) {
                            if (!services.hasOwnProperty('binge')) {
                                services.binge = []

                            }

                            var netflix_channel = _.some(services.binge, ['source', 'netflix']);

                            if (!netflix_channel) {
                                services.binge.push({source: 'netflix'})
                            }
                        }


                        return services
                    })
                    .thru(function (services) {
                        var nbc = _.remove(services.live, function (item) {
                            return item.source == 'nbc';
                        })

                        if (nbc.length > 0) {
                            if (services.on_demand == undefined) {
                                services.on_demand = nbc
                            } else {

                                _.concat(services.on_demand, nbc)
                            }
                        }

                        if (!Object.keys) Object.prototype.keys = function (o) {
                            if (o !== Object(o))
                                throw new TypeError('Object.keys called on a non-object');
                            var k = [], p;
                            for (p in o) if (Object.prototype.hasOwnProperty.call(o, p)) k.push(p);
                            return k;
                        }

                        $scope.sortedServices = _.sortBy(Object.keys(services), function (elem) {
                            return elem.length
                        })

                        return services


                    })
                    .value();
                return x;
            }
        })()

    })


    //$rootScope.showDetailDirective = false;


    $scope.hello = 'clear package';

    $scope.clearContent = function () {
        // debugger;
        var pkg = PackageFactory.getPackage()

        pkg.data.content = []

        PackageFactory.setPackage(pkg)
    }
    function verifySelectedShowDetails() {
        var chosen = PackageFactory.getChosenShow()
        if (chosen.detail == undefined) {
            $http.get(chosen.url)
                .then(function (res) {
                    PackageFactory.setChosenShow(res.data)
                })

        }
    }

    $rootScope.showSearchView = true


    $('body').removeAttr('id');
    $('body').addClass('gradient-background');


    $scope.popularShows = null;

    $http.get('api/popular-shows')
        .success(function (data) {
            $scope.popularShows = data.results;
            return data
        })
        .then(function () {
            // ;
            //$('.popular-shows').slick();
        });


    $scope.delete = function (content) {
        _.remove($scope.package.content, content);
        $scope.savePackage()
        PackageFactory.updatePackageChannels($scope)
    }

    $scope.showDetail = _.debounce(function (item, ev, attrs) {

        $('body').css({'overflow': 'hidden'})
        $('#search-and-shows').addClass('no-scroll');


        if (openingDetail || !_.isEmpty($('.placeholder'))) {
            return
        }

        openingDetail = true;


        window.scrollTo(0, 0);
        // $('body').css('overflow', 'hidden');

        PackageFactory.setChosenShow(item);

        verifySelectedShowDetails()
        // debugger;
        var positionItem = ev.currentTarget,
            scaleItem = ev.target,
            container = document.getElementById('search-and-shows');
        $(scaleItem).attr('id', 'scaled-from')
        $(positionItem).attr('id', 'is-opened')
        //debugger;
        $rootScope.showSearchView = false;
        $rootScope.$broadcast('save_package');
        $('mobile-tabs').fadeOut();
        ShowDetailAnimate.loadContent(positionItem, scaleItem, container)
            .then(function (v) {
                return $timeout(function () {
                    //debugger;

                    // var detail = angular.element(document.createElement('show-detail'));

                    // $rootScope.showDetailDirective = true;
                    //debugger;

                }, 500)

            })
            .then(function (v) {
                $('show-detail').addClass('fade-in');
                var showDetailTop = $('show-detail').offset().top,
                    scrolledDistance = $('#search-and-shows').scrollTop()
                $('show-detail').css({top: 55 + scrolledDistance})

                // $('show-detail').
                //$('show-detail').removeClass('fade');
            })

        $('.show-grid').addClass('blur-and-fill');

        openingDetail = false


    }, 50);

    $scope.hideDetail = function (ev, attrs) {
        var positionItem = document.getElementById('is-opened'),
            scaleItem = document.getElementById('scaled-from'),
            container = document.getElementById('search-and-shows');
        $q.when($('show-detail').removeClass('fade-in'))
            .then(function () {


                $rootScope.showDetailDirective = false
            })
            .then(ShowDetailAnimate.hideContent.bind(null, positionItem, scaleItem, container))
            .then(function (v) {
                return $timeout(function () {
                    // debugger;

                    $rootScope.showSearchView = true;
                    $('.show-grid').removeClass('blur-and-fill');
                }, 500)
            })
            .then(function (v) {
                //debugger;
                // $('body').css('overflow', 'scroll');
                $(scaleItem).removeAttr('id')
                $(positionItem).removeAttr('id')

                $('#search-and-shows').removeClass('no-scroll');


                if ($window.innerWidth < 768) {
                    $('body').css({'overflow': 'scroll'})

                    $('mobile-tabs').fadeIn();
                }

            })


    };


    $scope.$watch(function () {
        return PackageFactory.getPackage()
    }, function () {
        $scope.package = PackageFactory.getPackage();
    });

    $scope.$watch(function () {
        return PackageFactory.getChosenShow()
    }, function () {
        $scope.cs = PackageFactory.getChosenShow();
        // $scope.getRatings = function () {
        //     $http.get($scope.cs.url + '/ratings')
        // }


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


});

app.controller('ModalController', function ($scope, http, $modal, $log, $rootScope) {


    //$scope.login = 'Click Here to Login'


    $scope.items = ['item1', 'item2', 'item3'];

    $rootScope.openLogInModal = function () {

        var modalInstance = $modal.open({
            animation: true,
            templateUrl: '/static/partials/modal/modal.html',
            controller: 'ModalInstanceController',
            size: 'sm',
            resolve: {
                items: function () {
                    return $scope.items;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selectedItem = selectedItem;


        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    }

    //if ($rootScope.currentStep == 3) {
    //    $rootScope.openLogInModal()
    //}
});

app.controller('ModalInstanceController', function ($scope, $rootScope, $modalInstance, items, $location, $cookies, http, growl) {

    $scope.socialLogin = true;


    //$scope.facebookAuth = function () {
    //
    //window.location = CONFIG.URL + $('#facebook_login').attr('href');
    //}
    //
    //$scope.instagramAuth = function () {
    //
    //window.location = CONFIG.URL + $('#instagram_login').attr('href');
    //}
    //
    //$scope.twitterAuth = function () {
    //
    // window.location = CONFIG.URL + $('#twitter_login').attr('href');
    //}


    $scope.login = function (credentials) {
        //credentials.next = "/api/";
        credentials.csrfmiddlewaretoken = $cookies.get('csrftoken');
        credentials.submit = "Log in";
        http.login(credentials)
            .then(function (data) {
                console.log(data);
                $rootScope.logged_in = true;
                $modalInstance.close();
                growl.success('Login Successful', {
                    onclose: function () {

                        window.location.reload()
                    },
                    ttl : 1000,
                    disableCountDown: true
                })

            })
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
 * Created by Nem on 10/27/15.
 */

app.controller('AccordionController', function ($scope) {


    $scope.viewingWindows = [
        {
            viewType: "onDemand",
            description: "I want to watch this show with and <strong> On Demand Subscription. </strong>",
            parenthetical: "(day/+ after live airing).",
            dropdown: true,
        },
        {
            viewType: "live",
            description: "I want to watch this show <strong>Live Over the Air.</strong>",
            parenthetical: "",
            dropdown: false,
        },
        {
            viewType: "fullseason",
            description: " I want to watch this show using a <strong>Full Season Subscription.</strong>",
            parenthetical: "(season behind).",
            dropdown: true,
        },
        {
            viewType: "I want to <strong>Pay Per Episode</strong> to watch this show.",
            description: "",
            parenthetical: "(day/+ after live airing).",
            dropdown: false,
        },
        //{
        //    viewType: "",
        //    description: "",
        //    parenthetical: "",
        //    dropdown: false,
        //}
    ]
});

app.controller('StepOneController', function ($scope, $http, $timeout, PackageFactory, VIEW_WINDOWS) {

    // $scope.clearContent = function () {
    //     var pkg = PackageFactory.getPackage()
    //
    //     pkg.content = []
    //
    //     PackageFactory.setPackage(pkg)
    // }

    $scope.showTotal = function (content) {


        var total = 0

        var chans = _.map(VIEW_WINDOWS, function (w) {


            if (content.viewingWindows !== undefined && content.viewingWindows[w.type] !== undefined) {
                var window = content.viewingWindows[w.type];
                if (window.channel !== undefined) {

                    return window.channel;

                }
            }
        })

        chans = _.uniq(_.compact(chans), function (c) {
            if (c.service !== undefined) {
                return c.service
            }
            return c.source
        })
        var prices = _.map(chans, function (elem) {
            return elem.price
        })

        total = _.reduce(prices, function (total, n) {
            return total + n;
        })


        //_.forEach($scope.directiveVW, function (window) {
        //
        //    if (content.viewingWindows !== undefined && content.viewingWindows[window.type] !== undefined) {
        //
        //        var window = content.viewingWindows[window.type];
        //        if (window.channel !== undefined && window.channel.price !== undefined) {
        //
        //            total += window.channel.price;
        //
        //        }
        //
        //    }
        //})

        content.totalCost = total


        total = _.round(total, 2)

        return total


    }


    $scope.totalServiceCost = PackageFactory.totalServiceCost;

    //$scope.contentTotal = function () {
    //
    //
    //    var t = 0
    //
    //    var package = $scope.package;
    //    if (package.content.length > 0) {
    //
    //         t = _.map(package.providers, function(elem){
    //            return elem.price;
    //        })
    //
    //        t = _.compact(t);
    //
    //        t = _.reduce(t, function(total, n){
    //            return total + n
    //        })
    //    }
    //
    //    t = _.round(t, 2)
    //
    //    return t
    //
    //
    //}


    $scope.directiveVW = [

        {
            type: 'live',
            headerText: 'Live Over the Air.',
            toolTip: 'get your content as soon as it dropped.'


        },
        {
            type: 'onDemand',
            headerText: 'On Demand Subscription.',
            toolTip: 'day/+ after live airing.'


        },
        {
            type: 'fullseason',
            headerText: 'Binge Watch Full Seasons',
            toolTip: 'season behind.'


        },
        {
            type: 'alacarte',
            headerText: 'Watch Current Season or Episodes for a fee',
            toolTip: 'day/+ after live airing with no committment'


        },


    ]

    $scope.popularShows = null;

    $http.get('api/popular-shows')
        .success(function (data) {
            $scope.popularShows = data.results;
            return data
        })
        .then(function () {
            // ;
            //$('.popular-shows').slick();
        });


    $scope.package = PackageFactory.getPackage();

    $scope.onDemandLength = function (c) {

        return _.filter(c, function (n) {
                return n.name == 'Netflix'
            }).length > 0
    }

    $scope.delete = function (content) {
        _.remove($scope.package.content, content);
        $scope.savePackage()
        PackageFactory.updatePackageChannels($scope)
    }

    $scope.prePopulateWindowProvider = function (content, prop) {
        var array = _.filter(content.content_provider, function (prov) {
            return _.includes(_.map($scope.package.providers, function (elem) {
                return elem.name
            }), prov.name)
        })

        if (prop == 'onDemand') {

            _.remove(array, function (n) {
                return n.name == 'Netflix';
            })
        } else if (prop == 'fullSeason') {

            _.remove(array, function (n) {
                return n.name != 'Netflix';
            })
        }

        return _.isEmpty(array) ? false : _.first(array).name;

    }


    $scope.$watch(function () {
        return PackageFactory.getPackage()
    }, function () {
        $scope.package = PackageFactory.getPackage();
    })


    $scope.savePackage = function () {
        PackageFactory.setPackage($scope.package)
    }

    //$scope.$watchCollection('package.content', function () {
    //
    //    PackageFactory.setPackage($scope.package)
    //})
});
app.controller('StepThreeController', function ($scope, PackageFactory) {

    //$scope.package = PackageFactory.getPackage();
    //$scope.hardwareTotal = PackageFactory.totalHardwareCost();
    //$scope.servicesTotal = PackageFactory.totalServiceCost();
    ////$scope.packageTotal = getPackageTotal();
    //$scope.$addProviderUrls = function () {
    //    for (var i = 0; i < $scope.package.providers.length; i++) {
    //        var providerName = $scope.package.providers[i].display_name;
    //        switch (providerName) {
    //            case "Yahoo Screen Over the Air":
    //                $scope.package.providers[i].home_url = "https://www.yahoo.com/tv/tagged/originals";
    //                break;
    //            case "Netflix":
    //                $scope.package.providers[i].home_url = "https://www.netflix.com/";
    //                break;
    //            case "HBO NOW":
    //                $scope.package.providers[i].home_url = "https://order.hbonow.com/";
    //                break;
    //            case "Sling TV (ESPN)":
    //                $scope.package.providers[i].home_url = "http://www.sling.com/";
    //                break;
    //            case "Sling TV (CNN)":
    //                $scope.package.providers[i].home_url = "http://www.sling.com/";
    //                break;
    //            case "Sling TV (ABC Family)":
    //                $scope.package.providers[i].home_url = "http://www.sling.com/";
    //                break;
    //            case "Slin" +
    //            "g TV (AMC)":
    //                $scope.package.providers[i].home_url = "http://www.sling.com/";
    //                break;
    //            case "Sling TV (TNT)":
    //                $scope.package.providers[i].home_url = "http://www.sling.com/";
    //                break;
    //            case "Sling TV (TBS)":
    //                $scope.package.providers[i].home_url = "http://www.sling.com/";
    //                break;
    //            case "Sling TV (The CW)":
    //                $scope.package.providers[i].home_url = "http://www.sling.com/";
    //                break;
    //            case "Sling TV (Travel)":
    //                $scope.package.providers[i].home_url = "http://www.sling.com/";
    //                break;
    //            case "Amazon Prime":
    //                $scope.package.providers[i].home_url = "http://www.amazon.com/gp/prime/pipeline/prime_gifting_landing/?ref_=assoc_tag_ph_1415183446617&ie=UTF8&camp=1789&creative=9325&linkCode=pf4&tag=strea03d-20&linkId=UBNDLZEPEGPD6JDJ";
    //                break;
    //            case "Amazon":
    //                $scope.package.providers[i].home_url = "http://www.amazon.com/gp/prime/pipeline/prime_gifting_landing/?ref_=assoc_tag_ph_1415183446617&ie=UTF8&camp=1789&creative=9325&linkCode=pf4&tag=strea03d-20&linkId=UBNDLZEPEGPD6JDJ";
    //                break;
    //            case "Showtime":
    //                $scope.package.providers[i].home_url = "http://www.sho.com/sho/showtime-anytime";
    //                break;
    //            case "Showtime FREEview Over the Air":
    //                $scope.package.providers[i].home_url = "http://www.sho.com/sho/free-preview/1";
    //                break;
    //            case "Hulu":
    //                $scope.package.providers[i].home_url = "http://www.hulu.com/welcome";
    //                break;
    //            case "Hulu with Showtime":
    //                $scope.package.providers[i].home_url = "http://www.hulu.com/getshowtime";
    //                break;
    //            case "CBS All Access":
    //                $scope.package.providers[i].home_url = "http://www.cbs.com/all-access/";
    //                break;
    //            case "VUDU":
    //                $scope.package.providers[i].home_url = "http://www.vudu.com/";
    //                break;
    //            case "Google Play":
    //                $scope.package.providers[i].home_url = "https://play.google.com/store/movies?hl=en";
    //                break;
    //            case "iTunes":
    //                $scope.package.providers[i].home_url = "https://www.apple.com/itunes/download/";
    //                break;
    //            case "YouTube":
    //                $scope.package.providers[i].home_url = "https://www.youtube.com/user/YouTubeShowsUS/featured";
    //                break;
    //            case "NBC Over the Air":
    //                $scope.package.providers[i].home_url = "http://www.nbc.com/schedule";
    //                break;
    //            case "CBS Over the Air":
    //                $scope.package.providers[i].home_url = "http://www.cbs.com/schedule/";
    //                break;
    //            case "FOX Over the Air":
    //                $scope.package.providers[i].home_url = "http://www.fox.com/schedule";
    //                break;
    //            case "ABC Over the Air":
    //                $scope.package.providers[i].home_url = "http://abc.go.com/schedule";
    //                break;
    //            case "The CW Over the Air":
    //                $scope.package.providers[i].home_url = "http://www.cwtv.com/schedule/";
    //                break;
    //            default:
    //                $scope.package.providers[i].home_url = "http://www.guidebox.com/";
    //                break;
    //        }
    //    }
    //};
    //$scope.$watch(function () {
    //    return PackageFactory.getPackage()
    //}, function () {
    //    $scope.package = PackageFactory.getPackage();
    //    $scope.$addProviderUrls();
    //});


})

/**
 * Created by Nem on 11/25/15.
 */
app.controller('StepTwoController', function ($scope, http, PackageFactory) {

    $scope.package = PackageFactory.getPackage();
    var hardwareColl = $scope.package.hardware;

    http.getHardware()
        .then(function (data) {
            $scope.hardware = data.results;
        });

    $scope.itemSelected = function (item) {
        var hardwareColl = $scope.package.hardware;
        var x = _.some(hardwareColl, 'url', item.url);
        return x
    };


    $scope.addRemoveHardware = function (item) {
        if (item.hasOwnProperty('selected')) {
            delete item['selected']
        }


        var hardwareColl = $scope.package.hardware;
        if (_.some(hardwareColl, 'url', item.url)) {
            _.remove(hardwareColl, function(n){

                return n.url == item.url

            });

        } else {
            //item.selected = true;
            hardwareColl.push(item);
        }

        PackageFactory.setPackage($scope.package)
    };

    $scope.$watch(function () {
        return PackageFactory.getPackage()
    }, function () {
        $scope.package = PackageFactory.getPackage();
    });


});