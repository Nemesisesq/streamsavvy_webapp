app.controller('ShowGridController', function ($scope, $rootScope, $q, $http, $timeout, PackageFactory, VIEW_WINDOWS, $compile, ShowDetailAnimate) {

    var openingDetail = false
    //$rootScope.showDetailDirective = false;
    var liveServices = ['sling','cbs','nbc','abc'];
    var onDemandServices = ['hulu_plus','nbc'];
    var bingeServices = ['netflix','amazon_prime'];
    var payPerServices = ['google_play','itunes','amazon_buy','youtube_purchase','vudu'];

    $scope.hello = 'clear package';

    $scope.clearContent = function () {
        // debugger;
        var pkg = PackageFactory.getPackage()

        pkg.data.content = []

        PackageFactory.setPackage(pkg)
    }
    function verifySelectedShowDetails() {
        var chosen = PackageFactory.getChosenShow()
        if (chosen.detail == undefined) {
            $http.get(chosen.url)
                .then(function (res) {
                    PackageFactory.setChosenShow(res.data)
                })

        }
    }

    $rootScope.showSearchView = true


    $('body').removeAttr('id');
    $('body').addClass('gradient-background');


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


    $scope.delete = function (content) {
        _.remove($scope.package.content, content);
        $scope.savePackage()
        PackageFactory.updatePackageChannels($scope)
    }

    $scope.showDetail = _.debounce(function (item, ev, attrs) {

        if (openingDetail || !_.isEmpty($('.placeholder'))) {
            return
        }

        openingDetail = true;


        window.scrollTo(0, 0);
        $('body').css('overflow', 'hidden');

        PackageFactory.setChosenShow(item);
        verifySelectedShowDetails()
        // debugger;
        var positionItem = ev.currentTarget,
            scaleItem = ev.target,
            container = document.getElementById('search-and-shows');
        debugger;
        $(scaleItem).attr('id', 'scaled-from')
        $(positionItem).attr('id', 'is-opened')
        //debugger;
        $rootScope.showSearchView = false;
        $rootScope.$broadcast('save_package');
        ShowDetailAnimate.loadContent(positionItem, scaleItem, container)
            .then(function (v) {
                return $timeout(function () {
                    //debugger;

                    // var detail = angular.element(document.createElement('show-detail'));

                    // $rootScope.showDetailDirective = true;
                    //debugger;

                }, 500)
            })
            .then(function (v) {
                $('show-detail').addClass('fade-in');
                //$('show-detail').removeClass('fade');
            })

        $('.show-grid').addClass('blur-and-fill');

        openingDetail = false


    }, 50);

    $scope.hideDetail = function (ev, attrs) {
        // debugger;

        var positionItem = document.getElementById('is-opened'),
            scaleItem = document.getElementById('scaled-from'),
            container = document.getElementById('search-and-shows');
        $q.when($('show-detail').removeClass('fade-in'))
            .then(function () {

                $rootScope.showDetailDirective = false
            })
            .then(ShowDetailAnimate.hideContent.bind(null, positionItem, scaleItem, container))
            .then(function (v) {
                return $timeout(function () {
                    // debugger;

                    $rootScope.showSearchView = true;
                    $('.show-grid').removeClass('blur-and-fill');
                }, 500)
            })
            .then(function (v) {
                //debugger;
                $('body').css('overflow', 'scroll');
                $(scaleItem).removeAttr('id')
                $(positionItem).removeAttr('id')


            })


    };


    $scope.$watch(function () {
        return PackageFactory.getPackage()
    }, function () {
        $scope.package = PackageFactory.getPackage();
    });

    $scope.$watch(function () {
        return PackageFactory.getChosenShow()
    }, function () {
        $scope.cs = PackageFactory.getChosenShow();
        $scope.cs.liveWindow = [];
        $scope.cs.bingeWindow = [];
        $scope.cs.onDemandWindow = [];
        $scope.cs.payPerWindow = [];
        $scope.cs.misc = [];
        $scope.detailSources = (function () {
            if ($scope.cs.guidebox_data != undefined) {


                var x = _($scope.cs.channel)
                        .concat($scope.cs.guidebox_data.sources.web.episodes.all_sources)
                        .map(function (elem) {

                            if (elem.guidebox_data != undefined) {
                                debugger
                                elem.source = elem.guidebox_data.short_name
                            }


                            return elem
                        }).filter(function (elem) {

                            if (elem.hasOwnProperty('guidebox_data')) {
                                return !elem.guidebox_data.is_over_the_air
                            }

                            if (elem.source == 'hulu_free' || elem.source == 'starz_tveverywhere') {
                                return false
                            }

                            return true
                        })

                        .uniqBy('source')
                        .value()

                        .forEach(function (service) {
                            if (liveServices.includes(service.source)) {
                                $scope.cs.liveWindow.push(service.source);
                            }
                            else if (onDemandServices.includes(service.source)) {
                                $scope.cs.onDemandWindow.push(service.source);
                            }
                            else if (bingeServices.includes(service.source)) {
                                $scope.cs.bingeWindow.push(service.source);
                            }
                            else if (payPerServices.includes(service.source)) {
                                $scope.cs.payPerWindow.push(service.source);
                            }
                            else if (service.source == 'hbo_now') {
                                $scope.cs.liveWindow.push(service.source);
                                $scope.cs.onDemandWindow.push(service.source);
                                $scope.cs.bingeWindow.push(service.source);
                            }
                            else if (service.source == 'showtime_subscription') {
                                $scope.cs.onDemandWindow.push(service.source);
                                $scope.cs.bingeWindow.push(service.source);
                            }
                            else {
                                $scope.cs.misc.push(service.source);
                            }
                        })
                        ;
                console.log(x);
                return x;
            }
        })()

        // $scope.getRatings = function () {
        //     $http.get($scope.cs.url + '/ratings')
        // }


    })


    $scope.savePackage = function () {
        PackageFactory.setPackage($scope.package)
    }

    $scope.$on('save_package', function () {
        PackageFactory.setPackage($scope.package)
    });

    $scope.$watchCollection('package.data.content', function () {
        PackageFactory.setPackage($scope.package)
    })


});
