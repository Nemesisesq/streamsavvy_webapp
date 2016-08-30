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

app.controller('ShowGridController', function ($scope, $rootScope, $q, $http, $timeout, PackageFactory, $compile, ShowDetailAnimate, $window, $log, $sessionStorage, sInfo, Utils, unchosenFilter, growl) {

    $('body').addClass('gradient-background')


    var masterPopShows = []

    $scope.addPopularShow = function (suggestion) {

        var ssPackage = PackageFactory.getPackage();

        if ('hidden' in ssPackage.data.services) {
            ssPackage.data.services.hidden = [];
        }

        if (suggestion !== undefined) {
            if (_.some(ssPackage.data.content, ['url', suggestion.url])) {
                growl.warning('You already added ' + suggestion.title + ' to your package!');
                $scope.suggestions = [];
                return
            }

            var parser = document.createElement('a');
            parser.href = suggestion.url

            url = /api/.test(parser.pathname) ? parser.pathname : '/api' + parser.pathname
            $http.get(url)
                .then(function (data) {

                    suggestion = Utils.fixGuideboxData(data.data)

                    if (suggestion.guidebox_data.id !== undefined && typeof suggestion.guidebox_data.id === 'number') {
                        $scope.loading = true;

                        suggestion.justAdded = true;

                        if (_.includes(ssPackage.data, function (elem) {
                                return elem.url == suggestion.url

                            })) {
                            growl.warning('You already added ' + suggestion.title + ' to your package!');
                            return
                        }
                        ssPackage.data.content.push(suggestion);

                        PackageFactory.setPackage(ssPackage);

                        $scope.loading = false;
                        mixpanel.track("Show added", {
                            "id": 5,
                            "show_title": suggestion.title,
                            "user": $window.sessionStorage.user
                        });
                    }
                    return data
                })
                .then(function (data) {
                    $scope.popularShows = unchosenFilter(masterPopShows, $scope)


                    getNextPopularShows()
                })
        }
    };


    var openingDetail = false

    $scope.removeShow = function (show, $event) {
        var pkg = PackageFactory.getPackage()

        $q.when($($event.currentTarget).parent().fadeOut)
            .then(function (data) {

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

                $scope.package = pkg
                return data
            })
            .then(function () {
                $scope.popularShows = unchosenFilter(masterPopShows, $scope)
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
    // $('body').addClass('gradient-background');

    var next = ""
    $http.get('api/popular-shows')
        .success(function (data) {
            masterPopShows = data.results;
            next = data.next
            $scope.popularShows = unchosenFilter(masterPopShows, $scope)
            return data
        })
        .then(function () {
            // ;
            //$('.popular-shows').slick();
        });

    var getNextPopularShows = function () {
        if ($scope.popularShows.length < 20) {
            $http.get(next)
                .then(function (data) {
                    masterPopShows = _.concat(masterPopShows, data.data.results)
                    $scope.popularShows = unchosenFilter(masterPopShows, $scope)
                    next = data.data.next
                })
        }
    }


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
        $('#mobile-nav-buttons').fadeOut();

        $scope.showCloseButton = true

        $('.mobile-tab-close').fadeIn();

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


        $('.mobile-tab-close').fadeOut();
        $scope.showCloseButton = false;
        $('#mobile-nav-buttons').fadeIn();

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


                }

            })


    };

    $scope.$on('close_overlay', $scope.hideDetail);

    $('div').css('max-width', window.innerWidth)

    var bgh =$('#bg-img').height()
    var bgw =$('#bg-img').width()

    $('#bg-img + img').height(bgh)
    $('#bg-img + img').width(bgw)


    $scope.$watch(function () {
        return PackageFactory.getPackage()
    }, function () {
        $scope.package = PackageFactory.getPackage();


    });

    $scope.$watch(function () {
        return PackageFactory.getChosenShow()
    }, function () {
        $scope.cs = PackageFactory.getChosenShow();


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

        $http.post('/edr/', data)
            .then(function (data) {

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


