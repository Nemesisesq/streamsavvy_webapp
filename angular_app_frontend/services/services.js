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


app.factory('PackageFactory', ['$http', '$q', 'VIEW_WINDOWS', function ($http, $q, VIEW_WINDOWS) {
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

            if(scope.package.content.length == 0){
                scope.package.providers = [];
            }


            return $q(function (resolve, reject) {

                var chans = _.map(scope.package.content, function (elem) {
                    var x = []

                    _.forEach(VIEW_WINDOWS, function (w) {

                        if (elem.viewingWindows !== undefined && elem.viewingWindows[w.type] !== undefined) {
                            var window = elem.viewingWindows[w.type];

                            if(window.selected && window.channel !== undefined){
                                x.push(window.channel)
                            }

                        }

                    })



                    return x
                })

                chans = _.flatten(chans)

                chans = _.uniq(chans, function (elem) {
                        return elem.source
                    })

                scope.package.providers = chans
            })


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