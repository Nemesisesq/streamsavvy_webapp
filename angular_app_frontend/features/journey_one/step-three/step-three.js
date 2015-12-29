app.controller('StepThreeController', function ($scope, PackageFactory) {

    $scope.package = PackageFactory.getPackage();
    $scope.hardwareTotal = PackageFactory.totalHardwareCost();
    $scope.servicesTotal = PackageFactory.totalServiceCost();
    //$scope.packageTotal = getPackageTotal();
    $scope.$watch(function () {
        return PackageFactory.getPackage()
    }, function () {
        $scope.package = PackageFactory.getPackage();
    });

})