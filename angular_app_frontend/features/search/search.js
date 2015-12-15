/**
 * Created by Nem on 7/18/15.
 */
app.controller('search', function ($scope, $http, http, PackageFactory, _, Fuse, BANNED_CHANNELS) {

    var nShows = [];


    var nChannel = {
        display_name: "Netflix",
        id: 0000,
        source: "netflix",
        type: "subscription"
    }

    $http.get('netflixable/')
        .then(function (data) {

            nShows = new Fuse(data.data, {threshold: .2});
        })

    function isOnNetFlix(show) {
        debugger;
        if (nShows.search(show.title)) {
            return true;
        }
    }

    function checkNextLetter() {
        var s = $scope.searchText,
            r = $scope.searchResult;

        if (s && r) {
            // ;
            if (_.last(s) !== r[s.length - 1]) {
                $scope.searchResult = ''
            }
        }
    }

    $scope.suggestions = [];
    $scope.selectedIndex = -1;


    var switchCase = function (char) {
        if (char == char.toUpperCase()) {
            return char.toLowerCase();
        } else {
            return char.toUpperCase();
        }
    }


    var matchCase = function (search, result) {


        var resultArray = result.split('');

        for (var i = 0; i < search.length; i++) {
            if (search[i] !== resultArray[i]) {
                resultArray[i] = switchCase(resultArray[i])
            }
        }

        return resultArray.join('')


    }

    $scope.checkMatched = function () {
        return $scope.searchResult[$scope.searchText - 1] === _.last($scope.searchText)
    }

    $scope.search = _.debounce(function () {
        if ($scope.searchText) {

            //$scope.suggestions = [];
            $http.get('/api/search?q=' + $scope.searchText)
                .success(function (data) {
                    debugger;


                    //var res = _.min(data.results, function (elem) {
                    //    return elem.title.length
                    //
                    //})

                    //var searchResult = matchCase($scope.searchText, res.title);

                    //if (_.includes(searchResult, $scope.searchText)) {
                    //    $scope.searchResult = searchResult;
                    //
                    //}

                    var sorted = _.sortBy(data.results, function (elem) {


                        return elem.title.length

                    })

                    if (data.searchText == $scope.searchText) {
                        $scope.suggestions = sorted;
                    }

                    $scope.selectedIndex = -1
                });
        } else {
            $scope.suggestions = [];
        }
    }, 250, {'maxWait': 1000});

    $scope.addToSelectedShows = function (suggestion) {
        //debugger;
        var ssPackage = PackageFactory.getPackage();

        $http.get('/channels/' + suggestion.guidebox_id)
            .then(function (data) {

                var slingObj = {
                    display_name: "SlingTV",
                    id: 147,
                    source: "sling_tv",
                    type: "live_online_tv"
                }

                suggestion.channels = data.data.results;


                if (_.some(suggestion.content_provider, 'name', 'SlingTV')) {
                    suggestion.channels.push(slingObj)
                }


                var allSources = suggestion.channels.web.episodes.all_sources;
                if (isOnNetFlix(suggestion)) {
                    allSources.push(nChannel)
                }
                var b = _.map(BANNED_CHANNELS, function (elem) {
                    return elem.toLowerCase().replace(' ', '')
                })
                _.remove(allSources, function (elem) {


                    var e = elem.display_name.toLowerCase().replace(' ', '');
                    debugger;
                    return _.includes(b, e)
                });

                ssPackage.content.push(suggestion);
                PackageFactory.setPackage(ssPackage);
            })

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
            $scope.addToSelectedShows($scope.suggestions[$scope.selectedIndex]);
        } else if (event.keyCode === 8) {
            $scope.searchResult = '';
        }

    };


    $scope.$watch('selectedIndex', function (val) {
        if (val !== -1) {
            $scope.searchText = $scope.suggestions[$scope.selectedIndex].title
        }
    });

    $scope.$watch('searchText', function (val) {
        // ;
        if (val !== -1) {
            checkNextLetter();

        }
    })


});

