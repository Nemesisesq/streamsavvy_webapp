app.controller('ShowGridController', function ($scope, $rootScope, $q, $http, $timeout, PackageFactory, VIEW_WINDOWS, $compile, ShowDetailAnimate) {
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
        debugger;
        _.remove($scope.package.content, content);
        $scope.savePackage()
        PackageFactory.updatePackageChannels($scope)
    }

    $scope.showDetail = function (item, ev, attrs) {

        $('body').css('overflow', 'hidden');

        PackageFactory.setChosenShow(item);
        verifySelectedShowDetails()
        // debugger;
        var positionItem = ev.currentTarget,
            scaleItem = ev.target,
            container = document.getElementById('search-and-shows');
        // debugger;
        $(scaleItem).attr('id', 'scaled-from')
        $(positionItem).attr('id', 'is-opened')
        //debugger;
        $rootScope.showSearchView = false;
        $rootScope.$broadcast('save_package');
        ShowDetailAnimate.loadContent(positionItem, scaleItem, container)
            .then(function (v) {
                return $timeout(function () {
                    //debugger;

                    var detail = angular.element(document.createElement('show-detail'));

                    $rootScope.showDetailDirective = true;
                    //debugger;

                }, 500)
            })
            .then(function (v) {
                $('show-detail').addClass('fade-in');
                //$('show-detail').removeClass('fade');
            })

        $('.show-grid').addClass('blur-and-fill');


    }

    $scope.hideDetail = function (ev, attrs) {
        // debugger;

        var positionItem = document.getElementById('is-opened'),
            scaleItem = document.getElementById('scaled-from'),
            container = document.getElementById('search-and-shows');
        $q.when($('show-detail').removeClass('fade-in'))
            .then(function () {
                $rootScope.showSearchView = true;
                $rootScope.showDetailDirective = false
            })
            .then(ShowDetailAnimate.hideContent.bind(null, positionItem, scaleItem, container))
            .then(function (v) {
                return $timeout(function () {
                    // debugger;

                    $('.show-grid').removeClass('blur-and-fill');
                }, 500)
            })
            .then(function (v) {
                //debugger;
                $('body').css('overflow', 'scroll');

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
        $scope.cs.services = [];
        var onDemand = {
            title: "ON DEMAND",
            cbs: false,
            hulu_plus: false,
            nbc: false,
            pbs: false,
            showtime: false,
            starz: false
        };
        var binge = {
            title: "BINGE",
            amazon_prime: false,
            thecw: false,
            netflix: false,
            Seeso: false,
            youtube_purchase: false
        };
        var payPer = {
            title: "PAY PER EPISODE / SEASON",
            amazon_buy: false,
            google_play: false,
            itunes: false,
            vudu: false
        };
        $scope.cs.windows = [onDemand, binge, payPer];
        if ($scope.cs.channel[0].guidebox_data.short_name == 'amazon') {
            $scope.cs.services.push('amazon_buy');
        }
        //for netflix originals
        if ($scope.cs.channel[0].name == 'Netflix' ){
            $scope.cs.services.push('netflix');
        }
        _.forEach(PackageFactory.getChosenShow().guidebox_data.sources.web.episodes.all_sources, function (arrayElem) {
            $scope.cs.services.push(arrayElem.source);
        });
        //iterates through each of the shows services
        _.forEach($scope.cs.services, function(serv) {
            //checks to see if those services are in any of the prebuilt windows and sets them to true
            _.forEach($scope.cs.windows, function(window) {
                _.forOwn(window, function(value, key) {
                    if( key == serv )
                        {window[key] = true;}
                     }
                );
            });
        });



    })


    $scope.savePackage = function () {
        PackageFactory.setPackage($scope.package)
    }

    $scope.$on('save_package', function(){
        debugger;
       PackageFactory.setPackage($scope.package)
    });

    $scope.$watchCollection('package.data.content', function () {
        debugger;
        PackageFactory.setPackage($scope.package)
    })


});