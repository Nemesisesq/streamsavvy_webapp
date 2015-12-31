/**
 * Created by Nem on 6/12/15.
 */
var app = angular.module('myApp', ["ui.router", "ngCookies", "ui.bootstrap", "ngAnimate", 'slick',"angular-send-feedback"])
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
        'MSNBC',
        'HBO',
        'Dish',
        'DirecTV',
        'AT&T U-verse',
        'FX',
        'Xfinity',
        'Showtime Anytime',
        'STARZ Play'])

    .constant('SERVICE_PRICE_LIST', [
        {name: 'Netflix', price: 9.99},
        {name: 'Hulu', price: 7.99},
        {name: 'Amazon Prime', price: 8.25},
        {name: 'HBO Now', price: 14.99},
        {name: 'SlingTV', price: 20.00},
        {name: 'Over The Air', price: 0.00},
        {name: 'Showtime', price: 10.99},
        {name: 'CBS All Access', price: 5.99},
        {name: 'NBC App', price: 0.00},
        {name: 'CW Seed', price: 0.00},
        {name: 'PBS App', price: 0.00}
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
        'Bloomberg Television']);

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
                    templateUrl: 'static/partials/home.html'
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
            url: '/explain/still-confused/1',
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
        .state('nav.index', {
            url: '/search',
            views: {
                //'test' :{
                //    templateUrl : 'static/partials/test-dashboard.html',
                //    controller : 'testController'
                //},
                'search': {
                    templateUrl: 'static/partials/search.html',
                    controller: 'search'
                },
                'chart': {
                    templateUrl: 'static/partials/coverage-chart.html',
                    controller: 'chart'
                }
            }
        })
        .state('journey-one', {
            abstract: true,
            templateUrl: "/static/partials/journey-one.html",
            data: {hmdcActive: true}
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