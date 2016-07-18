app.controller('ModalController', function ($scope, http, $uibModal, $log, $rootScope, $timeout, loginEventService) {


    //$scope.login = 'Click Here to Login'

    var modalOpen = false

    $scope.items = ['item1', 'item2', 'item3'];

    $rootScope.openLogInModal = function () {
        if (modalOpen) {
            return
        }

        modalOpen = true;

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: '/static/partials/modal.html',
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

            $timeout(function () {

                modalOpen = false
            }, 1000)
            // $log.info(modalOpen)
        });
    }

    loginEventService.listen($rootScope.openLogInModal)
    //if ($rootScope.currentStep == 3) {
    //    $rootScope.openLogInModal()
    //}
});

app.controller('ModalInstanceController', function ($scope, $rootScope, $modalInstance, items, $location, $cookies, http, growl) {

    $scope.socialLogin = true;

    $scope.auth = {
        twitter: $('#twitter_login').attr('href'),
        facebook: $('#facebook_login').attr('href'),
    }

    $scope.credentials = {}


    //$scope.facebookAuth = function () {
    //
    //window.location = CONFIG.URL + $('#facebook_login').attr('href');
    //}
    //
    //$scope.instagramAuth = function () {
    //
    //window.location = CONFIG.URL + $('#instagram_login').attr('href');
    //}
    //
    //$scope.twitterAuth = function () {
    //
    // window.location = CONFIG.URL + $('#twitter_login').attr('href');
    //}


    $scope.login = function (credentials) {
        //credentials.next = "/api/";
        credentials.csrfmiddlewaretoken = $cookies.get('csrftoken');
        credentials.submit = "Log in";
        credentials.username = credentials.email;
        http.login(credentials)
            .then(function (data) {
                console.log(data);
                $rootScope.logged_in = true;
                $modalInstance.close();
                growl.success('Login Successful', {
                    onclose: function () {

                        window.location.reload()
                    },
                    ttl: 1000,
                    disableCountDown: true
                })

            }, function (err) {
                debugger;

                if (err.data.hasOwnProperty('username')) {

                    growl.error('username is required')
                }

                if (err.data.hasOwnProperty('non_field_errors')) {
                    growl.error(err.data.non_field_errors[0])
                }

                $scope.credentials = {}
            })
    $scope.credentials = {}
    };

    $scope.register = function (credentials) {
        //credentials.next = "/api/";
        debugger;
        credentials.csrfmiddlewaretoken = $cookies.get('csrftoken');
        credentials.submit = "Register";
        credentials.username = credentials.email;
        if (credentials.password == credentials.confirm_password) {


            http.register(credentials)
                .then(function (data) {
                    //TODO handle sucessful registration
                    growl.success('Registration Successful')
                    $modalInstance.close()
                    console.log(data)
                }, function (err) {
                    debugger
                    if (err.status == 500) {
                        growl.error(err.data.detail)
                    } else if (err.hasOwnProperty('data')) {
                        growl.error(err.data.username[0])

                    } else if (err.data.hasOwnProperty('non_field_errors')) {
                        growl.error(err.data.non_field_errors[0])
                    }
                    $scope.credentials = {}
                })
        } else {
            growl.error("passwords don't match")
        }
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
