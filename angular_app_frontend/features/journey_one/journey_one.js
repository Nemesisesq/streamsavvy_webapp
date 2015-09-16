app.controller('JourneyOneController', function ($scope, $rootScope, http, _) {

    $scope.packageList = {};


    $scope.providers = [];
    $scope.rows = [];

    $rootScope.loadPackage = function () {
        debugger;
        return http.getPackage()
            .then(function (data) {
                debugger
                $scope.packageList = data.content;
                return data
            });
    };

    $scope.removeShow = function (show) {
        debugger;
        http.getRestPackage()
            .then(function (p) {
                _.remove(p.content, function (elem) {
                    debugger;
                    var elemArray = elem.split('/');
                    var elemId = elemArray[elemArray.length - 2];
                    return elemId == show.id;
                });


                http.putPackage(p)
                    .then(function () {
                        debugger;
                        $rootScope.loadPackage();
                        $scope.apply()
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
            debugger;
            $scope.providers = [];
            _.forEach($scope.packageList, function (show) {
                _.forEach(show.content_provider, function (provider) {
                    if (!_.includes($scope.providers, provider.name)) {

                        $scope.providers.push(provider.name)
                    }
                })

            })
        },
        loadProviderContentHash = function () {

            $scope.rows = _.map($scope.providers, function (provider) {
                debugger;
                var obj = {
                    service: provider,
                    content:[]
                };

                obj.content = _.filter($scope.packageList, function(c){
                    var cProviders = _.map(c.content_provider, function(content_provider){
                        return content_provider.name
                    })

                    return _.includes(cProviders, provider)
                })

                return obj

            })

        };


    $rootScope.load = function () {
        debugger;

        $rootScope.loadPackage()
        .then(loadProviders)
        .then(loadProviderContentHash);
    };

    $rootScope.load()

});
