/**
 * Created by Nem on 6/12/15.
 */
var app = angular.module('myApp', ["ui.router", "ngCookies"]);

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
                    controller: 'journeyOneController'
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
        });

    $urlRouterProvider.otherwise("/")
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
                    debugger;
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
                url: "login/",
                data:credentials

            })
                .success(function (data) {
                    deffered.resolve(data)
                })
                .error(function (e, code) {
                    $log.error(e, code)
                });
            return deffered.promise;
        }


    }
});
/**
 * Created by Nem on 6/27/15.
 */
app.service('PackageService', ['http','_', function (http, _) {


    var pservice = this;
    pservice.p = {};

    pservice.content = [];
    pservice.searchResults = [];

    pservice.getPackage = function(){
         var result = pservice.load();
        console.log(result);
        debugger;

        return result;
    }

    pservice.load = function () {
        http.getPackage()
            .then(function (pkg) {
                debugger;
                pservice.p = pkg;
                return pkg;
            })

    };

    pservice.removeShow = function (show) {
        http.getRestPackage()
            .then(function (p) {
                _.remove(p.content, function (elem) {
                    debugger;
                    var elemArray = elem.split('/');
                    var elemId = elemArray[elemArray.length - 2];
                    return elemId == show.id;
                });


                http.putPackage(p)
                    .then(function () {
                        p.load();
                    })
            })
    };

    pservice.addToSelectedShows = function (suggestion) {

        var newPackage;

        http.getRestPackage()
            .then(function (pkg) {
                newPackage = pkg;
                newPackage.content.push(suggestion.url);

                http.putPackage(newPackage)
                    .then(function (result) {

                        console.log(result);
                        pservice.load()

                    })
            })
    };

    debugger;
    pservice.load();

}]);



app.factory('_', function($window){
    return $window._;
})
app.controller('chart', function ($scope, http, _, $rootScope) {
    $scope.showArray = [];
    $scope.providers = [];
    $scope.shows = [];
    $scope.providerList = [
        {name: 'netflix'},
        {name: 'hulu'},
        {name: 'sling'},
        {name: 'hbo'}

    ];


    $scope.mockShows = [
        {name: 'Orange is the new black', showProviders: [true, false, true, false]},
        {name: 'Airwolf', showProviders: [true, true, false, false]},
        {name: 'Bleach', showProviders: [false, true, false, false]},
        {name: 'Game of Thrones', showProviders: [false, false, true, false]},
        {name: 'Spaceman', showProviders: [true, false, false, false]},
        {name: 'Prison Break', showProviders: [true, true, true, false]},
        //{name: 'Followers', showProviders: [true, false, true, false]}
    ];

    $scope.removeShow = function (show) {
        http.getRestPackage()
            .then(function (package) {
                _.remove(package.content, function (elem) {
                    debugger;
                    var elemArray = elem.split('/');
                    var elemId = elemArray[elemArray.length - 2];
                    return elemId == show.id;
                });

                debugger;
                http.putPackage(package)
                    .then(function (result) {
                        $rootScope.load()
                        $scope.$apply()
                    })
            })
    }


    var loadPackage = function () {
            return http
                .getPackage()
                .then(function (package) {
                    $scope.package = package;
                    return package;
                })
        },
        loadContentHeaderObjects = function () {
            $scope.providers = [];
            _.forEach($scope.package.content, function (show) {
                _.forEach(show.content_provider, function (provider) {
                    if (!_.includes($scope.providers, provider.name)) {

                        $scope.providers.push(provider.name)
                    }
                })

            })

            //TODO marked for Deletion
            //$scope.package.content.content_provder.forEach(function (provider) {
            //    deffered.resolve(
            //        _.contains($scope.providers, provider) || $scope.providers.push(provider)
            //    )
            //})

            //return deffered.promise
        },
        loadContentRowObjects = function () {

            $scope.shows = _.map($scope.package.content, function (content) {
                var obj = {};
                debugger;
                obj.title = content.title;
                obj.id = content.id;
                obj.providerCellValues = _.map($scope.providers, function (elem) {
                    var providerObj = _.map(content.content_provider, function (prov) {
                        return prov.name
                    });

                    return _.includes(providerObj, elem)
                });

                return obj;
            })

        };


    $rootScope.load = function () {

        loadPackage()
        .then(loadContentHeaderObjects)
        .then(loadContentRowObjects);
    };

    $rootScope.load()
});
/**
 * Created by chirag on 8/3/15.
 */
app.controller('home', function ($scope, $http, http, PackageService, $rootScope) {



});

app.controller('JourneyOneController', function ($scope, $rootScope, http, _, $location, PackageService) {

    $scope.contentList = {};

    $rootScope.loadPackage = function () {
        http.getPackage()
            .then(function (data) {
                $scope.contentList = data.content;
            });
    };

    $scope.removeShow = function (show) {
        debugger;
        http.getRestPackage()
            .then(function (p) {
                _.remove(p.content, function (elem) {
                    debugger;
                    var elemArray = elem.split('/');
                    var elemId = elemArray[elemArray.length - 2];
                    return elemId == show.id;
                });


                http.putPackage(p)
                    .then(function () {
                        debugger;
                        $rootScope.loadPackage();
                    })
            })
    };



    $rootScope.loadPackage();


});

/**
 * Created by Nem on 6/28/15.
 */
app.controller('navigation', function ($scope, http, $http, $cookies, $location) {
    $scope.logged_in = false;

    $scope.login = function (credentials) {
        //credentials.next = "/api/";
        debugger;
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
 * Created by Nem on 7/18/15.
 */
app.controller('search', function ($scope, $http, http, PackageService, $rootScope) {

    $scope.suggestions = [];
    $scope.selectedShows = PackageService.selectedShows;
    $scope.selectedIndex = -1;

    $scope.search = function () {
        if ($scope.searchText) {
            $scope.suggestions = [];
            $http.get('/api/search?q=' + $scope.searchText.title)
                .success(function (data) {
                    PackageService.searchResults = data.results;

                    $scope.suggestions = data.results;

                    $scope.selectedIndex = -1
                });
        } else {
            $scope.suggestions = [];
        }
    };

    $scope.addToSelectedShows = function (suggestion) {
        var newPackage;

        http.getRestPackage()
            .then(function (pkg) {
                newPackage = pkg;
                newPackage.content.push(suggestion.url);

                http.putPackage(newPackage)
                    .then(function (result) {

                        console.log(result);
                        $rootScope.loadPackage()

                    })
            });

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
            $scope.addToSelectedShows($scope.suggestions[$scope.selectedIndex]);
        }

    };


    $scope.$watch('selectedIndex', function (val) {
        if (val !== -1) {
            $scope.searchText = $scope.suggestions[$scope.selectedIndex]
        }
    });


});

app.controller('ProgressController', function ($scope, $state, $rootScope) {
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
            return 'make-active'

        } else if (stateStep == step) {
            return 'make-active'

        } else if (stateStep == step) {
            return 'make-active'


        } else if (stateStep == step) {
            return 'make-active'
        }

        if (stateStep - 1 == step) {
            return 'make-inactive'
        }

        return 'inactive'
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
});