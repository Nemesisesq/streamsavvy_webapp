app.controller('StepOneController', function ($scope, $http, $timeout, PackageFactory) {

    
    
    $scope.directiveVW = [

        {
            type: 'live',
            headerText : 'Live Over the Air.',


        },
        {
            type: 'onDemand',
            headerText : 'On Demand Subscription.',


        },
        {
            type: 'fullseason',
            headerText : 'Binge Watch Full Seasons',


        },
        {
            type: 'alacarte',
            headerText : 'Watch Current Season or Episodes for a fee',


        },


    ]

    $scope.popularShows = null;

    $http.get('api/popular-shows')
        .success(function (data) {
            $scope.popularShows = data.results;
            return data
        })
        .then(function () {
            // ;
            //$('.popular-shows').slick();
        });


    $scope.package = PackageFactory.getPackage();

    $scope.onDemandLength = function (c) {
        debugger;

        return _.filter(c, function(n){
            return n.name == 'Netflix'
        }).length > 0

    }

    $scope.delete = function (content) {
        debugger;

        _.remove($scope.package.content, content);

        $scope.save()

    }

    $scope.prePopulateWindowProvider = function (content, prop) {

        //debugger;

        //var array = _.intersection($scope.package.providers, content.content_provider);

        var array = _.filter(content.content_provider, function(prov){
            return _.includes(_.map($scope.package.providers, function(elem){ return elem.name}), prov.name)
        })

        if(prop == 'onDemand'){

            _.remove(array, function(n){
                return n.name == 'Netflix';

            })
        } else if (prop == 'fullSeason') {

            _.remove(array, function(n){
                return n.name != 'Netflix';
            })
        }

        return _.isEmpty(array) ? false : _.first(array).name;

    }


    $scope.saveWindowProvider = function(obj, prop, value) {
        //debugger;

        obj[prop] = value;

        if(!_.includes($scope.package.providers, value)) {$scope.package.providers.push(value)}
        
        $scope.save()


    }

    $scope.$watch(function () {return PackageFactory.getPackage()}, function(){
        $scope.package = PackageFactory.getPackage();
    })



    $scope.savePackage = function() {
        debugger;
        PackageFactory.setPackage($scope.package)
    }

    $scope.$watchCollection('package.content',function () {
        //debugger;

        PackageFactory.setPackage($scope.package)
    })


});
