/**
 * Created by Nem on 7/18/15.
 */
app.controller('search', function ($scope, $rootScope, $http, $window, http, PackageFactory, _, Fuse, SLING_CHANNELS, N, growl, loginEventService) {


    $scope.modelOptions = {
        debounce: {
            default: 100,
            blur: 50
        },
        getterSetter: true
    };

    $scope.suggestions = [];
    $scope.selectedIndex = -1;

    $('#searchInput').bind('input', function () {
        $(this).val().length > 0 ? $('.floating-label').addClass('float') : $('.floating-label').removeClass('float')
    })


    $scope.checkMatched = function () {
        return $scope.searchResult[$scope.searchText - 1] === _.last($scope.searchText)
    }

    var search_query = ""

    $scope.search = function (val) {

        if (val) {
            search_query = val
            return $http.get('/api/search?q=' + val)
                .then(function (data) {
                    // ;


                    var sorted = _.chain(data.data)
                        .filter(function (elem) {
                            return elem.title !== null
                        })
                        .sortBy(function (elem) {

                            return 0
                        })
                        .value()

                    if (true) {
                        $scope.suggestions = sorted;
                        return sorted
                    }
                    $scope.selectedIndex = -1
                });
        } else {
            $scope.suggestions = [];
            return "hello world"
        }
    };


    var cleanString = function (s) {
        s = s.replace(/\\n/g, "\\n")
            .replace(/\\'/g, "\\'")
            .replace(/\\"/g, '\\"')
            .replace(/\\&/g, "\\&")
            .replace(/\\r/g, "\\r")
            .replace(/\\t/g, "\\t")
            .replace(/\\b/g, "\\b")
            .replace(/\\f/g, "\\f")
            .replace(RegExp(/None/g), '"false"');

        // remove non-printable and other non-valid JSON chars
        s = s.replace(/[\u0000-\u0019]+/g, "");


        return s

    }

    var fixGuideboxData = function (c) {
        if (typeof c.guidebox_data == 'string') {
            var jsonString = c.guidebox_data.replace(/'/g, '"');
            jsonString = cleanString(jsonString)
            c.guidebox_data = JSON.parse(jsonString)
        }


        return c

    }

    $rootScope.addToSelectedShows = function (suggestion, model, label, event) {

        // if (!$window.sessionStorage.token) {
        //     growl.info("Please authenticate to use this application.")
        //         .then(function () {
        //
        //             loginEventService.broadcast()
        //         })
        //
        //     return
        // }
        var ssPackage = PackageFactory.getPackage();

        if ('hidden' in ssPackage.data.services) {
            ssPackage.data.services.hidden = [];
        }

        if (suggestion !== undefined) {
            if (_.some(ssPackage.data.content, ['url', suggestion.url])) {
                growl.warning('You already added ' + suggestion.title + ' to your package!');
                $scope.suggestions = [];
                return
            }

            // suggestion.url = suggestion.url.replace('http', 'https');
            //  ;
            var parser = document.createElement('a');
            parser.href = suggestion.url

            url = /api/.test(parser.pathname) ? parser.pathname : '/api' + parser.pathname
            $http.get(url)
                .then(function (data) {


                    suggestion = fixGuideboxData(data.data)


                    if (suggestion.guidebox_data.id !== undefined && typeof suggestion.guidebox_data.id === 'number') {
                        $scope.loading = true;

                        suggestion.justAdded = true;


                        ssPackage.data.content.push(suggestion);

                        PackageFactory.setPackage(ssPackage);

                        $scope.loading = false;
                        mixpanel.track("Show added", {
                            "id": 5,
                            "show_title": suggestion.title,
                            "search_query": search_query,
                            "user": $window.sessionStorage.user
                        });
                    }

                })
        }
        $scope.searchText = '';
        $scope.suggestions = [];


    };

    $scope.checkKeyDown = function (event) {

        if (event.keyCode === 40) {
            event.preventDefault();
            if ($scope.selectedIndex + 1 !== $scope.suggestions.length) {
                $scope.selectedIndex++;
            }
        } else if (event.keyCode === 38) {
            event.preventDefault();
            if ($scope.selectedIndex - 1 !== -1) {
                $scope.selectedIndex--
            }
        } else if (event.keyCode === 13) {
            if ($scope.selectedIndex > -1) {

                $scope.addToSelectedShows($scope.suggestions[$scope.selectedIndex]);
            }
        } else if (event.keyCode === 8) {
            $scope.searchResult = '';
        }


    };


    $scope.$watch('selectedIndex', function (val) {
        if (val !== -1) {
            $scope.searchText = $scope.suggestions[$scope.selectedIndex].title
        }
    });


});

