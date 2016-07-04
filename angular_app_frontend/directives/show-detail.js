/**
 * Created by Nem on 3/7/16.
 */

app.directive('showDetail', function (PackageFactory, $q, SLING_CHANNELS) {
    return {
        restrict: 'E',
        templateUrl: '/static/partials/selected-show/select.html',
        controller: 'ShowGridController',

        link: function (scope) {

            $

            // $('.background').scroll(function () {
            //     // console.log($('#sticky').offset().top)
            //     if($('#sticky').offset().top <= 51){
            //         $('#sticky').addClass('fixed')
            //     }
            //
            //     if($('.scrolling-part').offset().top >= 80){
            //         $('#sticky').removeClass('fixed')
            //     }
            // })


            scope.formatDate = function (dateString) {
                return moment(dateString).format('MMMM D, Y')
            }

            scope.fixTitle = function (key) {
                if (key == 'misc') {
                    return 'MISC'
                }

                if (key == 'binge') {
                    return 'Binge Subscription'
                }

                if (key == 'on_demand') {
                    return 'On Demand Subscription'
                }

                if (key == 'live') {
                    return 'Live Subscription'
                }

                if (key == 'pay_per_view') {

                    return 'Pay Per Episode or Season'
                }
            }

            scope.hasOwnApp = function (key, item) {

                servicesWithApps = [ 'CBS', 'NBC', 'HBO', 'HBO NOW', 'Showtime', 'Starz', 'History Channel'];
                if (key == 'live' && item.name != 'Sling' && item.name != 'OTA') {

                    if (item.hasOwnProperty('display_name')){

                        return _.some(servicesWithApps, function(elem){
                            return elem == item.display_name;
                        })
                    }

                    return _.some(servicesWithApps,  function(elem){
                            return elem == item.name;
                        })


                }


                return true
            }


        }
    }
})


app.directive('openDetail', function ($timeout) {
    return {
        restrict: 'A',

        link: function (scope, element, attrs) {
            // alert('Hello World');
            $timeout(function () {
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

            if (element.scope().$parent.key == 'binge') {
                if (scope.cs.on_netflix && !_.some(scope.detailSources.binge, ['source', 'netflix'])) {

                    element.append('<div class="col-sm-4"><img class="" src="https://s3.amazonaws.com/streamsavvy/service_logos/netflix"></div>')
                }

            }

        }
    }

})
