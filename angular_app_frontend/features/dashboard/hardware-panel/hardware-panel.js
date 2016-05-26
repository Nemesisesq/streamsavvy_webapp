/**
 * Created by Nem on 5/24/16.
 */
app.controller('HardwareController', function($scope){
    $scope.collapseHardware=true;
    var serviceHeight = $(window).height() - 46;

    if ($scope.collapseHardware) {
        debugger
        $('.service-panel.ng-scope').css({'height': serviceHeight + 'px'});

    }
    
    $scope.toggleHardwarePanel = function () {
               debugger;




        if (!$scope.collapseHardware) {
            $('.service-panel.ng-scope').animate({'height': serviceHeight + 'px'});
            $('.hardware-panel.ng-scope').animate({'height':'46px'});
        } else {
            $('.hardware-body').animate({height:'40vh'});
            $('.hardware-panel.ng-scope').animate({'height':'40vh'});
            $('.service-panel.ng-scope').animate({height: '60vh'});

        }
        $scope.collapseHardware = !$scope.collapseHardware;
        
    }
})