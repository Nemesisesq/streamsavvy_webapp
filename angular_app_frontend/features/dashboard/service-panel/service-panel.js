app.controller('ServicePanelController', function ($scope, $http, $timeout, PackageFactory, VIEW_WINDOWS) {

    $scope.hello = 'world'

    var ssPackage = PackageFactory.getPackage()
    //debugger
    $scope.listOfServices = _
        .chain(ssPackage.data.content)
        .map(function (elem) {
            //debugger
            return elem.channel
        })
        .flatten()
        .uniqBy('url')
        .map(function (elem) {
            var o = {chan: elem}
            debugger;
            o.shows = _.filter(ssPackage.data.content, function (show) {
                debugger;
                return _.some(show.channel, ['url', elem.url])
            })

            return o

        })
        .value();

    debugger
    var servObj = _
        .map($scope.listOfServices, function (elem) {
            var o = {chan: elem}
            debugger;
            o.shows = _.filter(ssPackage.data.content, function (show) {
                return _.includes(show.channel, elem)
            })

        })


    var compileService = function () {

    }


    var users = [
        {'user': 'barney', 'age': 36},
        {'user': 'fred', 'age': 40},
        {'user': 'pebbles', 'age': 1}
    ];

    var youngest = _
        .chain(users)
        .sortBy('age')
        .map(function (o) {
            return o.user + ' is ' + o.age;
            debugger
        })
        .head()
        .value();

    console.log(youngest)


});