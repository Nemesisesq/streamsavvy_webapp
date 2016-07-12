app.controller('ModalController', function ($scope, http, $modal, $log, $rootScope, loginEventService) {


    //$scope.login = 'Click Here to Login'


    $scope.items = ['item1', 'item2', 'item3'];

    $rootScope.openLogInModal = function () {

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

    loginEventService.listen($scope.openLogInModal)
});

app.controller('ModalInstanceController', function ($scope, $rootScope, $modalInstance, items, $location, $cookies, http, growl) {

    $scope.socialLogin = true;

    $scope.auth = {
        twitter : $('#twitter_login').attr('href'),
        facebook : $('#facebook_login').attr('href'),
    }

    $scope.login = function (credentials) {
        //credentials.next = "/api/";
        credentials.csrfmiddlewaretoken = $cookies.get('csrftoken');
        credentials.submit = "Log in";
        http.login(credentials)
            .then(function (data) {
                // console.log(data);
                $rootScope.logged_in = true;
                $modalInstance.close();
                growl.success('Login Successful', {
                    onclose: function () {

                        window.location.reload()
                    },
                    ttl : 1000,
                    disableCountDown: true
                })

            })
    };


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
