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
        console.log("This is the package object array");
        console.log($scope.package.providers[0]);
        for(var i= 0; i<$scope.package.hardware.length;i++)
        {
            hardTotal += ($scope.package.hardware[i].retail_cost);
        }
        hardTotal = parseFloat(hardTotal.toFixed(2));
        return hardTotal;
    }

    function getPackageTotal() {
        var packTotal = 0;
        packTotal = $scope.hardwareTotal + $scope.servicesTotal;
        packTotal = parseFloat(packTotal.toFixed(2));

        return packTotal;
    }




})