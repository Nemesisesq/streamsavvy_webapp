app.controller('StepOneController', function ($scope, $http, $timeout, PackageFactory, VIEW_WINDOWS) {

    $scope.showTotal = function (content) {


        var total = 0

        var chans = _.map(VIEW_WINDOWS, function (w) {

            debugger;
            if (content.viewingWindows !== undefined && content.viewingWindows[w.type] !== undefined) {
                var window = content.viewingWindows[w.type];
                if (window.channel !== undefined) {

                    return window.channel;

                }
            }
        })

        chans = _.uniq(_.compact(chans), function (c) {
            return c.source
        })
        var prices = _.map(chans, function (elem) {
            return elem.price
        })
        
        total = _.reduce(prices, function (total, n) {
            return total + n;
        })


        //_.forEach($scope.directiveVW, function (window) {
        //
        //    if (content.viewingWindows !== undefined && content.viewingWindows[window.type] !== undefined) {
        //
        //        var window = content.viewingWindows[window.type];
        //        if (window.channel !== undefined && window.channel.price !== undefined) {
        //
        //            total += window.channel.price;
        //
        //        }
        //
        //    }
        //})

        content.totalCost = total


        total = _.round(total, 2)

        return total


    }


    $scope.totalServiceCost = PackageFactory.totalServiceCost;

    //$scope.contentTotal = function () {
    //
    //
    //    var t = 0
    //
    //    var package = $scope.package;
    //    if (package.content.length > 0) {
    //
    //         t = _.map(package.providers, function(elem){
    //            return elem.price;
    //        })
    //
    //        t = _.compact(t);
    //
    //        t = _.reduce(t, function(total, n){
    //            return total + n
    //        })
    //    }
    //
    //    t = _.round(t, 2)
    //
    //    return t
    //
    //
    //}


    $scope.directiveVW = [

        {
            type: 'live',
            headerText: 'Live Over the Air.',
            toolTip: 'get your content as soon as it dropped.'


        },
        {
            type: 'onDemand',
            headerText: 'On Demand Subscription.',
            toolTip: 'day/+ after live airing.'


        },
        {
            type: 'fullseason',
            headerText: 'Binge Watch Full Seasons',
            toolTip: 'season behind.'


        },
        {
            type: 'alacarte',
            headerText: 'Watch Current Season or Episodes for a fee',
            toolTip: 'day/+ after live airing with no committment'


        },


    ]

    $scope.popularShows = null;

    $http.get('api/popular-shows')
        .success(function (data) {
            $scope.popularShows = data.results;
            return data
        })
        .then(function () {
            // ;
            //$('.popular-shows').slick();
        });


    $scope.package = PackageFactory.getPackage();

    $scope.onDemandLength = function (c) {

        return _.filter(c, function (n) {
                return n.name == 'Netflix'
            }).length > 0
    }

    $scope.delete = function (content) {
        _.remove($scope.package.content, content);
        $scope.savePackage()
        PackageFactory.updatePackageChannels($scope)
    }

    $scope.prePopulateWindowProvider = function (content, prop) {
        var array = _.filter(content.content_provider, function (prov) {
            return _.includes(_.map($scope.package.providers, function (elem) {
                return elem.name
            }), prov.name)
        })

        if (prop == 'onDemand') {

            _.remove(array, function (n) {
                return n.name == 'Netflix';
            })
        } else if (prop == 'fullSeason') {

            _.remove(array, function (n) {
                return n.name != 'Netflix';
            })
        }

        return _.isEmpty(array) ? false : _.first(array).name;

    }


    $scope.$watch(function () {
        return PackageFactory.getPackage()
    }, function () {
        $scope.package = PackageFactory.getPackage();
    })


    $scope.savePackage = function () {
        PackageFactory.setPackage($scope.package)
    }

    $scope.$watchCollection('package.content', function () {

        PackageFactory.setPackage($scope.package)
    })
});
