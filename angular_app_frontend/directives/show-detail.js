/**
 * Created by Nem on 3/7/16.
 */

app.directive('showDetail', function () {
    return {
        restrict: 'E',
        templateUrl: '/static/partials/selected-show/select.html',
        controller: 'ShowGridController'
    }
})


app.directive('openDetail', function ($timeout) {
    return {
        restrict: 'A',

        link: function (scope, element, attrs) {
            debugger;
            // alert('Hello World');
            $timeout(function () {
                if (scope.$last) {
                    var ev = {};
                    ev.currentTarget = element;
                    ev.target = element.context.children[0];
                    scope.showDetail(scope.show, ev);
                }
            }, 1000)


        }
    }
})
