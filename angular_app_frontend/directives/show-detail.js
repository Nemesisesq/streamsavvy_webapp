/**
 * Created by Nem on 3/7/16.
 */

app.directive('showDetail',function(){
    return{
        restrict: 'E',
        templateUrl : '/static/partials/selected-show/select.html',
        controller: 'ShowGridController'



    }
})