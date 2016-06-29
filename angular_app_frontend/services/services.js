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

function interceptor(obj) {
    console.log(obj)

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


    function getBaseShowServiceCatagories(ssPackage) {
        return _.chain(ssPackage.data.content)
            .map(function (elem) {
                _.forEach(elem.channel, function (c) {
                    c.source = c.guidebox_data.short_name
                })
                var list
                elem.guidebox_data.sources == undefined ? list = elem.channel : list = _.concat(elem.channel, elem.guidebox_data.sources.web.episodes.all_sources, elem.guidebox_data.sources.ios.episodes.all_sources);
                return list
            })
            .flatten()
            .uniqBy('source')
            .thru(function (services) {
                if (checkForHuluWithShowtime(services)) {
                    services = removeHuluIfShowtimeContent(services)
                }

                return services
            })
            .uniqBy(function (elem) {
                if (elem.display_name) {
                    return elem.display_name
                } else {
                    return elem.name
                }
            })
            .tap(interceptor)
            .map(function (elem) {
                if (elem.source == 'hulu_free') {
                    elem.source = 'hulu_plus';
                    elem.id = 10
                    return elem
                }

                return elem;
            });
    }

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

        createListOfServices: function(){
            var ssPackage = this.getPackage();
            if ('data' in ssPackage){
                $http.post('http://localhost:5000/d', ssPackage)
                    .then(function(data){
                        console.log(data)
                    })
            }
        },

        // createListOfServices: function () {
        //
        //
        //     var ssPackage = this.getPackage();
        //     if ('data' in ssPackage) {
        //         var list = getBaseShowServiceCatagories(ssPackage)
        //             .thru(function (list) {
        //                 debugger;
        //                 if (_.some(ssPackage.data.content, 'on_netflix')) {
        //                     if (!_.some(list, ['source', 'netflix'])) {
        //                         list.push({display_name: 'Netflix', source: 'netflix'})
        //                     }
        //                 }
        //
        //                 return list
        //
        //             })
        //             .map(function (elem) {
        //                 if (elem.source == 'hulu_free') {
        //                     elem.source = 'hulu_plus';
        //                     return elem
        //                 }
        //
        //                 if (elem.source == 'starz_tveverywhere') {
        //                     elem.source = 'starz'
        //                 }
        //
        //                 if (elem.source == 'showtime_subscription') {
        //                     elem.source = 'showtime'
        //                 }
        //
        //                 return elem;
        //             })
        //             .map(function (elem) {
        //                 var o = {chan: elem}
        //                 o.shows = _.filter(ssPackage.data.content, function (show) {
        //                     if (show.on_netflix && elem.source == 'netflix') {
        //                         return true
        //                     }
        //                     if (show.guidebox_data.sources) {
        //                         var source_check = _.some(show.guidebox_data.sources.web.episodes.all_sources, function (show) {
        //                             var showRe = new RegExp(show.source)
        //                             var elemRe = new RegExp(elem.source)
        //
        //                             return showRe.test(elem.source) || elemRe.test(show.source)
        //
        //
        //                         })
        //                     } else {
        //                         source_check = false
        //                     }
        //
        //
        //                     var url_check = _.some(show.channel, ['url', elem.url]);
        //                     return url_check || source_check
        //                 })
        //
        //                 if (o.chan.guidebox_data) {
        //                     if (o.chan.guidebox_data.is_over_the_air) {
        //                         o.chan.is_over_the_air = o.chan.guidebox_data.is_over_the_air;
        //                     }
        //                 }
        //
        //                 return o
        //
        //             })
        //             .filter(function (elem) {
        //                 return elem.chan.source != 'misc_shows' && elem.chan.display_name != "HBO GO" && elem.chan.source != 'mtv' && elem.chan.source != 'showtime_free'
        //             })
        //             .groupBy(function (elem) {
        //                 if (elem.chan.is_over_the_air) {
        //                     return 'ota'
        //                 }
        //                 if (check_if_on_sling(elem)) {
        //                     return 'sling'
        //                 }
        //
        //                 if (_.includes(payPerServices, elem.chan.source)) {
        //                     return 'ppv'
        //
        //                 }
        //
        //                 else {
        //                     return 'not_ota'
        //                 }
        //             })
        //             .thru(function (list) {
        //
        //                 if (_.some(list.ota, function (item) {
        //                         return item.chan.source == 'nbc'
        //                     })) {
        //                     var nbc = _.chain(list.ota)
        //                         .takeWhile(function (item) {
        //                             return item.chan.source == 'nbc'
        //                         })
        //                         .cloneDeep()
        //                         .value()
        //                     if (list.not_ota == undefined) {
        //                         list.not_ota = nbc
        //                     } else {
        //                         list.not_ota = _.concat(list.not_ota, nbc)
        //                     }
        //                 }
        //
        //                 var showsOta = _.map(list.ota, function (elem) {
        //                     return elem.shows
        //                 })
        //
        //                 var showsSling = _.map(list.sling, function (elem) {
        //                     return elem.shows
        //                 })
        //
        //
        //                 if (list.ota) {
        //                     if (list.ota.length > 1) {
        //
        //                         list.ota[0].shows = _.uniqBy(_.flatten(showsOta), 'url');
        //                         list.ota = [list.ota[0]];
        //                         list.ota[0].chan.source = 'ota';
        //                     } else {
        //                         list.ota[0].chan.source = 'ota';
        //
        //                     }
        //                 }
        //
        //                 if (list.sling) {
        //                     if (list.sling.length > 1) {
        //
        //                         list.sling[0].shows = _.uniqBy(_.flatten(showsSling), 'url');
        //                         list.sling = [list.sling[0]];
        //                         list.sling[0].chan.source = 'sling_tv';
        //                     } else {
        //                         list.sling[0].chan.source = 'sling_tv';
        //
        //                     }
        //                 }
        //
        //                 return list
        //             })
        //             .value();
        //
        //         this.setListOfServices(list)
        //
        //         return list
        //     }
        // },

        catagorizeShowsByService: function (ssPackage) {
            if (_.isEmpty(ssPackage.data.content)) {
                return []
            }
            return getBaseShowServiceCatagories(ssPackage)
                .map(function (elem) {
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
                            var source_check = _.some(show.guidebox_data.sources.web.episodes.all_sources, function (show) {
                                var showRe = new RegExp(show.source)
                                var elemRe = new RegExp(elem.source)

                                return showRe.test(elem.source) || elemRe.test(show.source)


                            })
                        }
                        else {
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
                    return elem.chan.source != "netflix" && elem.chan.source != 'misc_shows' && elem.chan.display_name != "HBO GO" && elem.chan.source != 'mtv' && elem.chan.source != 'showtime_free'
                })
                .uniqBy(function (elem) {
                    return elem.chan.source
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
                .tap(interceptor)
                .thru(function (list) {

                    if (_.some(list.ota, function (item) {
                            return item.chan.source == 'nbc'
                        })) {
                        var nbc = _.chain(list.ota)
                            .takeWhile(function (item) {
                                return item.chan.source == 'nbc'
                            })
                            .cloneDeep()
                            .value()
                        if (list.not_ota == undefined) {
                            list.not_ota = nbc
                        } else {
                            list.not_ota = _.concat(list.not_ota, nbc)
                        }
                    }
                    debugger;
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
