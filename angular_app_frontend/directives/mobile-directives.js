/**
 * Created by Nem on 6/1/16.
 */
app.directive('mobileTabs', function ($location, $anchorScroll) {
    return {
        // restrict: 'E',
        templateUrl: 'static/partials/mobile-toolbar.html',

        link: function (scope) {

            scope.scrollTo = function (tag) {
                var old=$location.hash()
                $location.hash(tag);
                $anchorScroll();
                $location.hash(old)

            }

        }
    }
})