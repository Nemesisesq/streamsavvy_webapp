/**
 * Created by Nem on 5/24/16.
 */
app.controller('HardwareController', function($scope){
    $scope.collapseHardware=false;
    
    $scope.toggleHardwarePanel = function () {
               debugger;


        var serviceHeight = $(window).height() - 46;

        if (!$scope.collapseHardware) {
            $('.service-panel.ng-scope').animate({height: serviceHeight + 'px'});
            $('.hardware-panel.ng-scope').animate('46px');
        } else {
            $('.service-panel.ng-scope').animate({height: '60vh'});
            $('.hardware-body').animate('40vh');

        }
        $scope.collapseHardware = !$scope.collapseHardware;
        
    }
})