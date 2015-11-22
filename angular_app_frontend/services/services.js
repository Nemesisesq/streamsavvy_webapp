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


app.factory('PackageFactory', ['$http', function ($http) {
    // ;

    var _package = {};

    var _test = 1;


    return {
        setPackage: function (ssPackage) {
            // ;
            _package = ssPackage;

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

app.run(function(PackageFactory, $http){
    $http.get('/json-package/')
        .then(function(data){
            PackageFactory.setPackage(data)
        })
});