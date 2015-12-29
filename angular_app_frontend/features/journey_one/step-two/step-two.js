/**
 * Created by Nem on 11/25/15.
 */
app.controller('StepTwoController', function ($scope, http, PackageFactory) {

    $scope.package = PackageFactory.getPackage();
    var hardwareColl = $scope.package.hardware;
    var wantedHardware = ["Mohu Antenna","Roku Streaming Stick", "Amazon Fire Stick"];
    $scope.hardwareTotal = 40.99;
    $scope.monthlyTotal = 5.99;
    var digitalAntenna = {"url":"",
                "name": "Mohu Antenna",
                "version": 30,
                "home_url": "http://www.gomohu.com/",
                "image_url":"static/img/Mohu.png",
                "retail_cost": 39.99,
                "mem_cost": 225,
                "description": "Roku is a digital streaming adapter that comes in several different flavors"};

    http.getHardware()
        .then(function (data) {
            $scope.hardware = data.results;
            $scope.filterHardware();
            $scope.hardware.push(digitalAntenna);


        });

    $scope.itemSelected = function (item) {
        var hardwareColl = $scope.package.hardware;




        var x = _.some(hardwareColl, 'url', item.url);

        return x

    };
    $scope.filterHardware = function() {
        var hardwareCopy = $scope.hardware;
        for(var i = 0;i<hardwareCopy.length;i++)
        {
            if(!isWantedHardware(hardwareCopy[i]))
            {
                hardwareCopy.splice(i, 1);
            }
        }
        hardwareCopy.splice(1,2);
        hardwareCopy.splice(2,1);
        $scope.hardware = hardwareCopy;



    };

    $scope.addRemoveHardware = function (item) {
        if(item.hasOwnProperty('selected')){
            delete item['selected']
        }




        var hardwareColl = $scope.package.hardware;
        if (_.some(hardwareColl, 'url', item.url)) {

            _.remove(hardwareColl, item);

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
    })

    function isWantedHardware(hardwarePiece) {
        return wantedHardware.indexOf(hardwarePiece.name) >= 0;
    }
});