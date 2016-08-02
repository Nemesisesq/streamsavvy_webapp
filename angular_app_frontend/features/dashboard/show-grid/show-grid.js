function interceptor(obj) {
    return obj
}

function checkForHuluWithShowtime(services) {
    return _.some(services, function (elem) {
        try {

            return elem.source == "hulu_with_showtime";
        }

        catch (e) {

            return false
        }
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

app.controller('ShowGridController', function ($scope, $rootScope, $q, $http, $timeout, PackageFactory, $compile, ShowDetailAnimate, $window, $log, $sessionStorage, sInfo) {


    var openingDetail = false

    $scope.removeShow = function (show, $event) {
        debugger
        var pkg = PackageFactory.getPackage()

        $q.when($($event.currentTarget).parent().fadeOut)
            .then(function () {

                if (show.category) {
                    // TODO fix this ugly hack
                    pkg.data.sports = _.filter(pkg.data.sports, function (elem) {
                        return elem != show;
                    })
                }

                pkg.data.content = _.filter(pkg.data.content, function (elem) {
                    return elem != show;
                })

                PackageFactory.setPackage(pkg)

            })


    }


    $scope.$watch(function () {
        return PackageFactory.getChosenShow();
    }, function () {


        var cs = PackageFactory.getChosenShow();

        //
        if (!_.isEmpty(cs)) {

            $http.post('/node-data/detailsources', cs)
                .then(function (data) {
                    $scope.detailSources = data.data
                })
        }
    })


    //$rootScope.showDetailDirective = false;


    $scope.hello = 'clear package';

    $scope.clearContent = function () {
        var pkg = PackageFactory.getPackage();

        pkg.data.content = [];

        PackageFactory.setPackage(pkg)
    };

    $rootScope.showSearchView = true;


    $('body').removeAttr('id');
    $('body').addClass('gradient-background');


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

    var openingDetail;

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

        if (!item.is_category) {
            PackageFactory.setChosenShow(item);
        } else {
            $scope.$broadcast('category_clicked', item)
        }

        if (item == $scope.cs) {
            $http.post('/node-data/detailsources', $scope.cs)
                .then(function (data) {
                    $scope.detailSources = data.data
                })
        }


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
                if (item.is_category) {
                    $('category-detail').addClass('fade-in')
                    scrolledDistance = $('#search-and-shows').scrollTop()
                    $('category-detail').css({top: 55 + scrolledDistance})
                } else {


                    $('show-detail').addClass('fade-in');
                    var showDetailTop = $('show-detail').offset().top,
                        scrolledDistance = $('#search-and-shows').scrollTop()
                    $('show-detail').css({top: 55 + scrolledDistance})

                }
            })

        $('.show-grid').addClass('blur-and-fill');

        openingDetail = false


    }, 50);

    $(document).keyup(function (event) {
        var keyCode = event.which || event.keyCode;
        if (keyCode == 27) {
            $scope.hideDetail()
        }

    })

    $scope.hideDetail = function (ev, loc) {

        mixpanel.track('Close overlay', {
            "id": 6,
            "user": $window.sessionStorage.user,
            "event": loc

        })
        var positionItem = document.getElementById('is-opened'),
            scaleItem = document.getElementById('scaled-from'),
            container = document.getElementById('search-and-shows');
        $q.when(function () {
            $('category-detail').removeClass('fade-in')

            $('show-detail').removeClass('fade-in')


        }())
            .then(function () {


                $rootScope.showDetailDirective = false
            })
            .then(ShowDetailAnimate.hideContent.bind(null, positionItem, scaleItem, container))
            .then(function (v) {
                return $timeout(function () {
                    //  ;

                    $rootScope.showSearchView = true;
                    $('.show-grid').removeClass('blur-and-fill');
                }, 500)
            })
            .then(function (v) {
                // ;
                // $('body').css('overflow', 'scroll');
                $(scaleItem).removeAttr('id');
                $(positionItem).removeAttr('id');

                $('#search-and-shows').removeClass('no-scroll');


                if ($window.innerWidth < 768) {
                    $('body').css({'overflow': 'scroll'});
                    $('body').removeClass('black-mobile-bg');
                    $('#search-and-shows').fadeIn();

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
    $scope.$watchCollection('package.data.sports', function () {
        PackageFactory.setPackage($scope.package)
    })


    var email_device = _.debounce(function () {

        var client = new ClientJS();
        var data = {

            email: $sessionStorage.user || 'anon',
            fingerprint: client.getFingerprint(),
            browser: client.getBrowser(),
            browserVersion: client.getBrowserVersion(),
            device: client.getDevice(),
            deviceType: client.getDeviceType(),
            deviceVendor: client.getDeviceVendor(),
            time: moment.now(),
            timeZone: client.getTimeZone(),
            platform: clientInformation.platform,
            appVersion: clientInformation.appVersion,
            package: PackageFactory.getPackage()

        }

        $http.post('https://edr-go-prod.herokuapp.com/data', data)
            .then(function (data) {
                console.log('datq')
            }, function (err) {
                // $log(err)
            })
    }, 500)

    // $scope.$watch($sessionStorage.user, function () {
    //     debugger;
    //     email_device()
    // })

    sInfo.listen(email_device)


});


