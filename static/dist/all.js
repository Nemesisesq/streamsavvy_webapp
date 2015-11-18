/**
 * Created by Nem on 6/12/15.
 */
var app = angular.module('myApp', ["ui.router", "ngCookies", "ui.bootstrap", "ngAnimate", 'slick']);

app.constant('CONFIG', {
    'URL': location.origin
})

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
                    controller: 'JourneyOneController'
                },
                'footer': {
                    templateUrl: 'static/partials/footer.html'
                }
            }
        })
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
                    controller: 'JourneyOneController'
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
            data: {
                step: 4
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
 * Created by Nem on 6/27/15.
 */
app.service('PackageService', ['http','_', function (http, _) {


    //var pservice = this;
    //pservice.p = {};
    //
    //pservice.content = [];
    //pservice.searchResults = [];
    //
    //pservice.getPackage = function(){
    //     var result = pservice.load();
    //    console.log(result);
    //
    //
    //    return result;
    //}
    //
    //pservice.load = function () {
    //    http.getPackage()
    //        .then(function (pkg) {
    //
    //            pservice.p = pkg;
    //            return pkg;
    //        })
    //
    //};
    //
    //pservice.removeShow = function (show) {
    //    http.getRestPackage()
    //        .then(function (p) {
    //            _.remove(p.content, function (elem) {
    //
    //                var elemArray = elem.split('/');
    //                var elemId = elemArray[elemArray.length - 2];
    //                return elemId == show.id;
    //            });
    //
    //
    //            http.putPackage(p)
    //                .then(function () {
    //                    p.load();
    //                })
    //        })
    //};
    //
    //pservice.addToSelectedShows = function (suggestion) {
    //
    //    var newPackage;
    //
    //    http.getRestPackage()
    //        .then(function (pkg) {
    //            newPackage = pkg;
    //            newPackage.content.push(suggestion.url);
    //
    //            http.putPackage(newPackage)
    //                .then(function (result) {
    //
    //                    console.log(result);
    //                    pservice.load()
    //
    //                })
    //        })
    //};
    //
    //
    //pservice.load();

}]);



app.factory('_', function($window){
    return $window._;
})

/**
 * Created by Nem on 10/7/15.
 */

/**
 * Created by chirag on 8/3/15.
 */
app.controller('home', function ($scope, $http, http, $cookies, $location) {
    $scope.logged_in = false;

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

app.controller('JourneyOneController', function ($scope, $rootScope, http, _) {
    $scope.hardware = [];
    $scope.package = [];
    $scope.packageList = {};
    $scope.providerObj = [];

    $scope.providers = [];
    $scope.rows = [];

    $scope.cost = {
        services: 0,
        hardware: 0
    };

    $scope.cableCost = 75.00;

    $scope.savings = $scope.cableCost - $scope.cost.services;


    $rootScope.loadPackage = function () {
        return http.getPackage()
            .then(function (data) {
                $scope.package = data;
                $scope.packageList = data.content;
                //$rootScope.step3ButtonMessage = $scope.package.hardware.length ? 'Right On! Time to Review.' : 'Sorry Partner You Need Some Hardware';
                $rootScope.step2ButtonMessage = $scope.package.providers.length ? 'Time to pick out the Hardware' : 'You still need to select a service';
                return data
            });
    };

    $scope.removeShow = function (show) {
        http.getRestPackage()
            .then(function (p) {
                _.remove(p.content, function (elem) {

                    return elem == show.url;
                });


                http.putPackage(p)
                    .then(function () {
                        $rootScope.loadPackage();

                    })
            })
    };


    var loadProviders = function () {
        $scope.providers = [];
        _.forEach($scope.packageList, function (show) {
            _.forEach(show.content_provider, function (provider) {
                if (!_.includes($scope.providers, provider.name)) {

                    $scope.providers.push(provider.name);
                    $scope.providerObj.push(provider);
                }
            })

        })
    };

    var loadHardware = function () {
        http.getHardware()
            .then(function (hware) {

                var userHardwareUrls = _.map($scope.package.hardware, function (item) {
                    return item.url

                });

                $scope.hardware = _.map(hware.results, function (item) {
                    if (_.includes(userHardwareUrls, item.url)) {
                        item.selected = true;
                        return item
                    } else {
                        item.selected = false;
                        return item
                    }
                })


            })
    };
    var loadProviderContentHash = function () {

        var rows = _.map($scope.providers, function (provider) {
            var prov = _.find($scope.providerObj, function (obj) {
                return obj.name == provider;
            });
            var obj = {
                service: prov,
                content: []
            };


            obj.content = _.filter($scope.packageList, function (c) {

                var cProviders = _.map(c.content_provider, function (content_provider) {
                    return content_provider.name
                });


                return _.includes(cProviders, provider)
            });


            var selectedProviders = _.map($scope.package.providers, function (pp) {
                return pp.name

            });

            obj.selected = _.includes(selectedProviders, provider);


            return obj

        });

        $scope.rows = _.filter(rows, function (obj) {
            return _.isEqual(obj.service.channel_type, "online")
        });

        var selectedShows = _.flatten(
            _.map(rows, function (row) {
                if (row.selected) {
                    return row.content
                } else {
                    return []
                }
            })
        );


        $scope.rows = _.map($scope.rows, function (row) {
            if (!row.selected) {
                row.content = _.filter(row.content, function (show) {
                    return !_.includes(selectedShows, show)
                });
            }

            return row;
        });

        $scope.rows = _.sortByAll($scope.rows, ['selected', 'content'], _.values).reverse();


        return $scope.rows

    };


    var calculateTotalCost = function () {
        $scope.cost.services = 0;
        _.each($scope.package.providers, function (p) {
            $scope.cost.services += p.retail_cost;
        });

        $scope.savings = $scope.cableCost - $scope.cost.services;


    }

    $scope.toggleService = function (row) {
        http.getRestPackage()
            .then(function (p) {
                if (!row.selected) {
                    p.providers.push(row.service.url);

                    http.putPackage(p)
                        .then(function (d) {
                            console.log(d);
                            $rootScope.load()
                        })

                } else {
                    _.remove(p.providers, function (elem) {
                        return elem == row.service.url
                    })

                    http.putPackage(p)
                        .then(function (d) {
                            console.log(d);
                            $rootScope.load()
                        })

                }


            })
    }

    $rootScope.load = function () {

        $rootScope.loadPackage()
            .then(loadProviders)
            .then(loadHardware)
            .then(loadProviderContentHash)
            .then(calculateTotalCost);
    };

    $rootScope.load()

});

/**
 * Created by Nem on 6/28/15.
 */
app.controller('navigation', function ($scope, http, $http, $cookies, $location, $state) {
    $scope.isHomePage = $state.current.data.isHomePage;
    $scope.logged_in = false;
    $scope.hmdc = $state.current.data.hmdcActive;

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
app.controller('ProgressController', function ($scope, $state, $rootScope, $location) {
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

        if($scope.stateStep > stateStep)
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
});
/**
 * Created by Nem on 7/18/15.
 */
app.controller('search', function ($scope, $http, http, PackageService, $rootScope) {

    function checkNextLetter(){
        var s = $scope.searchText,
            r =  $scope.searchResult;

        if (s && r) {
            //debugger;
            if (_.last(s) !== r[s.length - 1]) {
                $scope.searchResult = ''
            }
        }
    }

    $scope.suggestions = [];
    $scope.selectedShows = PackageService.selectedShows;
    $scope.selectedIndex = -1;


    var switchCase = function(char){
        if (char == char.toUpperCase()) {
            return char.toLowerCase();
        } else {
            return char.toUpperCase();
        }
    }


    var matchCase = function (search, result) {

        var resultArray = result.split('');

        for (var i = 0; i < search.length; i++) {
            if(search[i] !== resultArray[i]){
                resultArray[i] = switchCase(resultArray[i])
            }
        }

        return resultArray.join('')


    }

    $scope.checkMatched = function(){
        return $scope.searchResult[$scope.searchText-1] === _.last($scope.searchText)
    }

    $scope.search = _.debounce(function () {
        if ($scope.searchText) {
            //$scope.suggestions = [];
            $http.get('/api/search?q=' + $scope.searchText)
                .success(function (data) {
                    PackageService.searchResults = data.results;


                    var res = _.min(data.results, function (elem) {
                        return elem.title.length

                    })

                    var searchResult = matchCase($scope.searchText, res.title);

                    if(_.includes(searchResult, $scope.searchText)){
                        $scope.searchResult = searchResult;

                    }

                    $scope.suggestions = data.results;

                    $scope.selectedIndex = -1
                });
        } else {
            $scope.suggestions = [];
        }
    }, 100);

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
        } else if (event.keyCode === 8) {
            $scope.searchResult = '';
        }

    };


    $scope.$watch('selectedIndex', function (val) {
        if (val !== -1) {
            $scope.searchText = $scope.suggestions[$scope.selectedIndex].title
        }
    });

    $scope.$watch('searchText', function (val) {
        //debugger;
        if (val !== -1 ){
            checkNextLetter();

        }
    })


});
app.controller('chart', function ($scope, http, _, $rootScope) {
    $scope.showArray = [];
    $scope.providers = [];
    $scope.rows = [];
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
                    var elemArray = elem.split('/');
                    var elemId = elemArray[elemArray.length - 2];
                    return elemId == show.id;
                });

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

            $scope.rows = _.map($scope.package.content, function (content) {
                var obj = {};
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
app.controller('ModalController', function ($scope, http, $modal, $log, $rootScope) {

    $scope.login = 'Click Here to Login'

    $scope.items = ['item1', 'item2', 'item3'];

    $scope.open = function () {
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

    if ($rootScope.currentStep == 4) {
        $scope.open()
    }
});

app.controller('ModalInstanceController', function ($scope, $modalInstance, items, $location, CONFIG) {

    $scope.facebookAuth = function () {

    window.location = CONFIG.URL + $('#facebook_login').attr('href');
    }

    $scope.instagramAuth = function () {

    window.location = CONFIG.URL + $('#instagram_login').attr('href');
    }

    $scope.twitterAuth = function () {

     window.location = CONFIG.URL + $('#twitter_login').attr('href');
    }




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

app.controller('StepOneController', function ($scope, $http, $timeout) {

    step = this

    $scope.popularShows = null;

    $http.get('api/popular-shows')
        .success(function (data) {
            step.popularShows = data.results;
            return data
        })
        .then(function () {
            //debugger;
            //$('.popular-shows').slick();
        })


    //$scope.$watch(
    //    function watchPopularShows() {
    //        return ($('#popular-shows').find('div').length)
    //
    //
    //    },
    //    function makeCarousel() {
    //
    //
    //        if ($('#popular-shows').find('div').length > 0) {
    //
    //            $('#popular-shows').slick({
    //                //adaptiveHeight: true,
    //                autoplay: true,
    //                infinite: true,
    //                slidesToShow : 3,
    //                slidesToScroll: 3,
    //                dots: true,
    //                //slide: 'img'
    //            })
    //        }
    //
    //    }
    //)


});
