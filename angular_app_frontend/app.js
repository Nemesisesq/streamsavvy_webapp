/**
 * Created by Nem on 6/12/15.
 */
var app = angular.module('myApp', ["ui.router", "ngCookies", "ui.bootstrap", "ngAnimate", 'slick'])
    .constant('CONFIG', {
        'URL': location.origin
    })
    .constant('BANNED_CHANNELS', ['HBO Go',
        'Xfinity',
        'FX',
        'AMC',
        'TBS',
        'TNT',
        'ABC',
        'Showtime Anytime',
        'USA',
        'STARZ Play']);

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