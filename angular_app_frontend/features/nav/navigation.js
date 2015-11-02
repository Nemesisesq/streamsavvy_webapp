/**
 * Created by Nem on 6/28/15.
 */
app.controller('navigation', function ($scope, http, $http, $cookies, $location, $state) {
    $scope.isHomePage = $state.current.data.isHomePage;
    $scope.logged_in = false;

    $scope.login = function (credentials) {
        //credentials.next = "/api/";
        credentials.csrfmiddlewaretoken = $cookies.get('csrftoken');
        credentials.submit = "Log in";
        http.login(credentials)
            .then(function (data) {
                console.log(data);
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