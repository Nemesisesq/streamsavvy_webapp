app.controller('CheckoutController', function ($scope, $http, $timeout, PackageFactory, SERVICE_PRICE_LIST) {



    $scope.package = PackageFactory.getPackage();
    $scope.list = PackageFactory.getListOfServices();
    $scope.list.added = [];
    
    var payPerServices = ['google_play','itunes','youtube_purchase','vudu','amazon_buy'];

    $scope.addService = function (service) {
        
        $scope.list.added.push(service.chan.source);
        service.added = true;
    };
    $scope.serviceDetail = function(naked_service) {
        if(naked_service != undefined){
            var serviceMatch = _.find(SERVICE_PRICE_LIST,function(elem){
                return elem.name == naked_service.chan.source;
            })
            console.log("This is the service match" + serviceMatch);
            if(serviceMatch != undefined){
                naked_service.description = serviceMatch.description;
                naked_service.price = serviceMatch.price;
            }
        }

    }
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
        _.forEach($scope.list.not_ota, function(not_ota_service){
            $scope.serviceDetail(not_ota_service);
        } )
    })
   

    
    
    
    
    
    
});

/**
 * Created by chirag on 3/28/16.
 */
