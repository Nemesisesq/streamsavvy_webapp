app.controller('StepThreeController', function ($scope, PackageFactory) {

    $scope.package = PackageFactory.getPackage();
    $scope.hardwareTotal = getHardwareTotal();
    $scope.servicesTotal = 9.99;
    $scope.packageTotal = getPackageTotal();
    $scope.$watch(function () {
        return PackageFactory.getPackage()
    }, function () {
        $scope.package = PackageFactory.getPackage();
    });
    function getHardwareTotal() {
        var hardTotal = 0;
        for(var i= 0; i<$scope.package.hardware.length;i++)
        {
            hardTotal += ($scope.package.hardware[i].retail_cost);
        }
        hardTotal = parseFloat(hardTotal.toFixed(2));
        return hardTotal;
    }
})