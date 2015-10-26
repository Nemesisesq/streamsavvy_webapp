app.controller('ModalController', function ($scope, http, $modal, $log, $rootScope) {

    $scope.login = 'Click Here to Login'

    $scope.items = ['item1', 'item2', 'item3'];

    $scope.open = function () {
        var modalInstance = $modal.open({
            animation: true,
            templateUrl: '/static/partials/modal/modal.html',
            controller: 'ModalInstanceController',
            size: 'sm',
            resolve: {
                items: function () {
                    return $scope.items;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selectedItem = selectedItem;


        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    }

    if ($rootScope.currentStep == 4) {
        $scope.open()
    }
});

app.controller('ModalInstanceController', function ($scope, $modalInstance, items, $location, CONFIG) {

    $scope.facebookAuth = function () {
        debugger

    window.location = CONFIG.URL + $('#facebook_login').attr('href');
    }

    $scope.instagramAuth = function () {

    window.location = CONFIG.URL + $('#instagram_login').attr('href');
    }

    $scope.twitterAuth = function () {

     window.location = CONFIG.URL + $('#twitter_login').attr('href');
    }




    $scope.items = items;

    $scope.selected = {
        item: $scope.items[0]
    }

    $scope.ok = function () {
        $modalInstance.close($scope.selected.item);
    }

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel')
    }

})