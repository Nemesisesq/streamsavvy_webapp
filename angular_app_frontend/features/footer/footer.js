/**
 * Created by Nem on 10/7/15.
 */

app.directive('footer', function ($state) {

    return {
        restrict: 'E',
        templateUrl: 'static/partials/footer.html',
        link: function (scope, elemtnt, attrs) {

            function fixFooter() {

                if ($state.current.name == 'nav.home') {
                    $('div[ui-view="home"]').height(window.innerHeight)
                    console.log('footer fixed')
                }
            }

            var target = document.querySelector("[ui-view]")

            var config = {attributes: true, childList: true, characterData: true};

            var observer = new MutationObserver(function (mutations) {
                debugger;


                fixFooter();
                mutations.forEach(function (mutation) {
                    console.log(mutation)
                })

            })

            observer.observe(target, config)
            $(window).resize(fixFooter)


        }
    }


})

$(document).ready(function () {




    // debugger;

})
