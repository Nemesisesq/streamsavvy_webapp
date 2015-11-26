/**
 * Created by Nem on 11/25/15.
 */
app.controller('StepTwoController', function ($scope, http, PackageFactory) {

    $scope.package = PackageFactory.getPackage();
    var hardwareColl = $scope.package.hardware;

    $scope.hardwareTotal = 40.99;
    $scope.monthlyTotal = 5.99;

    http.getHardware()
        .then(function (data) {
            $scope.hardware = data.results;
        });

    $scope.itemSelected = function (item) {
        var hardwareColl = $scope.package.hardware;

        return _.includes(hardwareColl, item)

    }

    $scope.addRemoveHardware = function (item) {

        var hardwareColl = $scope.package.hardware;


        if (_.includes(hardwareColl, item)) {
            _.remove(hardwareColl, item);

            item.selected = false;

        } else {
            item.selected = true;
            hardwareColl.push(item);
        }

        PackageFactory.setPackage($scope.package)

    };

    $scope.$watch(function () {
        return PackageFactory.getPackage()
    }, function () {
        $scope.package = PackageFactory.getPackage();
    })

});