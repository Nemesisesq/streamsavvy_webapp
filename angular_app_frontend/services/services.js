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


