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

            scope.savePackage = function () {
                //debugger;
                PackageFactory.setPackage(scope.package)
            }

            scope.$watchCollection('package.content', function () {
                //debugger;

                PackageFactory.setPackage(scope.package)
            });

            scope.prePopulateWindowProvider = function (content, prop) {

                //debugger;

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

            var updatePackageChannels = function () {



                return $q(function (resolve, reject) {
                    debugger;
                    var chans = _.map(scope.package.content, function (elem) {
                        var x = []
                          debugger;
                        _.forEach(scope.$parent.directiveVW , function (w) {

                            if (elem.viewingWindows[w.type] !== undefined) {
                                x.push(elem.viewingWindows[w.type])
                            }

                        })

                        return x
                    })

                    chans = _.flatten(chans)

                    scope.package.providers = chans
                })


            }

            scope.saveWindowProvider = function (channel) {
                //debugger;

                scope.content.viewingWindows[scope.id].channel = channel;
                debugger;

                updatePackageChannels().then( function(){
                    debugger;
                    scope.savePackage()
                })


                //if (scope.package.chosenProviders !== undefined) {
                //    if (!_.includes(scope.package.providers, channel.source)) {
                //        debugger;
                //        scope.package.providers.push(channel)
                //    }
                //} else {
                //}

                //scope.savePackage()

            }


        }

    }

})