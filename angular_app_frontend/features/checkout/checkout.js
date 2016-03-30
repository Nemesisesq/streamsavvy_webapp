app.controller('CheckoutController', function ($scope, $http, $timeout, PackageFactory) {

    var ssPackage = PackageFactory.getPackage();
    $scope.list = PackageFactory.getListOfServices();
   

});

/**
 * Created by chirag on 3/28/16.
 */
