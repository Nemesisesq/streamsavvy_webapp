app.controller('ModalController', function ($scope, http, $uibModal, $log, $rootScope, $timeout, loginEventService) {

    //$scope.login = 'Click Here to Login'

    var modalOpen = false

    $scope.items = ['item1', 'item2', 'item3'];

    $rootScope.openLogInModal = _.debounce(function () {
        if (modalOpen) return;


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


        }, function () {
            $log.info('Modal dismissed at: ' + new Date());

            modalOpen = false

            $rootScope.$broadcast('login.modal.closed')

        });
    }, 500);

    loginEventService.listen($rootScope.openLogInModal)
    //if ($rootScope.currentStep == 3) {
    //    $rootScope.openLogInModal()
    //}
});

app.controller('ModalInstanceController', function ($scope, $rootScope, $modalInstance, items, $location, $cookies, http, growl, $window, PackageFactory, sInfo) {

    $scope.socialLogin = true;

    var pkg = PackageFactory.getPackage()

    $scope.auth = {
        twitter: $('#twitter_login').attr('href') + '?pkg=' + pkg.url,
        facebook: $('#facebook_login').attr('href')+ '?pkg=' + pkg.url + '&anon_user=' + window.sessionStorage.anon_user,
    }

    $scope.credentials = {}


    $('body').on('click', '#facebook_social_auth', function () {

        mixpanel.track('Authentication', {
            "id": 4.1,
            "event": "facebook_social",
            "method": "email",
            "user": $window.sessionStorage.user

        })
            window.sessionStorage.pkg = pkg
    })


    $scope.login = function (credentials) {
        //credentials.next = "/api/";
        credentials.csrfmiddlewaretoken = $cookies.get('csrftoken');
        credentials.submit = "Log in";
        credentials.username = credentials.email;
        $window.sessionStorage.user = {"email": credentials.email}
        http.login(credentials)
            .then(function (data) {
                mixpanel.track('Authentication', {
                    "id": 4.2,
                    "event": "login",
                    "method": "email",
                    "user": $window.sessionStorage.user
                })

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

        credentials.csrfmiddlewaretoken = $cookies.get('csrftoken');
        credentials.submit = "Register";
        credentials.username = credentials.email;
        credentials.package = PackageFactory.getPackage().url;


        if (credentials.password == credentials.confirm_password) {


            http.register(credentials)
                .then(function (data) {
                    $window.sessionStorage.user = {"email": credentials.email}

                    mixpanel.track('Authentication', {
                        "id": 4.3,
                        "event": "register",
                        "method": "email",
                        "user": $window.sessionStorage.user
                    })

                    $window.sessionStorage.reg_pkg_id = data.data.pkg

                    growl.success('Registration Successful')
                    $modalInstance.close()
                    sInfo.broadcast()
                    window.location.reload()
                }, function (err) {

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
