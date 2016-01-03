/**
 * Created by Nem on 11/25/15.
 */
app.controller('StepTwoController', function ($scope, http, PackageFactory) {

    $scope.package = PackageFactory.getPackage();
    var hardwareColl = $scope.package.hardware;
    var wantedHardware = ["Mohu Antenna","Roku Streaming Stick", "Amazon Fire Stick"];
    $scope.hardwareTotal = 40.99;
    $scope.monthlyTotal = 5.99;
    http.getHardware()
        .then(function (data) {
            //$scope.hardware = data.results;
            $scope.replaceHardware();


        });
    var digitalAntenna = {"url":"",
                "name": "Mohu Antenna",
                "version": 30,
                "home_url": "http://www.amazon.com/gp/product/B00DHKKI16/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=B00DHKKI16&linkCode=as2&tag=stream06-20&linkId=3OKXSTXXFWZ3UEEM",
                "image_url":"static/img/Mohu.png",
                "retail_cost": 39.99,
                "description": "You'll need this to access live TV Over the Air -" +
                " i.e. ABC, NBC, CBS, FOX, The CW, and PBS.This is an indoor version that you simply stick to the wall behind your TV," +
                " and just like that...you get free live TV in HD for the major channels." +
                " One of the best values on the market and super easy to set up using your TV remote."};
    var amazonFireStick = {"url":"",
                "name": "Amazon Fire Stick",
                "version": "current-2015",
                "home_url": "http://www.amazon.com/gp/product/B00GDQ0RMG/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=B00GDQ0RMG&linkCode=as2&tag=stream06-20&linkId=GTZPFR2FFATFZZVF",
                "image_url":"static/img/Fire_Stick-2x.png",
                "retail_cost": 39.99,
                "description": "Solid alternative to the Roku that gets you most apps out there for great value." +
                " Super simple device to set up - just plug into the back of your TV." +
                " It comes with a remote that works pretty well, but you could also download an app that works as a remote as well." +
                " Outside of the Amazon Instant app, the interface is not great, but StreamSavvy is fixing all this, so stay tuned." +
                " Similar to the Roku, the biggest issue is speed with the Fire Stick." +
                " So just make sure you locate your wireless router close by...like real close( or pick up a wireless booster)."};

    var rokuStick = {"url":"",
                "name": "Roku Stick",
                "version": "3500R",
                "home_url": "http://www.roku.com/products/streaming-stick?utm_source=cj&utm_medium=affiliate&utm_campaign=cj_affiliate_sale&utm_content=%zi&utm_term=11771250",
                "image_url":"static/img/Roku4-2x.png",
                "retail_cost": 39.99,
                "description": "A great value that gets you access to the majority of streaming apps available." +
                " Super simple device to set up - just plug into the back of your TV." +
                " It comes with a remote that isn't great, but using your phone as a remote is a great experience with the Roku." +
                " The interface is decent, but StreamSavvy is working on improving this experience, so stay tuned." +
                " One of the biggest issues is the wireless capability with the Roku Streaming Stick," +
                " so just make sure you locate your wireless router close by... like real close(or pick up a wireless booster)."};

    $scope.itemSelected = function (item) {
        var hardwareColl = $scope.package.hardware;




        var x = _.some(hardwareColl, 'url', item.url);

        return x

    };
    $scope.replaceHardware = function() {
        $scope.hardware = [];
        $scope.hardware.push(rokuStick);
        $scope.hardware.push(amazonFireStick);
        $scope.hardware.push(digitalAntenna);
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