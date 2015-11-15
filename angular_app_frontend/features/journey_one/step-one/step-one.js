app.controller('StepOneController', function ($scope, $http, $timeout) {

    step = this

    $scope.popularShows = null;

    $http.get('api/popular-shows')
        .success(function (data) {
            step.popularShows = data.results;
            return data
        })
        .then(function () {
            //debugger;
            //$('.popular-shows').slick();
        })


    //$scope.$watch(
    //    function watchPopularShows() {
    //        return ($('#popular-shows').find('div').length)
    //
    //
    //    },
    //    function makeCarousel() {
    //
    //
    //        if ($('#popular-shows').find('div').length > 0) {
    //
    //            $('#popular-shows').slick({
    //                //adaptiveHeight: true,
    //                autoplay: true,
    //                infinite: true,
    //                slidesToShow : 3,
    //                slidesToScroll: 3,
    //                dots: true,
    //                //slide: 'img'
    //            })
    //        }
    //
    //    }
    //)


});
