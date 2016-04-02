app.controller('ShowGridController', function ($scope, $rootScope, $q, $http, $timeout, PackageFactory, VIEW_WINDOWS, $compile, ShowDetailAnimate) {
    //$rootScope.showDetailDirective = false;

    function verifySelectedShowDetails() {
        debugger;
        var chosen = PackageFactory.getChosenShow()
        if (chosen.detail == undefined) {
            $http.get(chosen.url)
                .then(function (res) {
                    debugger;
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
                return $timeout(function () {
                    debugger;

                    $rootScope.showSearchView = true;
                    $('.show-grid').removeClass('blur-and-fill');
                }, 500)
            })
            .then(function (v) {
                debugger;
                $('body').css('overflow', 'scroll');

            })


    }


    $scope.$watch(function () {
        return PackageFactory.getPackage()
    }, function () {
        $scope.package = PackageFactory.getPackage();
    })

    $scope.$watch(function () {
        return PackageFactory.getChosenShow()
    }, function () {
        $scope.cs = PackageFactory.getChosenShow();
        $scope.chosenSourceList = PackageFactory.getChosenShow().guidebox_data.sources.web.episodes.all_sources;
    })


    $scope.savePackage = function () {
        PackageFactory.setPackage($scope.package)
    }

    $scope.$watchCollection('package.content', function () {

        PackageFactory.setPackage($scope.package)
    })
});