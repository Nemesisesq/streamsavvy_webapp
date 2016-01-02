function slingInProviders(suggestion) {
    return _.some(suggestion.content_provider, 'name', 'SlingTv');
}
/**
 * Created by Nem on 7/18/15.
 */
app.controller('search', function ($scope, $rootScope, $http, http, PackageFactory, _, Fuse, BANNED_CHANNELS, SLING_CHANNELS, SERVICE_PRICE_LIST, N, MAJOR_NETWORKS) {

    var nShows = [];


    var nChannel = {
        display_name: "Netflix",
        id: 0000,
        source: "netflix",
        type: "subcription"
    }


    //TODO make this a constant in the angular app
    //$http.get('netflixable/')
    //    .then(function (data) {
    //
    //        nShows = new Fuse(data.data, {threshold: .2});
    //    })

    function isOnNetFlix(show) {

        var shows = N.getShows();
        if (shows.search(show.title).length > 0) {
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


    $scope.checkMatched = function () {
        return $scope.searchResult[$scope.searchText - 1] === _.last($scope.searchText)
    }

    $scope.search = _.debounce(function () {
        if ($scope.searchText) {

            //$scope.suggestions = [];
            $http.get('/api/search?q=' + $scope.searchText)
                .success(function (data) {


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

    $rootScope.addToSelectedShows = function (suggestion) {
        var ssPackage = PackageFactory.getPackage();

        function addSling() {
            var slingObj = {
                display_name: "Sling TV",
                id: 147,
                source: "sling_tv",
                type: "live_online_tv"
            }



            if (slingInProviders(suggestion)) {
                suggestion.channels.web.episodes.all_sources.push(slingObj)
            }
        }

        var slingChannels = new Fuse(SLING_CHANNELS, {threshold: .3});


        function isNetworkShow(n) {
            return _.includes(MAJOR_NETWORKS, n)
        }

        if (suggestion.guidebox_id !== undefined && typeof suggestion.guidebox_id === 'number') {
            $http.get('/channels/' + suggestion.guidebox_id)
                .then(function (data) {

                    var opts = {
                        keys: ['name'],
                        threshold:.2

                    }

                    sPrices = new Fuse(SERVICE_PRICE_LIST, opts);

                    var cleanedChannels = data.data.results

                    var chans = _.uniq(cleanedChannels.web.episodes.all_sources, 'display_name')

                    chans = _.uniq(chans.concat(suggestion.content_provider), function (elem) {
                        var x;

                        elem.display_name == undefined ? x = elem.name : x= elem.display_name;

                        return x;

                    })

                    chans = _.map(chans, function (elem) {
                        if (elem.name != undefined) {
                            elem.display_name = elem.name;
                            elem.type = elem.channel_type;
                        }




                        return elem
                    })

                    var b = _.map(BANNED_CHANNELS, function (elem) {
                        return elem.toLowerCase().replace(' ', '')
                    })
                    chans = _.filter(chans, function (elem) {

                        //debugger


                        var e = elem.display_name.toLowerCase().replace(' ', '');

                        return !_.includes(b, e)
                    })

                    if (isOnNetFlix(suggestion)) {
                        chans.push(nChannel)
                    }

                    chans = _.map(chans, function (elem) {
                        //debugger;
                        if (isLive(elem) && slingChannels.search(elem.display_name).length == 0 && ! _.includes(elem.display_name.toLowerCase(), 'now') || isNetworkShow(elem.display_name)) {
                            elem.display_name = elem.display_name + ' Over the Air'

                            return elem

                        }

                        if (slingChannels.search(elem.display_name).length > 0 && elem.type != 'free') {
                            //TODO remove this and change the way this is done.
                            //debugger;
                            elem.display_name = 'Sling TV (' + elem.display_name + ')'
                            elem.service = 'sling_tv'
                            elem.price = 20.00.toFixed(2);

                            return elem

                        }

                        if(!_.isEmpty(sPrices.search(elem.display_name))){
                            var res = sPrices.search(elem.display_name)
                            elem.price = res[0].price
                        }

                        return elem;
                    })

                    cleanedChannels.web.episodes.all_sources = chans

                    suggestion.channels = cleanedChannels;


                    ssPackage.content.push(suggestion);
                    PackageFactory.setPackage(ssPackage);
                })
        } else {
            if (suggestion.channels === undefined) {
                suggestion.channels = {web: {episodes: {all_sources: []}}}
            }

            addSling();

            ssPackage.content.push(suggestion);
            PackageFactory.setPackage(ssPackage);
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

