/**
 * Created by Nem on 7/27/16.
 */
/* This is a place for general directives
* that can be applied site wide
**/

app.directive('imageonload', function($timeout) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {

            element.bind('load', function() {
                var that = this
                $timeout(function(){

                that.classList.add('loaded')
                }, chance.natural({min: 10, max:700}))
            });
            element.bind('error', function(){
                console.log(this + 'image could not be loaded');
            });
        }
    };
})

