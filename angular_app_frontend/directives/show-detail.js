/**
 * Created by Nem on 3/7/16.
 */

app.directive('showDetail', function (PackageFactory, $q) {
    return {
        restrict: 'E',
        templateUrl: '/static/partials/selected-show/select.html',
        controller: 'ShowGridController',

        link: function (scope) {

            var liveServices = ['sling', 'cbs', 'nbc', 'abc', 'thecw'];
            var onDemandServices = ['hulu_plus', 'nbc'];
            var bingeServices = ['netflix', 'amazon_prime'];
            var payPerServices = ['google_play', 'itunes', 'amazon_buy', 'youtube_purchase', 'vudu'];

            scope.formatDate = function (dateString) {
                // debugger
                return moment(dateString).format('MMMM D, Y')
            }

            scope.fixTitle = function (key) {
                if (key == 'misc') {
                    return 'MISC'
                }

                if (key == 'binge') {
                    return 'BINGE'
                }

                if (key == 'on_demand') {
                    return 'ON DEMAND'
                }

                if (key == 'live') {
                    return 'LIVE'
                }

                if (key == 'pay_per_view') {

                    return 'PAY PER EPISODE / SEASON'
                }
            }


            scope.cs = PackageFactory.getChosenShow();


            scope.detailSources = (function () {

                if (scope.cs.guidebox_data != undefined) {


                    var x = _(scope.cs.channel)
                        .concat(scope.cs.guidebox_data.sources.web.episodes.all_sources)
                        .map(function (elem) {

                            if (elem.guidebox_data != undefined) {
                                elem.source = elem.guidebox_data.short_name
                            }
                            return elem
                        }).filter(function (elem) {

                            if (elem.hasOwnProperty('guidebox_data')) {
                                return !elem.guidebox_data.is_over_the_air
                            }

                            if (elem.source == 'hulu_free' || elem.source == 'starz_tveverywhere') {
                                return false
                            }

                            return true
                        })

                        .uniqBy('source')
                        .groupBy(function (service) {
                            if (liveServices.includes(service.source)) {
                                return 'live'
                            }
                            if (service.is_on_sling) {
                                return 'live'
                            }
                            if (onDemandServices.includes(service.source)) {
                                return 'on_demand'
                            }
                            if (bingeServices.includes(service.source)) {
                                return 'binge'
                            }
                            if (payPerServices.includes(service.source)) {
                                return 'pay_per_view'
                            }

                            return 'misc'
                        })
                        .thru(function (services) {
                            _.forEach(services.misc, function (service) {
                                if (service.source == 'hbo_now') {
                                    services.live.push(service);
                                    services.on_demand.push(service);
                                    services.binge.push(service);
                                }
                                else if (service.source == 'showtime_subscription') {
                                    services.on_demand.push(service);
                                    service.binge.push(service);
                                }

                            })

                            return services
                        })
                        .value();
                    return x;
                }
            })()


        }
    }
})


app.directive('openDetail', function ($timeout) {
    return {
        restrict: 'A',

        link: function (scope, element, attrs) {
            // alert('Hello World');
            $timeout(function () {
                // debugger;
                if (scope.$last && scope.show.justAdded) {
                    var ev = {};
                    ev.currentTarget = element[0];
                    ev.target = element.context.children[0];
                    scope.showDetail(scope.show, ev);
                    scope.show.justAdded = false
                }
            }, 1000)


        }
    }
})

app.directive('otaSlingNetflix', function () {
    return {
        restrict: 'A',

        link: function (scope, element, attrs) {

            debugger;

            if (element.scope().$parent.key == 'live') {
                if (scope.cs.channel[0].guidebox_data.is_over_the_air) {
                    element.append('<div class="col-sm-4"><img class="" src="https://s3.amazonaws.com/streamsavvy/service_logos/ota"></div>')
                }

                if (_.some(scope.detailSources.live, 'is_on_sling')) {
                    element.append('<div class="col-sm-4"><img class="" src="https://s3.amazonaws.com/streamsavvy/service_logos/sling-tv.svg"> </div>')
                }


            }

            if (element.scope().$parent.key == 'binge') {
                debugger;
                if (scope.cs.on_netflix && !_.some(scope.detailSources.binge, ['source', 'netflix'])) {

                    element.append('<div class="col-sm-4"><img class="" src="https://s3.amazonaws.com/streamsavvy/service_logos/netflix"></div>')
                }

            }

        }
    }

})
