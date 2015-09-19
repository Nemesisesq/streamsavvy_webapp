/**
 * Created by Nem on 9/18/15.
 */
app.directive('ssImageBlock', function (http, $rootScope) {
    return {
        restrict: 'E',
        //replace: true,
        //transclude: true,
        scope: {
            category: '=',
            obj: '=',
            hello: '=',
            templateUrl: '='



        },
        templateUrl: '/static/partials/step-three/image_block.html',

        link: function (scope, element, attrs) {
            scope.that = "hello world";

            scope.toggleSelected = function (item) {
                http.getRestPackage()
                    .then(function (p) {
                        debugger;
                        if(item.selected){
                            debugger;
                            _.remove(p.hardware, function(elem){
                                return elem == item.url
                            })

                            debugger;

                            console.log(p)
                        } else{
                            debugger;
                            p.hardware.push(item.url)
                        }

                        debugger;
                        http.putPackage(p)
                            .then(function(data){

                                $rootScope.load()
                            })

                    })

            }


        }

    }
})