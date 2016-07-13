/**
 * Created by Nem on 10/7/15.
 */

app.directive('footer', function () {

    return {
        restrict: 'E',
        templateUrl: 'static/partials/footer.html',
        link: function (scope, elemtnt, attrs) {


        }
    }
})


function fixFooter() {
    debugger;
    var footerHeight = $("div[ui-view='footer']").height()
    var homeHeight = $("div[ui-view='home']").height()
    var windowHeight = window.innerHeight
    if (footerHeight && homeHeight && windowHeight) {
        // debugger;

        if (homeHeight > windowHeight) {
            var diff = windowHeight - homeHeight
            $("div[ui-view='footer']").css({'bottom': diff})
        } else {
            $("div[ui-view='footer']").css({'bottom': 0})
        }
    }
}

$(document).ready(function () {




    // debugger;

})
