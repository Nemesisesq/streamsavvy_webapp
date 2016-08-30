/**
 * Created by Nem on 6/1/16.
 */
app.directive('mobileTabs', function ($location, $anchorScroll, $rootScope) {
    return {
        // restrict: 'E',
        templateUrl: 'static/partials/mobile-toolbar.html',
        // controller: 'MobileController',

        link: function (scope) {

            scope.mobileCloseOverlay = function () {
                debugger


                $rootScope.$broadcast('close_overlay')
            }

            scope.scrollTo = function (tag) {
                var old = $location.hash()
                $location.hash(tag);
                $anchorScroll();
                $location.hash(old)

            }

        }
    }
})
