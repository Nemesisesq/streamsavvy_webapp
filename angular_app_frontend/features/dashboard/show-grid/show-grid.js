app.controller('ShowGridController', function ($scope, $rootScope, $q, $http, $timeout, PackageFactory, VIEW_WINDOWS, $compile, ShowDetailAnimate, $window) {

    var liveServices = ['sling', 'cbs', 'nbc', 'abc', 'thecw', 'showtime_subscription', 'hbo_now', 'fox'];
    var onDemandServices = ['hulu_plus', 'nbc', 'starz', 'showtime_subscription', 'crackle'];
    var bingeServices = ['netflix', 'amazon_prime', 'seeso', 'tubi_tv', 'starz', 'starz_tveverywhere', 'showtime_subscription'];
    var payPerServices = ['google_play', 'itunes', 'amazon_buy', 'youtube_purchase', 'vudu'];

    var openingDetail = false

    $scope.$watch(function () {
        return PackageFactory.getChosenShow();
    }, function () {


        $scope.cs = PackageFactory.getChosenShow();

        $scope.detailSources = (function () {

            if ($scope.cs.guidebox_data != undefined) {
                debugger;


                var x = _($scope.cs.channel)
                    .concat($scope.cs.guidebox_data.sources.web.episodes.all_sources, $scope.cs.guidebox_data.sources.ios.episodes.all_sources)
                    .map(function (elem) {

                        if (elem.guidebox_data != undefined) {
                            elem.source = elem.guidebox_data.short_name
                        }
                        return elem
                    }).filter(function (elem) {
                        debugger;

                        // if (elem.hasOwnProperty('guidebox_data')) {
                        //     return elem.guidebox_data.is_over_the_air
                        // }

                        // if (elem.source == 'hulu_free') {
                        //     return false
                        // }

                        return true
                    })

                    .uniqBy('source')
                    .groupBy(function (service) {
                        debugger;
                        if (liveServices.includes(service.source)) {
                            return 'live'
                        }
                        if (service.is_on_sling || service.on_sling) {
                            return 'live'
                        }
                        if (onDemandServices.includes(service.source)) {
                            return 'on_demand'
                        }
                        if (bingeServices.includes(service.source)) {
                            return 'binge'
                        }
                        if (payPerServices.includes(service.source)) {
                            return 'pay_per_view'
                        }

                        return 'misc'
                    })
                    .thru(function (services) {
                        _.forEach(services.misc, function (service) {
                            if (service.source == 'hbo_now') {
                                services.live.push(service);
                                services.on_demand.push(service);
                                services.binge.push(service);
                            }
                            else if (service.source == 'showtime_subscription') {
                                services.on_demand.push(service);
                                service.binge.push(service);
                                service.live.push(service);
                            }
                            else if (service.source == 'starz') {
                                service.binge.push(service);
                                service.on_demand.push(service);
                            }
                        })

                        if (services.live) {
                            _.map(services.live, function (elem) {
                                // debugger

                                if (elem.is_over_the_air) {
                                    var elemCopy = _.cloneDeep(elem);
                                    elemCopy.name = 'OTA';
                                    delete elemCopy['id'];
                                    delete elemCopy['$$hashKey'];

                                    elemCopy.source = 'ota';

                                    services.live.push(elemCopy)
                                }
                                debugger;

                                if (elem.hasOwnProperty('guidebox_data') && elem.guidebox_data.is_over_the_air) {
                                    var elemCopy = _.cloneDeep(elem);

                                    elemCopy.name = 'OTA';
                                    delete elemCopy['id'];
                                    delete elemCopy['$$hashKey'];

                                    elemCopy.source = 'ota';

                                    services.live.push(elemCopy)
                                }

                                if (elem.is_on_sling || elem.on_sling) {
                                    var elemCopy = _.cloneDeep(elem);

                                    elemCopy.name = 'Sling';
                                    delete elemCopy['id'];
                                    delete elemCopy['$$hashKey'];

                                    elemCopy.source = 'sling-tv.svg';

                                    services.live.push(elemCopy)


                                }


                                //

                                return elem

                            })
                        }

                        if ($scope.cs.on_netflix) {
                            if (!services.hasOwnProperty('binge')) {
                                services.binge = []

                            }

                            services.binge.push({source: 'netflix'})
                        }


                        if (!Object.keys) Object.prototype.keys = function (o) {
                            if (o !== Object(o))
                                throw new TypeError('Object.keys called on a non-object');
                            var k = [], p;
                            for (p in o) if (Object.prototype.hasOwnProperty.call(o, p)) k.push(p);
                            return k;
                        }


                        $scope.sortedServices = Object.keys(services)
                            .sort();


                        return services
                    })
                    .value();
                return x;
            }
        })()

    })


    //$rootScope.showDetailDirective = false;


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

        $('body').css({'overflow': 'hidden'})
        $('#search-and-shows').addClass('no-scroll');


        if (openingDetail || !_.isEmpty($('.placeholder'))) {
            return
        }

        openingDetail = true;


        window.scrollTo(0, 0);
        // $('body').css('overflow', 'hidden');

        PackageFactory.setChosenShow(item);

        verifySelectedShowDetails()
        // debugger;
        var positionItem = ev.currentTarget,
            scaleItem = ev.target,
            container = document.getElementById('search-and-shows');
        $(scaleItem).attr('id', 'scaled-from')
        $(positionItem).attr('id', 'is-opened')
        //debugger;
        $rootScope.showSearchView = false;
        $rootScope.$broadcast('save_package');
        $('mobile-tabs').fadeOut();
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
                var showDetailTop = $('show-detail').offset().top,
                    scrolledDistance = $('#search-and-shows').scrollTop()
                $('show-detail').css({top: 55 + scrolledDistance})

                // $('show-detail').
                //$('show-detail').removeClass('fade');
            })

        $('.show-grid').addClass('blur-and-fill');

        openingDetail = false


    }, 50);

    $scope.hideDetail = function (ev, attrs) {
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
                // $('body').css('overflow', 'scroll');
                $(scaleItem).removeAttr('id')
                $(positionItem).removeAttr('id')

                $('#search-and-shows').removeClass('no-scroll');


                if ($window.innerWidth < 768) {
                    $('body').css({'overflow': 'scroll'})

                    $('mobile-tabs').fadeIn();
                }

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
