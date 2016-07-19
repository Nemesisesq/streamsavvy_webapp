/**
 * Created by Nem on 6/28/15.
 */
app.controller('navigation', function ($scope, http, $http, $cookies, $window, $location, $state, $rootScope, CONFIG, $timeout, loginEventService, authEventService, PackageFactory) {

    $('#sidebarDashNav').click(function () {

        mixpanel.track('Navigation', {
            "event_id" : 1,
            "event": "Sidebar navigation to dash",
            "user": $window.sessionStorage.user
        })
    })

    $scope.goBack = function () {
        mixpanel.track('Navigation', {
            "event_id" : 12,
            "event": "Checkout back to dash",
            "user": $window.sessionStorage.user
        })

        window.history.back();
    }

    $scope.goToDash = function () {

        mixpanel.track('Navigation', {
            "event": "Sidebar Navigation to dash",
            "user": $window.sessionStorage.user
        })
        location.href = '#/dashboard'
    }


    loginEventService.listen(function () {
        $scope.logged_in = false;

    })
    authEventService.listen(function () {
        $scope.logged_in = true;
    })


    $scope.logout = function () {
        mixpanel.track('Authentication', {
                        "event" : "logout",
                        "method": "email",
                        "user": $window.sessionStorage.user
                    })
        delete $window.sessionStorage['token']
        location.pathname = '/logout/'


    }

    $scope.login = function() {
        $rootScope.openLogInModal()
        var pkg_url = PackageFactory.getPackage()
         
        mixpanel.track("Login modal opened", {
            "from": "nav side bar",
            "current_page": $location.absUrl(),
            "package_id":  pkg_url
        })
    }

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

        // ;
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
