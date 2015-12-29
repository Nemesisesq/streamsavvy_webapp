/**
 * Created by Nem on 9/18/15.
 */
app.directive('viewWindow', function (http, $rootScope, PackageFactory, $q) {
    return {
        restrict: 'AEC',
        //replace: true,
        //transclude: true,
        scope: {
            w: '=',
            content: '=',
            savePackage: '=',
            package: '='


        },
        templateUrl: '/static/partials/step-one/view-window.html',

        link: function (scope, element, attrs) {


            scope.id = scope.w.type;

            scope.channels = scope.content.channels.web.episodes.all_sources;

            scope.sources = _.union(scope.channels, scope.content.content_provider)

            scope.that = "hello world";

            var checkWindow = function () {
                
                var v = scope.content.viewingWindows[scope.id];
                if (!v.selected) {

                    v = _.omit(v, 'channel')

                    scope.content.viewingWindows[scope.id] = v;
                }
                return v
            }


            scope.savePackage = function () {
                var content = checkWindow();


                PackageFactory.updatePackageChannels(scope);
                
                
                PackageFactory.setPackage(scope.package)
            }

            scope.$watchCollection('package.content', function () {
                PackageFactory.setPackage(scope.package)
            });

            scope.prePopulateWindowProvider = function (content, prop) {


                //var array = _.intersection($scope.package.providers, content.content_provider);

                var array = _.filter(scope.channels, function (prov) {
                    return _.includes(_.map(scope.package.providers, function (elem) {
                        return elem.name
                    }), prov.name)
                })

                if (prop == 'onDemand') {

                    _.remove(array, function (n) {
                        return false

                    })
                } else if (prop == 'fullseason') {

                    _.remove(array, function (n) {
                        return false
                    })
                }

                return _.isEmpty(array) ? false : _.first(array).display_name;

            }

            //var updatePackageChannels = function () {
            //
            //
            //
            //    return $q(function (resolve, reject) {
            //        var chans = _.map(scope.package.content, function (elem) {
            //            var x = []
            //            _.forEach(scope.$parent.directiveVW , function (w) {
            //
            //                var window = elem.viewingWindows[w.type];
            //                if (window !== undefined) {
            //                    if (!_.includes(scope.package.providers, window.channel.source)) {
            //                        x.push(window.channel)
            //                    }
            //                }
            //
            //            })
            //
            //            return x
            //        })
            //
            //        chans = _.flatten(chans)
            //
            //        scope.package.providers = chans
            //    })
            //
            //
            //}

            scope.saveWindowProvider = function (channel) {
                var viewingWindow = scope.content.viewingWindows[scope.id];

                if (viewingWindow.selected) {
                    viewingWindow.channel = channel;
                } else {
                    _.omit(viewingWindow, 'channel')
                }

                scope.savePackage()

                PackageFactory.updatePackageChannels(scope);


                //if (scope.package.chosenProviders !== undefined) {
                //    if (!_.includes(scope.package.providers, channel.source)) {
                //        scope.package.providers.push(channel)
                //    }
                //} else {
                //}

                //scope.savePackage()

            }


        }

    }

})