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

app.service('refreshPackageService', function($rootScope){
    this.broadcast = _.debounce(function () {
        $rootScope.$broadcast("refresh_package")
    }, 500)
    this.listen = _.debounce(function (callback) {
        $rootScope.$on("refresh_package", callback)
    }, 500)
})

app.service('authEventService', function($rootScope){
    this.broadcast= _.debounce(function () {
        $rootScope.$broadcast("logged_in")

    }, 500)

    this.listen = _.debounce(function (callback) {
        $rootScope.$on("logged_in", callback)
    }, 500)
})

app.factory('ServiceTotalFactory', function(){
    var _price = 0

    return {
        setPrice : function(s) {
            _price += s
        },

        getPrice : function(){
            return _price
        }
    }
})

app.factory('PackageFactory', ['$http', '$q', '_', '$window','loginEventService', 'authEventService', function ($http, $q, _, $window, loginEventService, authEventService) {
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

            // if($window.sessionStorage.token == undefined){
            //     loginEventService.broadcast()
            // }
            $http.put(ssPackage.url, ssPackage)
                .then(function success(response){
                    authEventService.broadcast()
                }, function error (response){
                    auth_denied = [403, 401];
                    if ( _.includes(auth_denied, response.status)) {
                    console.log(new Date());
                        location.hash != '#/' && loginEventService.broadcast()
                    }
                })
        },0),

        getPackage: function () {
            return _package || "";
        },

        getSSTest: function () {
            // ;
            return _test;
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
                return $http.post('/node-data/servicelist', ssPackage)
            }
        },

        getCheckoutPanelList: function () {
            //  ;
            var ssPackage = this.getPackage();
            if ('data' in ssPackage) {
                return $http.post('/node-data/checkoutlist', ssPackage)
            }
        },


    }


}]);


app.run(function (PackageFactory, $http, http, $rootScope, $window, refreshPackageService) {

    $http.get('/api/package/')
        .then(function (data) {


            data = data.data.results[0];
            PackageFactory.setPackage(data);

            refreshPackageService.broadcast()

            $window.sessionStorage.user = {}


        }, function(err){

        console.log(err)
    })

});
