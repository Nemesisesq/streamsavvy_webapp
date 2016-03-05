app.controller('ServicePanelController', function ($scope, $http, $timeout, PackageFactory, VIEW_WINDOWS) {

    $scope.hello = 'world';

    var ssPackage = PackageFactory.getPackage();
    //debugger
    var updateServices = function () {
        $scope.listOfServices =_
            .chain(ssPackage.data.content)
            .map(function (elem) {
                //debugger
                return elem.channel
            })
            .flatten()
            .uniqBy('url')
            .map(function (elem) {
                var o = {chan: elem}
                //debugger;
                o.shows = _.filter(ssPackage.data.content, function (show) {
                    return _.some(show.channel, ['url', elem.url])
                })

                return o

            })
            .value();
    }

    updateServices()
    $scope.$watchCollection(function () {
        return PackageFactory.getPackage().data.content

    }, function () {
        debugger;
        ssPackage = PackageFactory.getPackage();
        updateServices()
    })


});

