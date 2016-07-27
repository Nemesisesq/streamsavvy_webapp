/**
 * Created by Nem on 7/25/16.
 */


app.directive('categoryDetail', function ($http) {
    return {
        restrict: 'E',
        controller: 'ShowGridController',
        templateUrl: '/static/partials/categories/categories.html',
        link: function (scope, event, attrs) {
            scope.get_desc = function (category) {

                return $http.get('module_descriptions/' + category)
                    .then(function (data) {

                        scope.cat = data.data
                        console.log(scope.cat)
                        return data
                    })
            }

            scope.get_desc('Sports')

            scope.$on('category_clicked', function (event, item) {

                scope.get_desc(item.title)
                    .then(function (data) {
                        scope.cat = data.data

                    })
            })

        }
    }
})

app.directive('moduleRow', function ($http) {
    return {
        restrict: 'E',
        templateUrl: '/static/partials/categories/row-template.html',
        // controller: 'ModuleControler',

        link: function (scope, event, attrs) {


        }
    }
})
