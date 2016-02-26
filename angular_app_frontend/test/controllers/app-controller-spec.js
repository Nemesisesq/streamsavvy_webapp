describe('SearchController', function () {
    beforeEach(module('myApp'));

    var $controller;

    beforeEach(inject(function (_$controller_, _$rootScope_) {
        $controller = _$controller_;
        $rootScope = _$rootScope_;
    }))

    describe('$scope.search', function () {
        it('checks for the existance of the search function on the scope', function () {
            var $scope = $rootScope.$new();
            var controller  = $controller('search', {$scope: $scope});
            //expect(true).toBe(true);
            expect(typeof $scope.search).toBe('function')
        });
    });


});
