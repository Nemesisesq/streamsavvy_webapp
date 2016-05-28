/**
 * Created by Nem on 3/7/16.
 */

app.directive('showDetail', function () {
    return {
        restrict: 'E',
        templateUrl: '/static/partials/selected-show/select.html',
        controller: 'ShowGridController',

        link: function (scope) {
            scope.formatDate = function(dateString) {
                // debugger
                return moment(dateString).format('MMMM D, Y')
            }

            scope.detailSources = (function () {
            if ($scope.cs.guidebox_data != undefined) {


                var x = _($scope.cs.channel)
                    .concat($scope.cs.guidebox_data.sources.web.episodes.all_sources)
                    .map(function (elem) {

                        if (elem.guidebox_data != undefined) {
                            debugger
                            elem.source = elem.guidebox_data.short_name
                        }


                        return elem
                    }).filter(function (elem) {

                        if (elem.hasOwnProperty('guidebox_data')) {
                            return !elem.guidebox_data.is_over_the_air
                        }

                        if (elem.source == 'hulu_free' || elem.source =='starz_tveverywhere') {
                            return false
                        }

                        return true
                    })

                    .uniqBy('source')
                    .groupBy(function(elem){
                        if(elem.display_name != unefined){

                        }

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
