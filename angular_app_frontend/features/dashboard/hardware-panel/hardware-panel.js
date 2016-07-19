/**
 * Created by Nem on 5/24/16.
 */
app.controller('HardwareController', function ($scope, PackageFactory, $state, $window) {

    $scope.devices = [
        {
            name: 'Roku',
            image: 'https://s3.amazonaws.com/streamsavvy/Roku4.png',
            url: 'http://www.dpbolvw.net/click-7926773-12551146-1459950711000',
            price: 49.99
        },
        {
            name: 'Mohu Leaf',
            image: 'https://s3.amazonaws.com/streamsavvy/Mohu.png',
            url: 'https://www.amazon.com/Mohu-Paper-thin-Reversible-Performance-MH-110583/dp/B004QK7HI8',
            price: 39.00
        }
    ]

    $scope.state = $state.current.name;

    $scope.linkToAffiliate = function (device) {
        $window.open(device.url);
        mixpanel.track("Buy Device", {
            "id" : 11,
            "service name": device.chan.display_name,
            "user" : $window.sessionStorage.user
        });
    }

    $scope.pkg = PackageFactory.getPackage();


    /*  $('.service-panel').on('scroll', function () {
     $('.not-ready').fadeOut()
     })

     $('.service-panel').on('scroll', function () {

     _.debounce(function () {

     $('.not-ready').fadeIn()
     }, 100)()
     })*/
    $scope.go = function () {
        debugger;

        location.href = '#/checkout';
        debugger;
        $scope.pkg = PackageFactory.getPackage();
        var showList = _.map($scope.pkg.data.content, function (showObject) {
            return showObject.title;
        });

        mixpanel.track("Proceeded to Checkout", {
            "id": 7,
            "show_List": showList,
            "user": $window.sessionStorage.user
        });
    }

    $scope.collapseHardware = true;
    var serviceHeight = $(window).height() - 46;

    if ($scope.collapseHardware) {
        $('.service-panel.ng-scope').css({'height': serviceHeight + 'px'});

    }

    $scope.mixpanelTrackReadyToCutCord = function () {
        var showList = [];
        _.forEach($scope.pkg.data.content, function (showObject) {
            showList.push(showObject.title);
        });
        // console.log(showList);

    }

    $scope.toggleHardwarePanel = function () {


        if (!$scope.collapseHardware) {
            $('.service-panel.ng-scope').animate({'height': serviceHeight + 'px'});
            $('.hardware-panel.ng-scope').animate({'height': '46px'});
        } else {
            $('.hardware-body').animate({height: '40vh'});
            $('.hardware-panel.ng-scope').animate({'height': '40vh'});
            $('.service-panel.ng-scope').animate({height: '60vh'});

        }
        $scope.collapseHardware = !$scope.collapseHardware;

    }
    $scope.servicesGT0 = function () {
        return !_.isEmpty(PackageFactory.getListOfServices())
    }

    $scope.$watchCollection(function () {


            if (PackageFactory.getPackage().data) {
                return PackageFactory.getPackage().data.content
            }
        },
        function () {
            if (PackageFactory.getPackage().data) {

                $scope.pkgHasContent = PackageFactory.getPackage().data.content.length > 0
            }
        })

});
