/**
 * Created by Nem on 6/28/15.
 */
app.controller('navigation', function ($scope, http, $http, $cookies, $location, $state, $rootScope, CONFIG) {
    $scope.isHomePage = $state.current.data.isHomePage;

    $scope.hmdc = $state.current.data.hmdcActive;

    $scope.logout = function () {
        debugger
        $location.path(CONFIG.URL +'/django_auth/logout/');
            //.success(function () {
            //    $rootScope.logged_in = false;
            //    console.log($rootScope.logged_in)
            //})
    }


});

app.run(function ($rootScope) {
    angular.element('#status').text() === 'True' ? $rootScope.logged_in = true : $rootScope.logged_in = false
    console.log($rootScope.logged_in)

})