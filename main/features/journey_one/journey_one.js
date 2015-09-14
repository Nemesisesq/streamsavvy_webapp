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
