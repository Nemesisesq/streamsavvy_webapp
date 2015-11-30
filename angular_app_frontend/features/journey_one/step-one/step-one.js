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

    $scope.delete = function (content) {
        //debugger;

        _.remove($scope.package.content, content);

        $scope.save()

    }

    $scope.prePopulateWindowProvider = function (content, prop) {

        //debugger;

        var array = _.intersection($scope.package.providers, content.content_provider);

        if(prop == 'onDemand'){

            _.remove(array, function(n){
                return n.name == 'Netflix';

            })
        } else if (prop == 'fullSeason') {

            _.remove(array, function(n){
                return n.name != 'Netflix' || !_.contains(n.name.toLower, 'amazon');
            })
        }

        
    }


    $scope.saveWindowProvider = function(obj, prop, value) {
        //debugger;

        obj[prop] = value;

        if(!_.includes($scope.package.providers, value)) {$scope.package.providers.push(value)}
        
        $scope.save()


    }

    $scope.$watch(function () {return PackageFactory.getPackage()}, function(){
        $scope.package = PackageFactory.getPackage();
    })



    $scope.save = function() {
        //debugger;
        PackageFactory.setPackage($scope.package)
    }

    $scope.$watchCollection('package.content',function () {
        //debugger;

        PackageFactory.setPackage($scope.package)
    })


});
