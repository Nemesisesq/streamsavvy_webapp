/**
 * Created by Nem on 6/4/16.
 */

app.directive('checkoutItem', function(){
    return {
        restrict: 'E',
        templateUrl: 'static/partials/checkout-list/checkout-item-template.html',
        scope: {
            key: '=',
            value: '='
        },

        link: function(scope, element){

        }
    }
})


app.directive('checkoutImageBlock', function(){
    return {
        restrict: 'E',
        templateUrl: 'static/partials/checkout-list/checkout-image-block.html',
        scope: {
            service: '=',
        },

        link: function(scope, element){

        }
    }
})

app.directive('addedBlock', function(){
    
    return {
        restrict: 'E',
        templateUrl: 'static/partials/checkout-list/added-block.html',
        scope: {
            service: '=',
        },

        link: function(scope, element){

        }
    }
    
})
