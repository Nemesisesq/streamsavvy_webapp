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

            scope.$watchCollection('package.content', function () {
                PackageFactory.setPackage(scope.package)
            });

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

function isLive(elem){
    if (elem.source != 'hulu_free') {
        return _.includes(elem.type, 'tv') || _.includes(elem.type, 'tele' ) || elem.type === 'free' || _.includes(elem.display_name.toLowerCase(), 'now');
    }


}

function isOnDemand(elem) {

    if(elem.source == 'netflix'){
        return false
    }

    if(elem.source == 'hulu_free'){
        return false
    }

    return  _.includes(elem.type, 'sub')
}

app.filter('channel', function () {
    return function (input, type) {


        var list = _.filter(input, function (elem) {
            if(type == 'live'){
                return isLive(elem);
            }
            if(type == 'onDemand'){
                return isOnDemand(elem)
            }
            if(type == 'fullseason'){
                return _.includes(elem.type, 'sub')
            }
            if(type == 'alacarte'){
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
 * Created by Nem on 1/13/16.
 */



app.config(function ($httpProvider, $provide) {
    
    
    $provide.factory('s3FeedbackInterceptor', function ($q) {

        return {
            'request' : function (config) {
                debugger;
                var x = config
                return config
            }
        }
        
    })

    $httpProvider.interceptors.push('s3FeedbackInterceptor');
})

/**
 * Created by Nem on 6/27/15.
 */
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

app.run(function ($http, Fuse, N) {

    $http.get('netflixable/')
        .then(function (data) {

            N.setShows(data.data)
        })
})


app.factory('PackageFactory', ['$http', '$q', 'VIEW_WINDOWS', '_', function ($http, $q, VIEW_WINDOWS, _) {
    // ;

    var _package = {};

    var _test = 1;


    return {
        setPackage: function (ssPackage) {

            _package = ssPackage;

            if (!_.isEmpty(ssPackage)) {
                this.postPackage(ssPackage)
            }

        },

        postPackage: function (ssPackage) {


            $http.post('/json-package/', ssPackage);
        },

        getPackage: function () {
            return _package;
        },

        getSSTest: function () {
            // ;
            return _test;
        },

        updatePackageChannels: function (scope) {
            debugger;

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

                debugger;

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
            if (pkg.content.length > 0) {

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


        }
    }


}]);



app.run(function (PackageFactory, $http, http) {
    $http.get('/json-package/')
        .then(function (data) {

            console.log(data);

            if (data.data == "") {
                http.getPackage()
                    .then(function (data) {
                        PackageFactory.setPackage(data)
                    })
            } else {
                PackageFactory.setPackage(data.data)
            }
        })
});
app.factory('_', function($window){
    return $window._;
})

app.factory('Fuse', function ($window) {
    return $window.Fuse
})

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
app.controller('navigation', function ($scope, http, $http, $cookies, $location, $state, $rootScope, CONFIG) {
    $scope.isHomePage = $state.current.data.isHomePage;

    $scope.hmdc = $state.current.data.hmdcActive;

    $scope.logout = function () {
        debugger
        $location.path(CONFIG.URL +'/django_auth/logout/');
            //.success(function () {
            //    $rootScope.logged_in = false;
            //    console.log($rootScope.logged_in)
            //})
    }


});

app.run(function ($rootScope) {
    angular.element('#status').text() === 'True' ? $rootScope.logged_in = true : $rootScope.logged_in = false
    console.log($rootScope.logged_in)

})
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


function slingInProviders(suggestion) {
    return _.some(suggestion.content_provider, 'name', 'SlingTv');
}
/**
 * Created by Nem on 7/18/15.
 */
app.controller('search', function ($scope, $rootScope, $http, http, PackageFactory, _, Fuse, BANNED_CHANNELS, SLING_CHANNELS, SERVICE_PRICE_LIST, N, MAJOR_NETWORKS, growl) {

    var nShows = [];


    var nChannel = {
        display_name: "Netflix",
        id: 0000,
        source: "netflix",
        type: "subcription"
    }


    //TODO make this a constant in the angular app
    //$http.get('netflixable/')
    //    .then(function (data) {
    //
    //        nShows = new Fuse(data.data, {threshold: .2});
    //    })

    function isOnNetFlix(show) {

        var shows = N.getShows();
        if (shows.search(show.title).length > 0) {
            return true;
        }
    }

    function checkNextLetter() {
        var s = $scope.searchText,
            r = $scope.searchResult;

        if (s && r) {
            // ;
            if (_.last(s) !== r[s.length - 1]) {
                $scope.searchResult = ''
            }
        }
    }

    $scope.suggestions = [];
    $scope.selectedIndex = -1;


    var switchCase = function (char) {
        if (char == char.toUpperCase()) {
            return char.toLowerCase();
        } else {
            return char.toUpperCase();
        }
    }


    $scope.checkMatched = function () {
        return $scope.searchResult[$scope.searchText - 1] === _.last($scope.searchText)
    }

    $scope.search = _.debounce(function () {
        if ($scope.searchText) {

            //$scope.suggestions = [];
            $http.get('/api/search?q=' + $scope.searchText)
                .success(function (data) {


                    //var res = _.min(data.results, function (elem) {
                    //    return elem.title.length
                    //
                    //})

                    //var searchResult = matchCase($scope.searchText, res.title);

                    //if (_.includes(searchResult, $scope.searchText)) {
                    //    $scope.searchResult = searchResult;
                    //
                    //}

                    var sorted = _.sortBy(data.results, function (elem) {


                        return elem.title.length

                    })

                    if (data.searchText == $scope.searchText) {
                        $scope.suggestions = sorted;
                    }

                    $scope.selectedIndex = -1
                });
        } else {
            $scope.suggestions = [];
        }
    }, 250, {'maxWait': 1000});

    $rootScope.addToSelectedShows = function (suggestion) {


        var ssPackage = PackageFactory.getPackage();
        debugger;

        if(_.some(ssPackage.content, 'title' ,suggestion.title)){
            growl.warning('You already added ' + suggestion.title + ' to your package!')
            return
        }

        function addSling() {
            var slingObj = {
                display_name: "Sling TV",
                id: 147,
                source: "sling_tv",
                type: "live_online_tv"
            }



            if (slingInProviders(suggestion)) {
                suggestion.channels.web.episodes.all_sources.push(slingObj)
            }
        }

        var slingChannels = new Fuse(SLING_CHANNELS, {threshold: .3});


        function isNetworkShow(n) {
            return _.includes(MAJOR_NETWORKS, n)
        }

        if (suggestion.guidebox_id !== undefined && typeof suggestion.guidebox_id === 'number') {
            $http.get('/channels/' + suggestion.guidebox_id)
                .then(function (data) {

                    var opts = {
                        keys: ['name'],
                        threshold:.2

                    }

                    sPrices = new Fuse(SERVICE_PRICE_LIST, opts);

                    var cleanedChannels = data.data.results

                    var chans = _.uniq(cleanedChannels.web.episodes.all_sources, 'display_name')

                    chans = _.uniq(chans.concat(suggestion.content_provider), function (elem) {
                        var x;

                        elem.display_name == undefined ? x = elem.name : x= elem.display_name;

                        return x;

                    })

                    chans = _.map(chans, function (elem) {
                        if (elem.name != undefined) {
                            elem.display_name = elem.name;
                            elem.type = elem.channel_type;
                        }




                        return elem
                    })

                    var b = _.map(BANNED_CHANNELS, function (elem) {
                        return elem.toLowerCase().replace(' ', '')
                    })
                    chans = _.filter(chans, function (elem) {

                        //debugger


                        var e = elem.display_name.toLowerCase().replace(' ', '');

                        return !_.includes(b, e)
                    })

                    if (isOnNetFlix(suggestion)) {
                        chans.push(nChannel)
                    }

                    chans = _.map(chans, function (elem) {
                        //debugger;
                        if (isLive(elem) && slingChannels.search(elem.display_name).length == 0 && ! _.includes(elem.display_name.toLowerCase(), 'now') || isNetworkShow(elem.display_name)) {
                            elem.display_name = elem.display_name + ' Over the Air'

                            return elem

                        }

                        if (slingChannels.search(elem.display_name).length > 0 && elem.type != 'free') {
                            //TODO remove this and change the way this is done.
                            //debugger;
                            elem.display_name = 'Sling TV (' + elem.display_name + ')'
                            elem.service = 'sling_tv'
                            elem.price = 20.00;

                            debugger

                            return elem

                        }

                        if(!_.isEmpty(sPrices.search(elem.display_name))){
                            var res = sPrices.search(elem.display_name)
                            elem.price = res[0].price
                        }

                        return elem;
                    })

                    cleanedChannels.web.episodes.all_sources = chans

                    suggestion.channels = cleanedChannels;

                    suggestion.isOpen = true;
                    ssPackage.content.push(suggestion);
                    PackageFactory.setPackage(ssPackage);
                })
        } else {
            if (suggestion.channels === undefined) {
                suggestion.channels = {web: {episodes: {all_sources: []}}}
            }

            addSling();

            ssPackage.content.push(suggestion);
            PackageFactory.setPackage(ssPackage);
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
        // ;
        if (val !== -1) {
            checkNextLetter();

        }
    })


});


app.controller('ModalController', function ($scope, http, $modal, $log, $rootScope) {


    //$scope.login = 'Click Here to Login'


    $scope.items = ['item1', 'item2', 'item3'];

    $rootScope.openLogInModal = function () {
        //debugger;
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
        debugger;
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
        debugger;
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

    $scope.$watchCollection('package.content', function () {

        PackageFactory.setPackage($scope.package)
    })
});
app.controller('StepThreeController', function ($scope, PackageFactory) {

    $scope.package = PackageFactory.getPackage();
    $scope.hardwareTotal = PackageFactory.totalHardwareCost();
    $scope.servicesTotal = PackageFactory.totalServiceCost();
    //$scope.packageTotal = getPackageTotal();
    $scope.$addProviderUrls = function () {
        for (var i = 0; i < $scope.package.providers.length; i++) {
            var providerName = $scope.package.providers[i].display_name;
            switch (providerName) {
                case "Yahoo Screen Over the Air":
                    $scope.package.providers[i].home_url = "https://www.yahoo.com/tv/tagged/originals";
                    break;
                case "Netflix":
                    $scope.package.providers[i].home_url = "https://www.netflix.com/";
                    break;
                case "HBO Now":
                    $scope.package.providers[i].home_url = "https://order.hbonow.com/";
                    break;
                case "Sling TV (ESPN)":
                    $scope.package.providers[i].home_url = "http://www.sling.com/";
                    break;
                case "Sling TV (CNN)":
                    $scope.package.providers[i].home_url = "http://www.sling.com/";
                    break;
                case "Sling TV (ABC Family)":
                    $scope.package.providers[i].home_url = "http://www.sling.com/";
                    break;
                case "Slin" +
                "g TV (AMC)":
                    $scope.package.providers[i].home_url = "http://www.sling.com/";
                    break;
                case "Sling TV (TNT)":
                    $scope.package.providers[i].home_url = "http://www.sling.com/";
                    break;
                case "Sling TV (TBS)":
                    $scope.package.providers[i].home_url = "http://www.sling.com/";
                    break;
                case "Sling TV (The CW)":
                    $scope.package.providers[i].home_url = "http://www.sling.com/";
                    break;
                case "Sling TV (Travel)":
                    $scope.package.providers[i].home_url = "http://www.sling.com/";
                    break;
                case "Amazon Prime":
                    $scope.package.providers[i].home_url = "http://www.amazon.com/gp/prime/pipeline/prime_gifting_landing/?ref_=assoc_tag_ph_1415183446617&ie=UTF8&camp=1789&creative=9325&linkCode=pf4&tag=strea03d-20&linkId=UBNDLZEPEGPD6JDJ";
                    break;
                case "Amazon":
                    $scope.package.providers[i].home_url = "http://www.amazon.com/gp/prime/pipeline/prime_gifting_landing/?ref_=assoc_tag_ph_1415183446617&ie=UTF8&camp=1789&creative=9325&linkCode=pf4&tag=strea03d-20&linkId=UBNDLZEPEGPD6JDJ";
                    break;
                case "Showtime":
                    $scope.package.providers[i].home_url = "http://www.sho.com/sho/showtime-anytime";
                    break;
                case "Showtime FREEview Over the Air":
                    $scope.package.providers[i].home_url = "http://www.sho.com/sho/free-preview/1";
                    break;
                case "Hulu":
                    $scope.package.providers[i].home_url = "http://www.hulu.com/welcome";
                    break;
                case "Hulu with Showtime":
                    $scope.package.providers[i].home_url = "http://www.hulu.com/getshowtime";
                    break;
                case "CBS All Access":
                    $scope.package.providers[i].home_url = "http://www.cbs.com/all-access/";
                    break;
                case "VUDU":
                    $scope.package.providers[i].home_url = "http://www.vudu.com/";
                    break;
                case "Google Play":
                    $scope.package.providers[i].home_url = "https://play.google.com/store/movies?hl=en";
                    break;
                case "iTunes":
                    $scope.package.providers[i].home_url = "https://www.apple.com/itunes/download/";
                    break;
                case "YouTube":
                    $scope.package.providers[i].home_url = "https://www.youtube.com/user/YouTubeShowsUS/featured";
                    break;
                case "NBC Over the Air":
                    $scope.package.providers[i].home_url = "http://www.nbc.com/schedule";
                    break;
                case "CBS Over the Air":
                    $scope.package.providers[i].home_url = "http://www.cbs.com/schedule/";
                    break;
                case "FOX Over the Air":
                    $scope.package.providers[i].home_url = "http://www.fox.com/schedule";
                    break;
                case "ABC Over the Air":
                    $scope.package.providers[i].home_url = "http://abc.go.com/schedule";
                    break;
                case "The CW Over the Air":
                    $scope.package.providers[i].home_url = "http://www.cwtv.com/schedule/";
                    break;
                default:
                    $scope.package.providers[i].home_url = "http://www.guidebox.com/";
                    break;
            }
        }
    };
    $scope.$watch(function () {
        return PackageFactory.getPackage()
    }, function () {
        $scope.package = PackageFactory.getPackage();
        $scope.$addProviderUrls();
    });


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