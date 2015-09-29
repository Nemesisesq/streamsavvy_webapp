/**
 * Created by Nem on 7/18/15.
 */
app.controller('search', function ($scope, $http, http, PackageService, $rootScope) {

    $scope.suggestions = [];
    $scope.selectedShows = PackageService.selectedShows;
    $scope.selectedIndex = -1;

    $scope.search = _.debounce(function () {
        debugger;
        if ($scope.searchText.title) {
            //$scope.suggestions = [];
            $http.get('/api/search?q=' + $scope.searchText.title)
                .success(function (data) {
                    PackageService.searchResults = data.results;

                    $scope.suggestions = data.results;

                    $scope.selectedIndex = -1
                });
        } else {
            $scope.suggestions = [];
        }
    }, 500);

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
        }

    };


    $scope.$watch('selectedIndex', function (val) {
        if (val !== -1) {
            $scope.searchText = $scope.suggestions[$scope.selectedIndex]
        }
    });


});