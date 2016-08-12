/**
 * Created by chirag on 8/3/15.
 */
app.controller('HomeController', function ($scope, $http, http, $cookies, $location, $window) {

    $('#letsDoThis').click(function () {
         ;

        mixpanel.track('Navigation', {
            "event_id": 2,
            "event": "Call to Action",
            "user": $window.sessionStorage.user
        })

    })

});


app.directive('sectionOne', function(){
    return {
        restrict : 'E',
        templateUrl: '/static/partials/section-one.html'
    }
})

app.directive('sectionTwo', function(){
    return {
        restrict : 'E',
        templateUrl: '/static/partials/section-two.html'
    }
})

app.directive('sectionThree', function(){
    return {
        restrict : 'E',
        templateUrl: '/static/partials/section-three.html'
    }
})

app.directive('sectionFour', function(){
    return {
        restrict : 'E',
        templateUrl: '/static/partials/section-four.html'
    }

})

app.controller('carousel',function () {

})
