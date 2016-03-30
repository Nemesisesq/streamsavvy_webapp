app.controller('CheckoutController', function ($scope, $http, $timeout, PackageFactory, VIEW_WINDOWS) {

    $scope.hello = 'world';

    var ssPackage = PackageFactory.getPackage();
    var listOfServices = $scope.listOfServices;

});

/**
 * Created by chirag on 3/28/16.
 */
