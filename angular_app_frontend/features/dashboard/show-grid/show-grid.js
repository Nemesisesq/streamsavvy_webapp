function interceptor(obj) {
    console.log(obj)

}

function checkForHuluWithShowtime(services) {
    return _.some(services, function (elem) {
        return elem.source == "hulu_with_showtime";
    });
}

function removeHuluIfShowtimeContent(services) {
    return _.filter(services, function (elem) {
        if (elem.source == "hulu_with_showtime") {
            return false
        }

        if (elem.source == "showtime_free") {
            return false
        }

        if (elem.source == "hulu_free") {
            return false
        }

        if (elem.source == "hulu_plus") {
            return false
        }

        if (elem.display_name == "Showtime Anytime") {
            return false
        }

        return true
    });
}

app.controller('ShowGridController', function ($scope, $rootScope, $q, $http, $timeout, PackageFactory, VIEW_WINDOWS, $compile, ShowDetailAnimate, $window) {

    var liveServices = ['cw', 'pbs', 'sling', 'cbs', 'nbc', 'abc', 'thecw', 'showtime_subscription', 'hbo_now', 'showtime', 'fox'];
    var onDemandServices = ['acorntv','cwseed', 'hulu_plus', 'hulu','hulu_free', 'nbc', 'starz', 'showtime_subscription', 'crackle'];
    var bingeServices = ['netflix', 'amazon_prime', 'seeso', 'tubi_tv', 'starz', 'starz_tveverywhere', 'showtime_subscription'];
    var payPerServices = ['google_play', 'itunes', 'amazon_buy', 'youtube_purchase', 'vudu'];

    var openingDetail = false


    $scope.$watch(function () {
        return PackageFactory.getChosenShow();
    }, function () {


        $scope.cs = PackageFactory.getChosenShow();

        $scope.detailSources = (function () {
            debugger;

            if ($scope.cs.guidebox_data != undefined) {


                var x = _($scope.cs.channel)
                    .concat($scope.cs.guidebox_data.sources.web.episodes.all_sources, $scope.cs.guidebox_data.sources.ios.episodes.all_sources)
                    .map(function (elem) {

                        if (elem.guidebox_data != undefined) {
                            elem.source = elem.guidebox_data.short_name
                        }
                        return elem
                    }).map(function (elem) {
                        if (elem.source == 'hulu_free') {
                            elem.source = 'hulu_plus';
                            return elem
                        }

                        if (elem.source == 'starz_tveverywhere') {
                            elem.source = 'starz'
                        }

                        if(elem.source == 'showtime_subscription'){
                            elem.source = 'showtime'
                        }

                        return elem;
                    })
                    .thru(function (services) {
                        if (checkForHuluWithShowtime(services)) {
                            services = removeHuluIfShowtimeContent(services)
                        }

                        return services
                    })

                    .uniqBy('source')
                    .uniqBy(function (elem) {
                        if (elem.display_name) {
                            return elem.display_name

                        } else {
                            return elem.name
                        }
                    })
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
                                services.binge.push(service);
                                services.live.push(service);
                            }

                        })
                        debugger;
                        if (_.some(services.on_demand, ['source', 'starz'])) {

                            if (services.binge == undefined) {
                                services.binge = []
                            }
                            services.binge.push(_.takeWhile(services.on_demand, {'source' :'starz'})[0]);

                        }

                        if (services.live) {
                            _.map(services.live, function (elem) {
                                // debugger


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

                                    elemCopy.source = 'sling_tv';

                                    services.live.push(elemCopy)


                                }

                                if (elem.source == "cbs") {


                                    if (!services.binge) {
                                        services.binge = []
                                    }
                                    services.binge.push(elem);

                                    if (!services.on_demand) {
                                        services.on_demand = []
                                    }
                                    services.on_demand.push(elem)
                                }

                                if (elem.source == "hbo_now") {

                                    if (!services.binge) {
                                        services.binge = []
                                    }
                                    services.binge.push(elem)

                                    if (!services.on_demand) {
                                        services.on_demand = []
                                    }

                                    services.on_demand.push(elem)
                                }
                                debugger;

                                if (elem.source == "showtime_subscription" || elem.source == "showtime") {

                                    if (!services.binge) {
                                        services.binge = []
                                    }
                                    services.binge.push(elem)

                                    if (!services.on_demand) {
                                        services.on_demand = []
                                    }

                                    services.on_demand.push(elem)
                                }

                                //

                                return elem

                            })
                        }
    
                        if ($scope.cs.on_netflix) {
                            if (!services.hasOwnProperty('binge')) {
                                services.binge = []

                            }

                            var netflix_channel = _.some(services.binge, ['source', 'netflix']);

                            if (!netflix_channel) {
                                services.binge.push({source: 'netflix'})
                            }
                        }


                        return services
                    })
                    .thru(function (services) {
                        var nbc = _.remove(services.live, function (item) {
                            return item.source == 'nbc';
                        })

                        if (nbc.length > 0) {
                            if (services.on_demand == undefined) {
                                services.on_demand = nbc
                            } else {

                                services.on_demand = _.concat(services.on_demand, nbc)
                            }
                        }

                        if (!Object.keys) Object.prototype.keys = function (o) {
                            if (o !== Object(o))
                                throw new TypeError('Object.keys called on a non-object');
                            var k = [], p;
                            for (p in o) if (Object.prototype.hasOwnProperty.call(o, p)) k.push(p);
                            return k;
                        }

                        $scope.sortedServices = _.sortBy(Object.keys(services), function (elem) {
                            return elem.length
                        })

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
        var pkg = PackageFactory.getPackage()

        pkg.data.content = []

        PackageFactory.setPackage(pkg)
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

        if ($window.innerWidth < 768) {
            $('body').addClass('black-mobile-bg')
            $('#search-and-shows').fadeOut()
        }

        $('#search-and-shows').addClass('no-scroll');


        if (openingDetail || !_.isEmpty($('.placeholder'))) {
            return
        }

        openingDetail = true;


        window.scrollTo(0, 0);
        // $('body').css('overflow', 'hidden');

        PackageFactory.setChosenShow(item);

        // verifySelectedShowDetails()
        var positionItem = ev.currentTarget,
            scaleItem = ev.target,
            container = document.getElementById('search-and-shows');
        $(scaleItem).attr('id', 'scaled-from')
        $(positionItem).attr('id', 'is-opened')
        $rootScope.showSearchView = false;
        $rootScope.$broadcast('save_package');
        $('mobile-tabs').fadeOut();
        ShowDetailAnimate.loadContent(positionItem, scaleItem, container)
            .then(function (v) {
                return $timeout(function () {

                    // var detail = angular.element(document.createElement('show-detail'));

                    // $rootScope.showDetailDirective = true;

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
                    $('body').removeClass('black-mobile-bg')
                    $('#search-and-shows').fadeIn()

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
