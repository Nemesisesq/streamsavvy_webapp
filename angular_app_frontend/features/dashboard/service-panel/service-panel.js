app.controller('ServicePanelController', function ($scope, $http, $timeout, PackageFactory, VIEW_WINDOWS) {

    $scope.hello = 'world';

    var ssPackage = PackageFactory.getPackage();
    //debugger
    var updateServices = function () {
        $scope.listOfServices = _
            .chain(ssPackage.data.content)
            .map(function (elem) {
                _.forEach(elem.channel, function (c) {
                    c.source = c.guidebox_data.short_name
                })
                var list
                elem.guidebox_data.sources == undefined ? list = elem.channel : list = _.concat(elem.channel, elem.guidebox_data.sources.web.episodes.all_sources)
                return list
            })
            .flatten()
            .uniqBy('source')
            .map(function (elem) {
                var o = {chan: elem}
                //debugger;
                o.shows = _.filter(ssPackage.data.content, function (show) {
                    debugger;
                    if (show.guidebox_data.sources){
                        var source_check = _.some(show.guidebox_data.sources.web.episodes.all_sources, ['source', elem.source])
                    } else {
                        source_check = false
                    }

                    var url_check = _.some(show.channel, ['url', elem.url]);
                    return url_check || source_check
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

