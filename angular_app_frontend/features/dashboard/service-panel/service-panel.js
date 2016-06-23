app.controller('ServicePanelController', function ($scope, $http, $timeout, PackageFactory, VIEW_WINDOWS) {

    $scope.hello = 'world';

    var ssPackage = PackageFactory.getPackage();
    $scope.pkg = PackageFactory.getPackage();
    var payPerServices = ['vudu', 'amazon_buy', 'google_play', 'itunes', 'youtube_purchase'];


    function check_if_on_sling(obj) {

        if (obj.chan.on_sling) {
            return true
        } else if (obj.chan.is_on_sling) {
            return true
        } else {
            return false
        }

    }

    // $scope.payPerShows = [];
    var updateServices = function () {

        if ('data' in ssPackage) {
            $scope.listOfServices = undefined;
            debugger;
            $scope.listOfServices = PackageFactory.catagorizeShowsByService(ssPackage);
            debugger;
            $scope.listOfServices = _.forEach($scope.listOfServices, function (val, key) {
                $scope.listOfServices[key].open = true
            })
            PackageFactory.setListOfServices($scope.listOfServices);
        }
    }

    updateServices()
    $scope.$watchCollection(function () {
        var _data =  PackageFactory.getPackage().data;
        if (_data != undefined) {
            return _data.content
        } else {
            return []
        }

    }, function () {
        ssPackage = PackageFactory.getPackage();
        $scope.pkg = PackageFactory.getPackage();

        updateServices()
    })


});

