app.controller('CheckoutController', function ($scope, $http, $timeout, $filter, PackageFactory, refreshPackageService, SERVICE_PRICE_LIST, ServiceTotalFactory) {

    $scope.package = PackageFactory.getPackage();

    $scope.$on('subcribe', function (service) {
        debugger;
        $scope.package.services.subscribed.push(service)
        service.added = true
    })

    $scope.$on('unsubscribe', function (service) {
        _.remove($scope.package.services.subscribed, service)
    })

    $scope.$on('hide', function (service) {
        $scope.package.services.hidden.push(service);
        service.hidden = true
    })


    function get_service_list() {
        $scope.package = PackageFactory.getPackage();
        if ('data' in $scope.package) {
            PackageFactory.getCheckoutPanelList()
                .then(function (data) {
                    $scope.list = data.data
                    $scope.package = PackageFactory.getPackage()
                    return data
                })
        }
    }
    
    refreshPackageService.listen(get_service_list);
    $scope.list = {}
    $scope.list.added = [];
    var payPerServices = ['google_play', 'itunes', 'youtube_purchase', 'vudu', 'amazon_buy'];
    $scope.addService = function (service) {
        _.includes($scope.package.data.services, service.display_name) || $scope.package.push(service)
    };

    $scope.$watchCollection(function () {
        try {
            return PackageFactory.getPackage().data.content
        }
        catch (e) {
            console.log(e)
        }
    }, function () {
        get_service_list();
        $scope.list = PackageFactory.getListOfServices();
    })
});

