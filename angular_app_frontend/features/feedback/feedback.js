/**
 * Created by Nem on 12/29/15.
 */

app.controller('FeedbackCtrl', function ($scope) {
   
    $scope.isMobile = window.innerWidth > 540;

    $scope.options = {
        ajaxURL: 'feedback/',
        html2canvasURL: 'static/html2Canvas/build/html2canvas.js',

    }
})