/**
 * Created by Nem on 6/27/15.
 */


app.factory('PackageFactory', [function () {
    //debugger;

    var _package = {};

    var _test = 1;


    return {
        setPackage: function (package) {
            //debugger;
            _package = package

            $http.post('/json-package', package);
        },

        getPackage: function () {
            return _package;
        },

        getSSTest: function () {
            //debugger;
            return _test;
        }
    }



}]);

app.run(function(PackageFactory){
    $http.get('/json-package/')
        .then(function(data){
            PackageFactory.setPackage(data)
        })
});