/**
 * Created by Nem on 8/29/16.
 */


app.controller('MobileController', function ($scope) {

    $scope.goodbye = 'nurse'
    $scope.mobileCloseOverlay = function () {



        $scope.$broadcast('close_overlay')

    }
})