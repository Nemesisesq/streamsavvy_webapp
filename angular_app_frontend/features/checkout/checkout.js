app.controller('CheckoutController', function ($scope, $http, $timeout, $filter, PackageFactory, SERVICE_PRICE_LIST) {

    $scope.package = PackageFactory.getPackage();



    PackageFactory.getCheckoutPanelList()
        .then(function (data) {

            $scope.list = data.data
        });

    $scope.list = {}

    $scope.list.added = [];

    var payPerServices = ['google_play', 'itunes', 'youtube_purchase', 'vudu', 'amazon_buy'];

    $scope.addService = function (service) {
        _.includes($scope.package.data.services, service.display_name) || $scope.package.push(service)

    };


    $scope.$watchCollection(function(){
        return $scope.list
    }, function(){
        $scope.package.services = $scope.list


    })


    // $scope.$watchCollection(function () {
    //     return PackageFactory.getPackage().data.services
    //
    // }, function () {
    //     PackageFactory.setPackage($scope.package)
    // })


    //TODO remove this nonsense
    $scope.$watchCollection(function () {
        return PackageFactory.getPackage().data.content

    }, function () {
        // $scope.package = PackageFactory.getPackage();
        // $scope.list = PackageFactory.getListOfServices();


        // _.forEach($scope.list.not_ota, function (not_ota_service) {
        //     if (not_ota_service != undefined) {
        //         $scope.notOtaServiceDetail(not_ota_service);
        //     }
        //
        // });
        // _.forEach($scope.list.ota, function (ota_service) {
        //     if (ota_service != undefined) {
        //         $scope.otaServiceDetail(ota_service);
        //     }
        // })
    })


});

/**
 * Created by chirag on 3/28/16.
 */
