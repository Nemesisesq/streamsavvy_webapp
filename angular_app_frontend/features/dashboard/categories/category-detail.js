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
                    })
            })
        }
    }
})

app.directive('moduleRow', function ($http, PackageFactory, _) {
    return {
        restrict: 'E',
        templateUrl: '/static/partials/categories/row-template.html',
        // controller: 'ModuleControler',

        link: function (scope, event, attrs) {

            if (scope.key == 'ota') {
                scope.rowTitle = 'Big Game'
                debugger
                scope.desc = '(must have)'

            } else {
                scope.rowTitle = 'Core Package'
                scope.desc = '(select one)'
            }

            scope.addCollection = function (row) {
                var pkg = PackageFactory.getPackage();

                if(_.some(pkg.data[row.category], ['img', row.img])){
                    return
                }
                if (pkg.data[row.category] == undefined) {
                    pkg.data[row.category] = []
                }
                debugger;

                if (pkg.data[row.category].length > 1) {

                    pkg.data[row.category] = _.filter(pkg.data[row.category], function (elem) {
                        return elem.img == 'ota'
                    })
                }


                pkg.data[row.category].push(row);
                pkg.data[row.category] = _.uniqBy(pkg.data[row.category], 'img');

                PackageFactory.setPackage(pkg);
            }

        }


    }
})

app.directive('comingSoon', function (_) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            scope.isClickable = true
            var notReady = ['News', 'Live']
            if (_.includes(notReady, scope.show.title)) {
                scope.isClickable = false;
                element.addClass('coming-soon')
                // this.$parent.$parent.hideDetail()
            }
        }
    }
})


