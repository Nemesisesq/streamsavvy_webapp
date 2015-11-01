/**
 * Created by Nem on 7/18/15.
 */
app.controller('search', function ($scope, $http, http, PackageService, $rootScope) {

    function checkNextLetter(){
        var s = $scope.searchText,
            r =  $scope.searchResult;

        if (s && r) {
            //debugger;
            if (_.last(s) !== r[s.length - 1]) {
                $scope.searchResult = ''
            }
        }
    }

    $scope.suggestions = [];
    $scope.selectedShows = PackageService.selectedShows;
    $scope.selectedIndex = -1;


    var switchCase = function(char){
        if (char == char.toUpperCase()) {
            return char.toLowerCase();
        } else {
            return char.toUpperCase();
        }
    }


    var matchCase = function (search, result) {

        var resultArray = result.split('');

        for (var i = 0; i < search.length; i++) {
            if(search[i] !== resultArray[i]){
                resultArray[i] = switchCase(resultArray[i])
            }
        }

        return resultArray.join('')


    }

    $scope.checkMatched = function(){
        return $scope.searchResult[$scope.searchText-1] === _.last($scope.searchText)
    }

    $scope.search = _.debounce(function () {
        if ($scope.searchText) {
            //$scope.suggestions = [];
            $http.get('/api/search?q=' + $scope.searchText)
                .success(function (data) {
                    PackageService.searchResults = data.results;


                    var res = _.min(data.results, function (elem) {
                        return elem.title.length

                    })

                    var searchResult = matchCase($scope.searchText, res.title);

                    if(_.includes(searchResult, $scope.searchText)){
                        $scope.searchResult = searchResult;

                    }

                    $scope.suggestions = data.results;

                    $scope.selectedIndex = -1
                });
        } else {
            $scope.suggestions = [];
        }
    }, 100);

    $scope.addToSelectedShows = function (suggestion) {
        var newPackage;

        http.getRestPackage()
            .then(function (pkg) {
                newPackage = pkg;
                newPackage.content.push(suggestion.url);

                http.putPackage(newPackage)
                    .then(function (result) {

                        console.log(result);
                        $rootScope.loadPackage()

                    })
            });

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
        debugger;
        if (val !== -1 ){
            checkNextLetter();

        }
    })


});