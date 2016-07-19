/**
 * Created by chirag on 8/3/15.
 */
app.controller('HomeController', function ($scope, $http, http, $cookies, $location, $window) {

    $('#letsDoThis').click(function () {
        debugger;

        mixpanel.track('Navigation', {
            "event_id": 2,
            "event": "Call to Action",
            "user": $window.sessionStorage.user
        })

    })


    $scope.login = function (credentials) {
        //credentials.next = "/api/";
        credentials.csrfmiddlewaretoken = $cookies.get('csrftoken');
        credentials.submit = "Log in";
        http.login(credentials)
            .then(function (data) {
                // console.log(data);
                $location.url('search');
                $scope.logged_in = true;
            })
    };

    $scope.logout = function () {
        $http.get('django_auth/logout/')
            .success(function () {
                $location.url('/');
                $scope.logged_in = false;
            })
    }


});
