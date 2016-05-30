/**
 * Created by Nem on 6/12/15.
 */
var app = angular.module('myApp', ["ui.router", "ngCookies", "ui.bootstrap", "ngAnimate", 'slick',"angular-send-feedback", 'angular-growl'])
    .constant('CONFIG', {
        'URL': location.origin
    })
    .constant('VIEW_WINDOWS', [
        {type: 'live', headerText: 'Live Over the Air.', toolTip: 'get your content as soon as it dropped.'},
        {type: 'onDemand', headerText: 'On Demand Subscription.', toolTip: 'day/+ after live airing.'},
        {type: 'fullseason', headerText: 'Binge Watch Full Seasons', toolTip: 'season behind.'},
        {type: 'alacarte', headerText: 'Watch Current Season or Episodes for a fee', toolTip: 'day/+ after live airing with no committment'}
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
        {name: 'Pay Per View', price: 0.00, description: 'If a subscription service is not for you, these apps allow you to purchase a show at a time.' +
        ' Or you can purchase an entire season once it has finished airing.',
        subscriptionLink: 'https://play.google.com/store/movies/category/TV?hl=en'},
        {name: 'netflix', price: 9.99, description: 'Best described as a "binge watch" service. ' +
        'Typically, full seasons are launched all at once and a season behind what is currently showing on TV. Netflix also offers original programming now.' +
        ' This is also released a full season at a time.',
        subscriptionLink: 'https://www.netflix.com/'},
        {name: 'hulu_plus', price: 7.99, description: 'An on-demand service (think DVR) that offers shows from certain networks (ABC, limited NBC, FOX, CW, etc)' +
        ' a day after they air. Subscription prices depend on whether or not you purchase an ad-free package or not.',
        subscriptionLink: 'http://www.hulu.com/start'},
        {name: 'amazon_prime', price: 8.25, description:'An on-demand and binge combo. Some programming is offered in full-season format and some is on-demand after it airs live.' +
        ' Some shows are free while others are not. Amazon is also building a strong offering of original shows. ' +
        'It comes free with an annual Prime membership.',
        subscriptionLink:'http://www.amazon.com/gp/video/getstarted'},
        {name: 'hbo_now', price: 14.99, description: 'Watch HBO shows the moment they air, on-demand, or binge. They also offer all back seasons of episodes.',
            subscriptionLink: 'https://order.hbonow.com/'},
        {name: 'sling-tv', price: 20.00,
            description: 'Live streaming service that makes shows available as they simultaneously air on cable.' +
        ' The main Sling package gives you a "skinny bundle" of some of the most popular cable channels (ESPN, CNN, HGTV, etc.) ' +
        'with the option to add extra mini packages on top of your main Sling package.',
            subscriptionLink: 'https://www.sling.com/'},
        {name: 'Over The Air', price: 0.00, description:'Watching over the air (OTA) is like watching live television.' +
        ' There is no monthly cost, but a digital antenna is needed to pull in the signal.',
            subscriptionLink:'http://amzn.com/B00X4RA74A'},
        {name: 'showtime', price: 10.99, description:'Watch Showtime shows the moment they air, on-demand, or binge. They also offer all back seasons of episodes.',
        subscriptionLink: 'http://www.sho.com/order?source=acq_shoanytime_about'},
        {name: 'cbs', price: 5.99, description:'New CBS episodes on demand the day after they air and almost all past seasons of CBS shows for binging.' +
        ' In select markets, you can stream CBS live.',
        subscriptionLink: 'https://www.cbs.com/all-access/'},
        {name: 'nbc', price: 0.00, description:'A DVR-like, on-demand app that offers shows from NBC a day after they air. You do have to watch commercials, but it\'s free.',
        subscriptionLink: 'http://www.nbc.com/video'},
        {name: 'thecw', price: 0.00, description:'An on-demand and binge combo for classic CW shows and some new original content.',
        subscriptionLink: 'http://www.cwseed.com/'},
        {name: 'PBS App', price: 0.00, description:'A streaming App for PBS.', subscriptionLink: 'http://www.pbs.org/video/'},
        {name: 'starz', price:8.99, description: 'Download and watch past episodes and seasons of your favorite Starz shows. Unlike HBO Now and Showtime,' +
        ' you can\'t watch shows as they air. They do let you download shows to watch at a later time when you may not have access to wifi.',
        subscriptionLink: 'https://www.starz.com/buy-starz/?TID='},
        {name: 'Seeso', price: 3.99, description: 'NBC\'s binge watching app for classic and hard-to-find comedy as well as original content. No commercials.',
        subscriptionLink: 'https://www.seeso.com/'},
        {name: 'tubi_tv', price: 0.00, description: 'Free binge watching app for unique and classic content.',
        subscriptionLink: 'https://tubitv.com/'}

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

app.config(['growlProvider','$httpProvider', function(growlProvider, $httpProvider){
    growlProvider.globalReversedOrder(true);
    growlProvider.globalTimeToLive(2000);
    growlProvider.globalDisableCloseButton(true)
    $httpProvider.interceptors.push(growlProvider.serverMessagesInterceptor)

}]);

app.config(function ($httpProvider, $stateProvider, $urlRouterProvider) {


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
            template : 'Hello world'
        })
        .state('journey-one', {
            abstract: true,
            templateUrl: "/static/partials/journey-one.html",
            data: {hmdcActive: true}
        })
        .state('dash', {
            templateUrl: '/static/partials/dashboard.html',
            abstract: true
        })

        .state('check',{
            templateUrl: '/static/partials/checkout.html',
            abstract: true
        })
        .state('check.out',{
            url:'/checkout',
            data: {
                checkout: true
            },
            views:{
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
            }
        })
        .state('journey-one.step-one', {
            url: '/getting-started/step/1',
            data: {
                step: 1
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
                'step-one': {
                    templateUrl: 'static/partials/step-one/step-one.html',
                    controller: 'StepOneController'
                },
                'footer': {
                    templateUrl: 'static/partials/footer.html'
                }
            }
        })
        //.state('journey-one.step-two', {
        //    url: '/getting-started/step/2',
        //    data: {
        //        step: 2
        //    },
        //    views: {
        //        'navigation': {
        //            templateUrl: "/static/partials/navigation.html",
        //            controller: 'navigation'
        //        },
        //        'progress': {
        //            templateUrl: 'static/partials/progress.html',
        //            controller: 'ProgressController'
        //        },
        //        'step-two': {
        //            templateUrl: 'static/partials/step-two/step-two.html',
        //            controller: 'JourneyOneController'
        //        },
        //        'footer': {
        //            templateUrl: 'static/partials/footer.html'
        //        }
        //    }
        //})

        .state('journey-one.step-two', {
            url: '/getting-started/step/2',
            data: {
                step: 2
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
                'step-two': {
                    templateUrl: 'static/partials/step-two/step-two.html',
                    controller: 'StepTwoController'
                },
                'footer': {
                    templateUrl: 'static/partials/footer.html'
                }
            }
        })
        .state('journey-one.step-three', {
            url: '/getting-started/step/3',
            data: {
                step: 3
            },
            views: {
                'navigation': {
                    templateUrl: "/static/partials/navigation.html",
                    controller: 'navigation'
                },
                'modal': {
                    templateUrl: '/static/partials/modal/modalContainer.html',
                    controller: 'ModalController'
                },
                'progress': {
                    templateUrl: 'static/partials/progress.html',
                    controller: 'ProgressController'
                },
                'step-three': {
                    templateUrl: 'static/partials/step-three/step-three.html',
                    controller: 'StepThreeController'
                },
                'footer': {
                    templateUrl: 'static/partials/footer.html'
                }
            }
        });

    $urlRouterProvider.otherwise("/")


});

app.controller('HomeController', function () {
    $('body').attr('id','background')
})