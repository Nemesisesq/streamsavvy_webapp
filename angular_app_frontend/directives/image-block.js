/**
 * Created by Nem on 9/18/15.
 */
app.directive('ssImageBlock', function (http) {
    return {
        restrict: 'E',
        replace: true,
        transclude: true,
        scope: {
            category: '=',
            obj: '=',
            hello: '=',
            templateUrl: '='



        },
        templateUrl: '/static/partials/step-three/image_block.html',

        link: function (scope, element, attrs) {
            scope.that = "hello world";
            scope.toggleSelected = function () {
                http.getRestPackage
                    .then(function (p) {
                        if(item.selected){
                            _.remove(p.hardware,function(elem){
                                elem == item.url
                            })
                        } else{
                            p.hardware.push(item.url)
                        }

                        $rootScope.load()
                    })

            }


        }

    }
})