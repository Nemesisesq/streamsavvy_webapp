/**
 * Created by Nem on 6/12/15.
 */
var app = angular.module('myApp', ["ui.router", "ngCookies", "ui.bootstrap", "ngAnimate"]);

app.config(function ($httpProvider, $stateProvider, $urlRouterProvider, $locationProvider) {
    //$locationProvider.html5Mode({
    //    enabled: false,
    //    requireBase: false
    //}).hashPrefix('');

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
            views: {
                'home': {
                    templateUrl: 'static/partials/home.html'
                },
                'footer': {
                    templateUrl: 'static/partials/footer.html'
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
            templateUrl: "/static/partials/journey-one.html"
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
                    controller: 'JourneyOneController'
                },
                'footer': {
                    templateUrl: 'static/partials/footer.html'
                }
            }
        })
        .state('journey-one.step-two', {
            url: '/getting-started/step/2',
            data :{
                step :2
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
                    controller: 'JourneyOneController'
                },
                'footer': {
                    templateUrl: 'static/partials/footer.html'
                }
            }
        })
        .state('journey-one.step-three', {
            url: '/getting-started/step/3',
            data :{
                step :3
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
                    templateUrl: 'static/partials/step-three/step-three.html',
                    controller: 'JourneyOneController'
                },
                'footer': {
                    templateUrl: 'static/partials/footer.html'
                }
            }
        })
        .state('journey-one.step-four', {
            url: '/getting-started/step/4',
            data :{
                step :4
            },
            views: {
                'navigation': {
                    templateUrl: "/static/partials/navigation.html",
                    controller: 'navigation'
                },
                'modal': {
                    templateUrl : '/static/partials/modal/modalContainer.html',
                    controller : 'Step4ModalController'
                },
                'progress': {
                    templateUrl: 'static/partials/progress.html',
                    controller: 'ProgressController'
                },
                'step-two': {
                    templateUrl: 'static/partials/step-four/step-four.html',
                    controller: 'JourneyOneController'
                },
                'footer': {
                    templateUrl: 'static/partials/footer.html'
                }
            }
        });

    $urlRouterProvider.otherwise("/")
});