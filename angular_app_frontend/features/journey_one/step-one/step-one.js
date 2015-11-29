app.controller('StepOneController', function ($scope, $http, $timeout, PackageFactory) {



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




    $scope.saveWindowProvider = function(obj, prop, value) {
        debugger;

        obj[prop] = value;

        $scope.save()

    }

    $scope.$watch(function () {return PackageFactory.getPackage()}, function(){
        $scope.package = PackageFactory.getPackage();
    })



    $scope.save = function() {
        debugger;
        PackageFactory.setPackage($scope.package)
    }

    $scope.$watchCollection('package.content',function () {
        debugger;

        PackageFactory.setPackage($scope.package)
    })


});
