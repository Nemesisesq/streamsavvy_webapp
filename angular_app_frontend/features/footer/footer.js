/**
 * Created by Nem on 10/7/15.
 */

app.directive('positionFooter', function () {

    return {
        restrict: 'A',
        link: function (scope, elemtnt, attrs) {



        }
    }


})


function fixFooter() {
    var footerHeight = $("div[ui-view='footer']").height()
    var homeHeight = $("div[ui-view='home']").height()
    var windowHeight = window.innerHeight
    if (footerHeight && homeHeight && windowHeight) {
        // debugger;

        if (homeHeight > (windowHeight - footerHeight)) {
            var diff = windowHeight - homeHeight
            $("div[ui-view='footer']").css({'bottom': diff})
        } else {
            $("div[ui-view='footer']").css({'bottom': 0})
        }
    }
}

$(document).ready(function () {

    var target = document.querySelector("[ui-view]")

    var config = {attributes: true, childList: true, characterData: true};

    var observer = new MutationObserver(function (mutations) {
        // debugger;
        fixFooter();
        mutations.forEach(function (mutation) {
            // console.log(mutation)
        })
    })

    observer.observe(target, config)


    // debugger;

})
