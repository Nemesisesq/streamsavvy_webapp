app.controller('ServicePanelController', function ($scope, $http, $timeout, PackageFactory, VIEW_WINDOWS) {

    $scope.hello = 'world';

    var ssPackage = PackageFactory.getPackage();
    $scope.pkg = PackageFactory.getPackage();
    var payPerServices = ['vudu', 'amazon_buy', 'google_play', 'itunes'];


    function check_if_on_sling(obj) {

        if (obj.chan.on_sling) {
            return true
        } else if (obj.chan.is_on_sling) {
            return true
        } else {
            return false
        }

    }

    // $scope.payPerShows = [];
    var updateServices = function () {
        if ('data' in ssPackage) {
            $scope.listOfServices = _
                .chain(ssPackage.data.content)
                .map(function (elem) {
                    _.forEach(elem.channel, function (c) {
                        // debugger;
                        c.source = c.guidebox_data.short_name
                    })
                    var list
                    elem.guidebox_data.sources == undefined ? list = elem.channel : list = _.concat(elem.channel, elem.guidebox_data.sources.web.episodes.all_sources);
                    //list = elem.guidebox_data.sources.web.episodes.all_sources;
                    return list
                })
                .flatten()
                .uniqBy('source')
                .map(function (elem) {
                    //debugger
                    if (elem.guidebox_data != undefined) {
                        elem.display_name = elem.guidebox_data.name
                        return elem
                    } else {
                        return elem
                    }
                })
                .thru(function (list) {
                    var clean = _.filter(list, function (elem) {
                        // debugger;

                        var res = !_.some(list, function (mem) {

                            if (mem != elem) {
                                // debugger;
                                if (RegExp(elem.display_name).test(mem.display_name)) {
                                    // debugger;
                                    return mem.is_over_the_air && !elem.is_on_sling
                                }

                            }
                            return false
                        })

                        return res


                    });
                    //debugger;
                    return clean
                })
                .map(function (elem) {
                    var o = {chan: elem}
                    o.shows = _.filter(ssPackage.data.content, function (show) {
                        if (show.guidebox_data.sources) {
                            var source_check = _.some(show.guidebox_data.sources.web.episodes.all_sources, ['source', elem.source])
                        } else {
                            source_check = false
                        }

                        var url_check = _.some(show.channel, ['url', elem.url]);
                        return url_check || source_check
                    })

                    if (o.chan.guidebox_data) {
                        if (o.chan.guidebox_data.is_over_the_air) {
                            o.chan.is_over_the_air = o.chan.guidebox_data.is_over_the_air;
                        }
                    }

                    return o

                })
                .filter(function (elem) {
                    return elem.chan.source != "netflix"
                })
                .groupBy(function (elem) {
                    if (elem.chan.is_over_the_air) {
                        return 'ota'
                    }
                    if (check_if_on_sling(elem)) {
                        return 'sling'
                    }

                    if (_.includes(payPerServices, elem.chan.source)) {
                        return 'ppv'

                    }
                    else {
                        return 'not_ota'
                    }
                })
                .value();

            PackageFactory.setListOfServices($scope.listOfServices);
        }
    }

    updateServices()
    $scope.$watchCollection(function () {
        return PackageFactory.getPackage().data.content

    }, function () {
        ssPackage = PackageFactory.getPackage();
        $scope.pkg = PackageFactory.getPackage();

        updateServices()
    })


});

