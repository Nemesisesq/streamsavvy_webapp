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

app.factory('N', function (envService) {
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

app.service('loginEventService', function ($rootScope) {
    this.broadcast = _.debounce(function () {
        $rootScope.$broadcast("open_login")
    }, 500)
    this.listen = _.debounce(function (callback) {
        $rootScope.$on("open_login", callback)

    }, 500)
})

app.factory('PackageFactory', ['$http', '$q', '_', '$window','loginEventService', function ($http, $q, _, $window, loginEventService) {
    // ;

    var _package = {};

    var _env = ""

    var _test = 1;

    var _chosenShow = {};

    var _listOfServices = [];

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

        postPackage: _.debounce(function (ssPackage) {
            
            if($window.sessionStorage.token == undefined){
                loginEventService.broadcast()
            }
            $http.put(ssPackage.url, ssPackage)
                .then(function success(response){
                    var h  = 'w';
                }, function error (response){
                    if (response.status == 403 && _package.data.content.length > 0 ) {
                        loginEventService.broadcast()
                    }
                })
        }, 1100),

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

        getListOfServices: function () {

            return _listOfServices;
        },
        setListOfServices: function (listOfServices) {
            _listOfServices = listOfServices;
        },

        getServicePanelList: function () {
            var ssPackage = this.getPackage();
            if ('data' in ssPackage) {
                // var url = envService.read('serviceListUrl')
                return $http.post('/node-data/servicelist', ssPackage)
            }
        },

        getCheckoutPanelList: function () {
            var ssPackage = this.getPackage();
            if ('data' in ssPackage) {
                // var url = envService.read('checkoutListUrl')
                return $http.post('/node-data/checkoutlist ', ssPackage)
            }
        },


    }


}]);


app.run(function (PackageFactory, $http, http, $rootScope) {

    $http.get('/api/package/')
        .then(function (data) {
            //$rootScope.env = data.data.env

            console.log(data);

            data = data.data.results[0];
            PackageFactory.setPackage(data)

        })
});
