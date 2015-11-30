/**
 * Created by Nem on 6/27/15.
 */



app.factory('PackageFactory', ['$http', function ($http) {
    // ;

    var _package = {};

    var _test = 1;


    return {
        setPackage: function (ssPackage) {
            // ;
            _package = ssPackage;

            if( ! _.isEmpty(ssPackage)){
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
                        //debugger;
                        PackageFactory.setPackage(data)
                    })
            } else {
                PackageFactory.setPackage(data.data)
            }
        })
});