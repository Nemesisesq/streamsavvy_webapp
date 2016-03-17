app.controller('ShowGridController', function ($scope, $rootScope, $q, $http, $timeout, PackageFactory, VIEW_WINDOWS, $compile, ShowDetailAnimate) {
    //$rootScope.showDetailDirective = false;

    function verifySelectedShowDetails(){
        debugger;
        var chosen = PackageFactory.getChosenShow()
        if (chosen.detail == undefined){
            $http.get(chosen.url)
                .then(function(res){
                    debugger;
                    PackageFactory.setChosenShow(res.data)
                })

        }
    }

    $rootScope.showSearchView = true



    $('body').removeAttr('id');
    $('body').addClass('dashboard-background');

    $scope.clearContent = function () {
        debugger
        var pkg = PackageFactory.getPackage()

        pkg.data.content = []

        PackageFactory.setPackage(pkg)
    }

    $scope.showTotal = function (content) {


        var total = 0

        var chans = _.map(VIEW_WINDOWS, function (w) {


            if (content.viewingWindows !== undefined && content.viewingWindows[w.type] !== undefined) {
                var window = content.viewingWindows[w.type];
                if (window.channel !== undefined) {

                    return window.channel;

                }
            }
        })

        chans = _.uniq(_.compact(chans), function (c) {
            if (c.service !== undefined) {
                return c.service
            }
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


    //$q.when(PackageFactory.getPackage())
    //    .then(function (v) {
    //        //debugger;
    //        $scope.package = v
    //        $scope.cs = v.data.content[0].guidebox_data
    //    })

    $scope.onDemandLength = function (c) {

        return _.filter(c, function (n) {
                return n.name == 'Netflix'
            }).length > 0
    }

    $scope.delete = function (content) {
        debugger;
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

    $scope.showDetail = function (item, ev, attrs) {

        PackageFactory.setChosenShow(item);
        verifySelectedShowDetails()
        //debugger;
        var positionItem = ev.currentTarget,
            scaleItem = ev.target,
            container = document.getElementById('search-and-shows');
        debugger;
        $(scaleItem).attr('id', 'scaled-from')
        $(positionItem).attr('id', 'is-opened')
        //debugger;
        ShowDetailAnimate.loadContent(positionItem, scaleItem, container)
            .then(function (v) {
                return $timeout(function () {
                    //debugger;

                    var detail = angular.element(document.createElement('show-detail'));

                    $rootScope.showSearchView = false;
                    $rootScope.showDetailDirective = true;
                    debugger;

                }, 500)
            })
            .then(function (v) {
                $('show-detail').addClass('fade-in');
                //$('show-detail').removeClass('fade');
            })

        $('.show-grid').addClass('blur-and-fill');


    }

    $scope.hideDetail = function (ev, attrs) {

        var positionItem = document.getElementById('is-opened'),
            scaleItem = document.getElementById('scaled-from'),
            container = document.getElementById('search-and-shows');
        $('show-detail').removeClass('fade-in');
        $rootScope.showDetailDirective = false;

        ShowDetailAnimate.hideContent(positionItem, scaleItem, container)
            .then(function (v) {
                $timeout(function () {
                    debugger;

                    $rootScope.showSearchView = true;
                    $('.show-grid').removeClass('blur-and-fill');
                }, 500)
            });


    }


    $scope.$watch(function () {
        return PackageFactory.getPackage()
    }, function () {
        $scope.package = PackageFactory.getPackage();
    })

    $scope.$watch(function(){
        return PackageFactory.getChosenShow()
    }, function () {
        $scope.cs = PackageFactory.getChosenShow()
    })


    $scope.savePackage = function () {
        PackageFactory.setPackage($scope.package)
    }

    $scope.$watchCollection('package.content', function () {

        PackageFactory.setPackage($scope.package)
    })
});