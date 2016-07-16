/**
 * Created by Nem on 6/28/15.
 */
app.controller('navigation', function ($scope, http, $http, $cookies, $window, $location, $state, $rootScope, CONFIG, $timeout, loginEventService, authEventService) {

    $scope.goBack = function () {
        window.history.back();
    }


    loginEventService.listen(function () {
        $scope.logged_in = false;

    })
    debugger;
    authEventService.listen(function () {
        $scope.logged_in = true;
    })


    $scope.logout = function () {
        debugger
        delete $window.sessionStorage['token']
        location.pathname = '/logout/'

    }
    
    debugger;
    $scope.cp = $location.$$url == "/checkout";

    $scope.menuOpen ? $('#menu-mask').fadeIn() : $('#menu-mask').fadeOut();

    $scope.isHomePage = $state.current.data.isHomePage;

    $timeout(function () {
        $scope.isHomePage && $('div#mainPage').css({'min-height': '100vh'});
    }, 0)

    $scope.isActive = function (hash) {
        return document.location.hash == hash;


    }


    $scope.hmdc = $state.current.data.hmdcActive;

    // $scope.logout = function () {
    //     $location.path(CONFIG.URL + '/django_auth/logout/');
    //     //.success(function () {
    //     //    $rootScope.logged_in = false;
    //     //    console.log($rootScope.logged_in)
    //     //})
    // }

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

        $scope.menuOpen ? $('#menu-mask').fadeIn() : $('#menu-mask').fadeOut()


        $('#showLeftPush').toggleClass('cbp-spmenu-push-toright');


        //$('#showLeftPush').toggleClass('cbp-spmenu-push-toright');
        // $('#ss-panel-right').toggleClass('fixed-menu-transform');
        // $('#ss-navigation-view').toggleClass('cbp-spmenu-push-toright');

        //disableOther('showLeftPush');
    };


});

app.run(function ($rootScope) {
    angular.element('#status').text() === 'True' ? $rootScope.logged_in = true : $rootScope.logged_in = false;
    // console.log($rootScope.logged_in)

})

$(document).ready(function () {



    //function disableOther(button) {
    //    if (button !== 'showLeftPush') {
    //        classie.toggle(showLeftPush, 'disabled');
    //    }
    //
    //}
});
