/**
 * Created by Nem on 12/29/15.
 */

app.controller('FeedbackCtrl', function ($scope) {
    debugger
    $scope.isMobile = window.innerWidth > 540;

    $scope.options = {
        ajaxURL: 'feedback/'

    }
})