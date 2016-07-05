/**
 * Created by Nem on 6/28/15.
 */
app.controller('navigation', function ($scope, http, $http, $cookies, $location, $state, $rootScope, CONFIG, $timeout) {

    $scope.auth = {
        twitter : $('#twitter_login').attr('href'),
        facebook : $('#facebook_login').attr('href'),
        instagram: $('#instagram_login').attr('href')
    }


    $scope.menuOpen ? $('#menu-mask').fadeIn(): $('#menu-mask').fadeOut();

    $scope.isHomePage = $state.current.data.isHomePage;

    $timeout(function(){
        $scope.isHomePage && $('div#mainPage').css({'min-height':'100vh'});
    }, 0)

    $scope.isActive = function (hash) {
        return document.location.hash == hash;


    }


    $scope.hmdc = $state.current.data.hmdcActive;

    $scope.logout = function () {
        $location.path(CONFIG.URL + '/django_auth/logout/');
        //.success(function () {
        //    $rootScope.logged_in = false;
        //    console.log($rootScope.logged_in)
        //})
    }

    var menuLeft = document.getElementById('cbp-spmenu-s1'),
        mainPage = document.getElementById('mainPage'),
        showLeftPush = document.getElementById('showLeftPush'),
        body = document.body;


    $scope.showLeftPush = function () {
        //classie.toggle(this, 'active')
        $scope.menuOpen = !$scope.menuOpen;

        //debugger;
        //classie.toggle(body, 'cbp-spmenu-push-toright');
        //classie.toggle(menuLeft, 'cbp-spmenu-open');
        $('#cbp-spmenu-s1').toggleClass('cbp-spmenu-open')
        //classie.toggle(mainPage, 'cbp-spmenu-push-toright');
        // $('#mainPage').toggleClass('cbp-spmenu-push-toright');
        // $('#dashPage').toggleClass('cbp-spmenu-push-toright');

        $scope.menuOpen ? $('#menu-mask').fadeIn(): $('#menu-mask').fadeOut()


        $('#showLeftPush').toggleClass('cbp-spmenu-push-toright');


        //$('#showLeftPush').toggleClass('cbp-spmenu-push-toright');
        // $('#ss-panel-right').toggleClass('fixed-menu-transform');
        // $('#ss-navigation-view').toggleClass('cbp-spmenu-push-toright');

        //disableOther('showLeftPush');
    };


});

app.run(function ($rootScope) {
    angular.element('#status').text() === 'True' ? $rootScope.logged_in = true : $rootScope.logged_in = false;
    console.log($rootScope.logged_in)

})

$(document).ready(function () {



    //function disableOther(button) {
    //    if (button !== 'showLeftPush') {
    //        classie.toggle(showLeftPush, 'disabled');
    //    }
    //
    //}
});
