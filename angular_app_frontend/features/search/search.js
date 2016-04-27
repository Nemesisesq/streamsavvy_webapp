
/**
 * Created by Nem on 7/18/15.
 */
app.controller('search', function ($scope, $rootScope, $http, http, PackageFactory, _, Fuse, BANNED_CHANNELS, SLING_CHANNELS, SERVICE_PRICE_LIST, N, MAJOR_NETWORKS, growl) {


    $scope.modelOptions = {
        debounce: {
            default: 500,
            blur: 250
        },
        getterSetter: true
    };

    $scope.suggestions = [];
    $scope.selectedIndex = -1;

    $('#searchInput').bind('input',function(){
        $(this).val().length > 0 ? $('.floating-label').addClass('float') : $('.floating-label').removeClass('float')
    })


    $scope.checkMatched = function () {
        return $scope.searchResult[$scope.searchText - 1] === _.last($scope.searchText)
    }

    $scope.search = function (val) {
        if (val) {
            return $http.get('/api/search?q=' + val)
                .then(function (data) {
                    //debugger;
                    var sorted = _.sortBy(data.data.results, function (elem) {
                        return elem.title.length
                    })

                    if (data.data.searchText == val) {
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

    $rootScope.addToSelectedShows = function (suggestion, model, label, event) {


        var ssPackage = PackageFactory.getPackage();

        if (_.some(ssPackage.data.content, ['title', suggestion.title])) {
            growl.warning('You already added ' + suggestion.title + ' to your package!')
            return
        }


        if (suggestion.guidebox_data.id !== undefined && typeof suggestion.guidebox_data.id === 'number') {
            //debugger;
            $scope.loading = true

            var channels = suggestion.guidebox_data.sources.web.episodes.all_sources

            channels = _.map(channels, function (elem) {
                $http.get('api/channel_images/' + elem.id)
                    .then(function (data) {
                        elem.images = data.data;
                        return elem
                    })
            })


            ssPackage.data.content.push(suggestion);



            PackageFactory.setPackage(ssPackage);

            $scope.loading = false
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




})
;

