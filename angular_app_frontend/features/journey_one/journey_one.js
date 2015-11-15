app.controller('JourneyOneController', function ($scope, $rootScope, http, _) {
    $scope.hardware = [];
    $scope.package = [];
    $scope.packageList = {};
    $scope.providerObj = [];

    $scope.providers = [];
    $scope.rows = [];

    $scope.cost = {
        services: 0,
        hardware: 0
    };

    $scope.cableCost = 75.00;

    $scope.savings = $scope.cableCost - $scope.cost.services;


    $rootScope.loadPackage = function () {
        return http.getPackage()
            .then(function (data) {
                $scope.package = data;
                $scope.packageList = data.content;
                //$rootScope.step3ButtonMessage = $scope.package.hardware.length ? 'Right On! Time to Review.' : 'Sorry Partner You Need Some Hardware';
                $rootScope.step2ButtonMessage = $scope.package.providers.length ? 'Time to pick out the Hardware' : 'You still need to select a service';
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
    };

    var loadHardware = function () {
        http.getHardware()
            .then(function (hware) {

                var userHardwareUrls = _.map($scope.package.hardware, function (item) {
                    return item.url

                });

                $scope.hardware = _.map(hware.results, function (item) {
                    if (_.includes(userHardwareUrls, item.url)) {
                        item.selected = true;
                        return item
                    } else {
                        item.selected = false;
                        return item
                    }
                })


            })
    };
    var loadProviderContentHash = function () {

        var rows = _.map($scope.providers, function (provider) {
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

        $scope.rows = _.filter(rows, function (obj) {
            return _.isEqual(obj.service.channel_type, "online")
        });

        var selectedShows = _.flatten(
            _.map(rows, function (row) {
                if (row.selected) {
                    return row.content
                } else {
                    return []
                }
            })
        );


        $scope.rows = _.map($scope.rows, function (row) {
            if (!row.selected) {
                row.content = _.filter(row.content, function (show) {
                    return !_.includes(selectedShows, show)
                });
            }

            return row;
        });

        $scope.rows = _.sortByAll($scope.rows, ['selected', 'content'], _.values).reverse();


        return $scope.rows

    };


    var calculateTotalCost = function () {
        $scope.cost.services = 0;
        _.each($scope.package.providers, function (p) {
            $scope.cost.services += p.retail_cost;
        });

        $scope.savings = $scope.cableCost - $scope.cost.services;


    }

    $scope.toggleService = function (row) {
        http.getRestPackage()
            .then(function (p) {
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
            .then(loadHardware)
            .then(loadProviderContentHash)
            .then(calculateTotalCost);
    };

    $rootScope.load()

});
