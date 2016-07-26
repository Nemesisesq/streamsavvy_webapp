app.controller('CheckoutController', function ($scope, $state, $http, $timeout, $filter, PackageFactory, refreshPackageService, $window) {

    $scope.package = PackageFactory.getPackage();

    if (_.isEmpty($scope.package.data.content)) {
        $state.go('dash.dashboard')
    }

    $scope.$on('subcribe', function (service) {
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

                    var only_ppv = data.data['ppv']
                    var x = _.cloneDeep(data.data)
                    delete x['ppv']
                    var non_ppv = x

                    var values = _.chain(non_ppv)
                        .values()
                        .flatten()
                        .map(function (elem) {
                            return elem.chan.source
                        })
                        .value()


                    only_ppv = _.map(only_ppv, function (elem) {
                        return elem.chan.source
                    })

                    mixpanel.track('Service List', {
                        "id": 8,
                        "non ppv services": values,
                        "ppv services": only_ppv,
                        "count": values.length,
                        "ppv_count": only_ppv.length,
                        "user": $window.sessionStorage.user
                    })
                    return values
                })
                .then(function (values) {
                    $scope.package.data.services.subscribed = _.filter($scope.package.data.services.subscribed, function (elem) {
                        return _.includes(values, elem.chan.source)

                    })
                })
                .then(function (data) {

                    PackageFactory.getSonyVueList($scope.package)
                        .then(function (data) {
                            //We set Sling and Playstation Services on the scope.
                            $scope.svs = data.data

                            if ($scope.list.hasOwnProperty('live')) {
                                $scope.list.live = _.concat(data.data, $scope.list.live)
                            } else {
                                $scope.list.live = data.data
                            }

                        })
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

