app.controller('chart', function ($scope, http, _, $rootScope) {
    $scope.showArray = [];
    $scope.providers = [];
    $scope.rows = [];
    $scope.providerList = [
        {name: 'netflix'},
        {name: 'hulu'},
        {name: 'sling'},
        {name: 'hbo'}

    ];


    $scope.mockShows = [
        {name: 'Orange is the new black', showProviders: [true, false, true, false]},
        {name: 'Airwolf', showProviders: [true, true, false, false]},
        {name: 'Bleach', showProviders: [false, true, false, false]},
        {name: 'Game of Thrones', showProviders: [false, false, true, false]},
        {name: 'Spaceman', showProviders: [true, false, false, false]},
        {name: 'Prison Break', showProviders: [true, true, true, false]},
        //{name: 'Followers', showProviders: [true, false, true, false]}
    ];

    $scope.removeShow = function (show) {
        http.getRestPackage()
            .then(function (package) {
                _.remove(package.content, function (elem) {
                    var elemArray = elem.split('/');
                    var elemId = elemArray[elemArray.length - 2];
                    return elemId == show.id;
                });

                http.putPackage(package)
                    .then(function (result) {
                        $rootScope.load()
                        $scope.$apply()
                    })
            })
    }


    var loadPackage = function () {
            return http
                .getPackage()
                .then(function (package) {
                    $scope.package = package;
                    return package;
                })
        },
        loadContentHeaderObjects = function () {
            $scope.providers = [];
            _.forEach($scope.package.content, function (show) {
                _.forEach(show.content_provider, function (provider) {
                    if (!_.includes($scope.providers, provider.name)) {

                        $scope.providers.push(provider.name)
                    }
                })

            })

            //TODO marked for Deletion
            //$scope.package.content.content_provder.forEach(function (provider) {
            //    deffered.resolve(
            //        _.contains($scope.providers, provider) || $scope.providers.push(provider)
            //    )
            //})

            //return deffered.promise
        },
        loadContentRowObjects = function () {

            $scope.rows = _.map($scope.package.content, function (content) {
                var obj = {};
                obj.title = content.title;
                obj.id = content.id;
                obj.providerCellValues = _.map($scope.providers, function (elem) {
                    var providerObj = _.map(content.content_provider, function (prov) {
                        return prov.name
                    });

                    return _.includes(providerObj, elem)
                });

                return obj;
            })

        };


    $rootScope.load = function () {

        loadPackage()
        .then(loadContentHeaderObjects)
        .then(loadContentRowObjects);
    };

    $rootScope.load()
});