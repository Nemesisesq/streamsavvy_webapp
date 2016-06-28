app.controller('CheckoutController', function ($scope, $http, $timeout,$filter, PackageFactory, SERVICE_PRICE_LIST) {

    $scope.package = PackageFactory.getPackage();
    $scope.listP = PackageFactory.createListOfServices();

    $scope.list = {}

    $scope.list.added = [];
    
    var payPerServices = ['google_play','itunes','youtube_purchase','vudu','amazon_buy'];

    $scope.addService = function (service) {
        _.includes($scope.package.data.services, service.display_name) || $scope.package.push(service)

    };
    $scope.notOtaServiceDetail = function(mystery_service) {
        if(_.some(payPerServices,mystery_service.chan.source)){
            console.log('this is the payperview service ' + mystery_service.chan.source);
            mystery_service.description = SERVICE_PRICE_LIST[0].description;
            mystery_service.price = SERVICE_PRICE_LIST[0].price;
            //mystery_service.subscriptionLink = SERVICE_PRICE_LIST[0].subscriptionLink;
            //mystery_service.gPlayLink = SERVICE_PRICE_LIST[0].gPlayLink;
            
            
        }
        else{
            var serviceMatch = _.find(SERVICE_PRICE_LIST,function(elem){
                return elem.name == mystery_service.chan.source;
            });
            if(serviceMatch != undefined){

                _.assignIn(mystery_service, serviceMatch);

            }
        }
    };

    $scope.otaServiceDetail = function(live_mystery_service){
        if(live_mystery_service.chan.is_on_sling){
            var slingService = _.find(SERVICE_PRICE_LIST,function(elem){ return elem.name == 'SlingTV'});
            _.assignIn(live_mystery_service, slingService);

        }
        else if(live_mystery_service.chan.is_over_the_air){
            var otaService = _.find(SERVICE_PRICE_LIST,function(elem){ return elem.name == 'Over The Air'});
             _.assignIn(live_mystery_service, otaService);
        }
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
    $scope.openTab = function(servicePurchase){
        if(servicePurchase != undefined)
        {
           $scope.url = servicePurchase.subscriptionLink;
        }

    }
    
    $scope.$watchCollection(function () {
        return PackageFactory.getPackage().data.services

    }, function () {
        PackageFactory.setPackage($scope.package)
    })
    
    
    //TODO remove this nonsense
    $scope.$watchCollection(function () {
        return PackageFactory.getPackage().data.content

    }, function () {
        $scope.package = PackageFactory.getPackage();
        $scope.list = PackageFactory.getListOfServices();
        _.forEach($scope.list.not_ota, function(not_ota_service){
            if(not_ota_service != undefined){
                $scope.notOtaServiceDetail(not_ota_service);
            }

        } );
        _.forEach($scope.list.ota, function(ota_service){
            if(ota_service != undefined){
                $scope.otaServiceDetail(ota_service);
            }
        })
    })
   

    
    
    
    
    
    
});

/**
 * Created by chirag on 3/28/16.
 */
