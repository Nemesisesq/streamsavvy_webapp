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
                var res =  _.some(dupeCollection, function (elem) {
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