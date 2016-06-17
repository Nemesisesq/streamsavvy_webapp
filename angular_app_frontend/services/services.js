/**
 * Created by Nem on 6/27/15.
 */

function check_if_on_sling(obj) {

    if (obj.chan.on_sling) {
        return true
    } else if (obj.chan.is_on_sling) {
        return true
    } else {
        return false
    }

}

var payPerServices = ['vudu', 'amazon_buy', 'google_play', 'itunes', 'youtube_purchase'];

app.factory('N', function () {
    var _netflix_shows = []

    return {
        setShows: function (shows) {
            _netflix_shows = shows
        },
        getShows: function () {
            var f = new Fuse(_netflix_shows, {threshold: .2});
            return f;
        }

    }
})

app.factory('PackageFactory', ['$http', '$q', 'VIEW_WINDOWS', '_', function ($http, $q, VIEW_WINDOWS, _) {
    // ;

    var _package = {};

    var _env = ""

    var _test = 1;

    var _chosenShow = {};

    var _listOfServices = [];


    return {
        setChosenShow: function (show) {
            _chosenShow = show
        },

        getChosenShow: function () {
            return _chosenShow;
        },

        setPackage: function (ssPackage) {


            _package = ssPackage;

            if (!_.isEmpty(ssPackage)) {
                this.postPackage(ssPackage)
            }

        },

        postPackage: function (ssPackage) {
            $http.put(ssPackage.url, ssPackage);
        },

        getPackage: function () {
            return _package;
        },

        getSSTest: function () {
            // ;
            return _test;
        },

        updatePackageChannels: function (scope) {
            //debugger;

            if (scope.package.content.length == 0) {
                scope.package.providers = [];
            }


            return $q(function (resolve, reject) {

                var chans = _.map(scope.package.content, function (elem) {
                    var x = []

                    _.forEach(VIEW_WINDOWS, function (w) {

                        if (elem.viewingWindows !== undefined && elem.viewingWindows[w.type] !== undefined) {
                            var window = elem.viewingWindows[w.type];

                            if (window.selected && window.channel !== undefined) {
                                x.push(window.channel)
                            }

                        }

                    })


                    return x
                })

                chans = _.flatten(chans)

                //debugger;

                chans = _.uniq(chans, function (elem) {

                    if (elem.service !== undefined) {
                        return elem.service
                    }
                    return elem.source
                })

                scope.package.providers = chans
            })


        },

        totalServiceCost: function () {


            var t = 0;

            var pkg = _package;
            if (true) {

                t = _.map(pkg.providers, function (elem) {
                    return elem.price;
                })

                t = _.compact(t);

                t = _.reduce(t, function (total, n) {
                    return total + n
                })
            }

            t = _.round(t, 2)

            return t


        },
        totalHardwareCost: function () {


            var t = 0;

            var pkg = _package;


            t = _.map(pkg.hardware, function (elem) {
                return elem.retail_cost;
            })

            t = _.compact(t);

            t = _.reduce(t, function (total, n) {
                return total + n
            })


            t = _.round(t, 2)

            return t


        },

        getListOfServices: function () {

            return _listOfServices;
        },
        setListOfServices: function (listOfServices) {
            _listOfServices = listOfServices;
        },

        createListOfServices: function () {

            var ssPackage = this.getPackage();
            if ('data' in ssPackage) {
                var list = _
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
                    .groupBy(function (elem) {
                        if (elem.chan.is_over_the_air) {
                            return 'ota'
                        }
                        if (check_if_on_sling(elem)) {
                            return 'sling'
                        }


                        else {
                            return 'not_ota'
                        }
                    })
                    .thru(function (list) {

                        var showsOta = _.map(list.ota, function (elem) {
                            return elem.shows
                        })

                        if (list.ota && list.ota.length > 1) {
                            list.ota[0].shows = _.uniqBy(_.flatten(showsOta), 'url');
                            list.ota = [list.ota[0]];
                        }

                        var showsPpv = _.map(list.ppv, function (elem) {
                            return elem.shows
                        })

                        if (list.ppv && list.ppv.length > 1) {
                            list.ppv[0].shows = _.uniqBy(_.flatten(showsPpv), 'url');
                            list.ppv = [list.ppv[0]];
                        }


                        return list


                    })

                    .value();
                this.setListOfServices(list)

                return list
            }
        },

        catagorizeShowsByService: function (ssPackage) {
            return _.chain(ssPackage.data.content)
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
                    return elem.chan.source != "netflix" && elem.chan.source != 'misc_shows'
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
                .thru(function (list) {

                    var showsOta = _.map(list.ota, function (elem) {
                        return elem.shows
                    })

                    if (list.ota && list.ota.length > 1) {
                        list.ota[0].shows = _.uniqBy(_.flatten(showsOta), 'url');
                        list.ota = [list.ota[0]];
                    }

                    var showsPpv = _.map(list.ppv, function (elem) {
                        return elem.shows
                    })

                    if (list.ppv && list.ppv.length > 1) {
                        list.ppv[0].shows = _.uniqBy(_.flatten(showsPpv), 'url');
                        list.ppv = [list.ppv[0]];
                    }
                    debugger;

                    if (_.some(list.ota, function (item) {
                            return item.chan.source == 'nbc'
                        })) {
                            var nbc =_.takeWhile(list.ota, function(item){
                                return item.chan.source == 'nbc'
                            })

                            if(list.not_ota == undefined){
                                list.not_ota = nbc
                            } else {
                               list.not_ota =  _.concat(list.not_ota, nbc)
                            }
                    }


                    return list

                })

                .value();
        }
    }


}]);


app.run(function (PackageFactory, $http, http, $rootScope) {
    $http.get('/api/package/')
        .then(function (data) {
            //debugger
            //$rootScope.env = data.data.env

            console.log(data);

            data = data.data.results[0]
            PackageFactory.setPackage(data)

        })
});
