/**
 * Created by Nem on 6/28/15.
 */
app.controller('navigation', function ($scope, http, $http, $cookies, $window, $location, $state, $rootScope, $timeout, loginEventService, authEventService, PackageFactory, $localStorage) {

    $scope.$storage = $localStorage;

    function getNameOrEmail() {


        if ($scope.$storage.hasOwnProperty('userInfo')) {
            var s = $scope.$storage.userInfo;
            if (s.first_name && s.last_name) {
                return s.first_name + ' ' + s.last_name
            }

            if (s.first_name) {
                return s.first_name
            }

            return s.email
        }
    }

    PackageFactory.getEmail()
        .then(function (data) {
            data.data.results[0].email ? $rootScope.logged_in = true : $rootScope.logged_in = false

            $localStorage.userInfo = data.data.results[0]
            $scope.nameOrEmail = getNameOrEmail()
        }, function () {

            $rootScope.logged_in = false
        });


    $scope.menuOpen = false

    angular.element(document).keydown(function (e) {
        $scope.$apply(function () {

            var keyCode = e.which || e.keyCode;

            if (keyCode == 27 && $scope.menuOpen) { // escape key maps to keycode `27`
                $scope.showLeftPush()

            }
        })
    })

    // $(document).click(function (event) {
    //
    //
    //     var target = event.target
    //
    //     if ($scope.menuOpen && target ) {
    //         $scope.hideLeftPush()
    //     }
    // })

    $('#sidebarDashNav').click(function () {

        mixpanel.track('Navigation', {
            "event_id": 1,
            "event": "Sidebar navigation to dash",
            "user": $window.sessionStorage.user
        })
    })

    $scope.goBack = function () {
        mixpanel.track('Navigation', {
            "event_id": 12,
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

        if ($window.sessionStorage.token) {
            $scope.logged_in = true;
        } else {
            logged_in = false;
        }

        delete $window.sessionStorage['anon_user']

    })


    $scope.logout = function () {
        mixpanel.track('Authentication', {
            "event": "logout",
            "method": "email",
            "user": $window.sessionStorage.user
        })
        delete $window.sessionStorage['token'];
        delete $scope.$storage['userInfo'];
        location.pathname = '/logout/';
        $scope.logged_in = false


    }

    $scope.login = function () {
        $rootScope.openLogInModal()
        var pkg_url = PackageFactory.getPackage()

        mixpanel.track("Login modal opened", {
            "from": "nav side bar",
            "current_page": $location.absUrl(),
            "package_id": pkg_url.url
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


    var menuLeft = document.getElementById('cbp-spmenu-s1'),
        mainPage = document.getElementById('mainPage'),
        showLeftPush = document.getElementById('showLeftPush'),
        body = document.body;


    $scope.showLeftPush = function () {
        $scope.menuOpen = !$scope.menuOpen;
        $('#cbp-spmenu-s1').toggleClass('cbp-spmenu-open')
        $scope.menuOpen ? $('#menu-mask').fadeIn() : $('#menu-mask').fadeOut()
        $('#showLeftPush').toggleClass('cbp-spmenu-push-toright');
        // $('nav').focus()
        //classie.toggle(this, 'active')

        // ;
        //classie.toggle(body, 'cbp-spmenu-push-toright');
        //classie.toggle(menuLeft, 'cbp-spmenu-open');
        //classie.toggle(mainPage, 'cbp-spmenu-push-toright');
        // $('#mainPage').toggleClass('cbp-spmenu-push-toright');
        // $('#dashPage').toggleClass('cbp-spmenu-push-toright');


        //$('#showLeftPush').toggleClass('cbp-spmenu-push-toright');
        // $('#ss-panel-right').toggleClass('fixed-menu-transform');
        // $('#ss-navigation-view').toggleClass('cbp-spmenu-push-toright');

        //disableOther('showLeftPush');
    };
    $scope.hideLeftPush = function () {
        //classie.toggle(this, 'active')
        $scope.menuOpen = false;

        // ;
        //classie.toggle(body, 'cbp-spmenu-push-toright');
        //classie.toggle(menuLeft, 'cbp-spmenu-open');
        $('#cbp-spmenu-s1').removeClass('cbp-spmenu-open')
        //classie.toggle(mainPage, 'cbp-spmenu-push-toright');
        // $('#mainPage').toggleClass('cbp-spmenu-push-toright');
        // $('#dashPage').toggleClass('cbp-spmenu-push-toright');

        $('#menu-mask').fadeOut()


        $('#showLeftPush').removeClass('cbp-spmenu-push-toright');

        // $('nav').focus()


        //$('#showLeftPush').toggleClass('cbp-spmenu-push-toright');
        // $('#ss-panel-right').toggleClass('fixed-menu-transform');
        // $('#ss-navigation-view').toggleClass('cbp-spmenu-push-toright');

        //disableOther('showLeftPush');
    };


});

app.run(function ($rootScope, PackageFactory, $localStorage) {

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
