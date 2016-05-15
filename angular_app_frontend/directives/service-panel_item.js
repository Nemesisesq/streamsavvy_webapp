/**
 * Created by Nem on 5/11/16.
 */
app.directive('servicePanelItem', function sPanelItem() {
    return {
        itemList: '&=',
        templateUrl: '/static/partials/service-panel/panel-item',
        link: function (scope) {

        }
    }
})
    .directive('hideDuplicate', function (_) {

        function checkPrevious(element) {
            // debugger;
            var dupeCollection = _.initial(angular.element('[hide-duplicate]'));
            if (dupeCollection.length > 0) {
                var res = _.some(dupeCollection, function (elem) {
                    elem = angular.element(elem);
                    return elem.scope().show.title == element.scope().show.title
                })

                return res
            }

            return res

        }

        return {
            restrict: 'A',
            link: function (scope, element, attrs, controller) {
                // debugger;

                if (checkPrevious(element)) {
                    element.remove()

                }
            }

        }

    })
    .directive('combineShowtime', function ($timeout) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs, controller) {
                debugger
                $timeout(function () {
                    var re = new RegExp(/showtime/i)
                    var combinedShowtimeShows = _.chain(element.children())
                        .filter(function (index) {
                            debugger
                            return re.test(angular.element(index).scope().service.chan.display_name)
                        })
                        .reduce(function (sum, n) {
                            debugger
                            _.concat(sum, n)
                        })
                        .value()

                    return combinedShowtimeShows
                }, 0)


            }
        }
    })