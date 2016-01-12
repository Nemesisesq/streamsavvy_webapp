/**
 * Created by Nem on 11/25/15.
 */
app.controller('StepTwoController', function ($scope, http, PackageFactory) {

    $scope.package = PackageFactory.getPackage();
    var hardwareColl = $scope.package.hardware;

    http.getHardware()
        .then(function (data) {
            $scope.hardware = data.results;
        });

    $scope.itemSelected = function (item) {
        var hardwareColl = $scope.package.hardware;
        var x = _.some(hardwareColl, 'url', item.url);
        return x
    };


    $scope.addRemoveHardware = function (item) {
        if (item.hasOwnProperty('selected')) {
            delete item['selected']
        }


        var hardwareColl = $scope.package.hardware;
        if (_.some(hardwareColl, 'url', item.url)) {
            _.remove(hardwareColl, function(n){

                return n.url == item.url

            });

        } else {
            //item.selected = true;
            hardwareColl.push(item);
        }

        PackageFactory.setPackage($scope.package)
    };

    $scope.$watch(function () {
        return PackageFactory.getPackage()
    }, function () {
        $scope.package = PackageFactory.getPackage();
    });


});