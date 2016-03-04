app.controller('ServicePanelController', function ($scope, $http, $timeout, PackageFactory, VIEW_WINDOWS) {

    $scope.hello = 'world'

    var ssPackage = PackageFactory.getPackage()
    //debugger
    $scope.listOfServices = _
        .chain(ssPackage.data.content)
        .map(function (elem) {
            //debugger
            return elem.channel
        })
        .flatten()
        .uniqBy('url')
        .map(function (elem) {
            var o = {chan: elem}
            debugger;
            o.shows = _.filter(ssPackage.data.content, function (show) {
                debugger;
                return _.some(show.channel, ['url', elem.url])
            })

            return o

        })
        .value();


    $scope.$watch(function () {
        return PackageFactory.getPackage()
    }, function () {
        ssPackage = PackageFactory.getPackage();
    })


});