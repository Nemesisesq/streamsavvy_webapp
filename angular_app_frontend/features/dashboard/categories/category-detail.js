/**
 * Created by Nem on 7/25/16.
 */


app.directive('categoryDetail', function ($http, _) {
    return {
        restrict: 'E',
        controller: 'ShowGridController',
        templateUrl: '/static/partials/categories/categories.html',
        link: function (scope, event, attrs) {
            scope.get_desc = function (category) {

                return $http.get('module_descriptions/' + category)
                    .then(function (data) {

                        // debugger;
                        var group = _.groupBy(data.data, function (elem) {
                            if (elem.img == 'ota') {
                                return 'ota'

                            }

                            return 'core'
                        })
                        scope.cat = group;
                        console.log(scope.cat)
                        return data
                    })
            }

            scope.get_desc('Sports')

            scope.$on('category_clicked', function (event, item) {

                scope.get_desc(item.title)
                    .then(function (data) {
                        // scope.cat = data.data

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
            debugger;

            if(scope.key == 'ota'){
                scope.rowTitle = 'Big Game'

            } else {
                scope.rowTitle = 'Core Package'
            }


        }
    }
})

app.directive('comingSoon', function (_) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            debugger;
            scope.isClickable = true
            var notReady = ['News', 'Live']
            if (_.includes(notReady, scope.show.title)) {
                scope.isClickable = false;
                element.addClass('coming-soon')

            }
        }
    }
})


