app.controller('CheckoutController', function ($scope, $http, $timeout, PackageFactory) {



    $scope.package = PackageFactory.getPackage();
    $scope.list = PackageFactory.getListOfServices();
    $scope.list.added = [];
    
    $scope.addService = function (service) {
        
        $scope.list.added.push(service.chan.source);
        service.added = true;
        /*
        if (service.hasOwnProperty('selected')) {
            delete service['selected'];
            //removeShowFromService();
        }

        var addService = function () {
            if (!_.includes($scope.list.added, service)) {
                $scope.list.added.push(service);
            }
            $scope.setListOfServices($scope.list);
        };
        addService();
        PackageFactory.setPackage()
        */
    };

    $scope.removeService = function(service,serviceArray) {
        if(serviceArray == 'ota'){
           _.pull($scope.list.ota,service);
        }
        else{
           _.pull($scope.list.not_ota,service);
        }
        PackageFactory.setListOfServices($scope.list);
    };

    $scope.$watchCollection(function () {
        return PackageFactory.getPackage().data.content

    }, function () {
        $scope.package = PackageFactory.getPackage();
        $scope.list = PackageFactory.getListOfServices();
    })
   

});

/**
 * Created by chirag on 3/28/16.
 */
