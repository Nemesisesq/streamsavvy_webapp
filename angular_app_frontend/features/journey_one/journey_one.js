app.controller('JourneyOneController', function ($scope, $rootScope, http, _) {
    $scope.package = [];
    $scope.packageList = {};
    $scope.providerObj = [];

    $scope.providers = [];
    $scope.rows = [];

    $rootScope.loadPackage = function () {
        return http.getPackage()
            .then(function (data) {
                $scope.package = data;
                $scope.packageList = data.content;
                return data
            });
    };

    $scope.removeShow = function (show) {
        http.getRestPackage()
            .then(function (p) {
                _.remove(p.content, function (elem) {

                    return elem == show.url;
                });


                http.putPackage(p)
                    .then(function () {
                        $rootScope.loadPackage();

                    })
            })
    };


    //$rootScope.loadPackage();

    //$scope.removeShow = function (show) {
    //    http.getRestPackage()
    //        .then(function (package) {
    //            _.remove(package.content, function (elem) {
    //                debugger;
    //                var elemArray = elem.split('/');
    //                var elemId = elemArray[elemArray.length - 2];
    //                return elemId == show.id;
    //            });
    //
    //            debugger;
    //            http.putPackage(package)
    //                .then(function (result) {
    //                    $rootScope.load()
    //                    $scope.$apply()
    //                })
    //        })
    //}


    //var loadPackage = function () {
    //        return http
    //            .getPackage()
    //            .then(function (package) {
    //                $scope.package = package;
    //                return package;
    //            })
    //    },

    var loadProviders = function () {
        $scope.providers = [];
        _.forEach($scope.packageList, function (show) {
            _.forEach(show.content_provider, function (provider) {
                if (!_.includes($scope.providers, provider.name)) {

                    $scope.providers.push(provider.name);
                    $scope.providerObj.push(provider);
                }
            })

        })
    }
    var loadProviderContentHash = function () {

        $scope.rows = _.map($scope.providers, function (provider) {

            var prov = _.find($scope.providerObj, function (obj) {
                return obj.name == provider;
            });

            var obj = {
                service: prov,
                content: []
            };


            obj.content = _.filter($scope.packageList, function (c) {

                var cProviders = _.map(c.content_provider, function (content_provider) {
                    return content_provider.name
                });


                return _.includes(cProviders, provider)
            });


            var selectedProviders = _.map($scope.package.providers, function (pp) {
                return pp.name

            });

            obj.selected = _.includes(selectedProviders, provider);


            return obj

        });

        return $scope.rows

    };

    $scope.toggleService = function (row) {
        http.getRestPackage()
            .then(function (p) {


                debugger;
                if (!row.selected) {
                    p.providers.push(row.service.url);

                    http.putPackage(p)
                        .then(function (d) {
                            console.log(d);
                            $rootScope.load()
                        })

                } else {
                    _.remove(p.providers, function (elem) {
                        return elem == row.service.url
                    })

                    http.putPackage(p)
                        .then(function (d) {
                            console.log(d);
                            $rootScope.load()
                        })

                }


            })
    }

    $rootScope.load = function () {

        $rootScope.loadPackage()
            .then(loadProviders)
            .then(loadProviderContentHash);
    };

    $rootScope.load()

});
