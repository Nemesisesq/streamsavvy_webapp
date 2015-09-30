app.controller('Step4ModalController', function ($scope, http, $modal, $log) {

    $scope.items = ['item1', 'item2', 'item3'];

    $scope.open = function () {
        var modalInstance = $modal.open({
            animation: true,
            templateUrl: '/static/partials/modal/modal.html',
            controller: 'Step4ModalInstanceController',
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

    $scope.open()
});

app.controller('Step4ModalInstanceController', function ($scope, $modalInstance, items, $location) {

    $scope.facebookAuth = function () {

    $location.path($('#facebook_login').attr('href'));
    }

    $scope.instagramUrl = function () {

    $location.path($('#instagram_login').attr('href'));
    }

    $scope.twitterUrl = function () {

     $location.path($('#twitter_login').attr('href'));
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