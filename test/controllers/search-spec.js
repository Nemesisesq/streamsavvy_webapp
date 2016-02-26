describe('SearchController', function () {
    beforeEach(module('myApp'));

    var $controller;

    beforeEach(inject(function (_$controller_, _$rootScope_, _$httpBackend_) {
        $controller = _$controller_;
        $rootScope = _$rootScope_;
        $httpBackend = _$httpBackend_;

        $httpBackend.expectGET('/netflixable/').respond('hello world')
        $httpBackend.expectGET('/package/').respond('hello world')
    }))

    describe('$scope.search', function () {

        var $scope;
        var controller;

        beforeEach(function () {
            $scope = $rootScope.$new();
            controller = $controller('search', {$scope: $scope});

        })

        it('checks for the existance of the search function on the scope', function () {
            //expect(true).toBe(true);
            expect(typeof $scope.search).toBe('function')
        });

        it('calls the server with a query and gets a list back', function () {
            $httpBackend.whenGET(/^\/api\//).respond([1, 2, 3, 4, 5])

            expect($scope.suggestions).toBe([]);

            spyOn($scope, 'search').and.callThrough()

            var res = $scope.search('orange');
            $rootScope.$apply()
            expect(res).toBe('hello world')
            expect($scope.suggestions.length).toBeGreaterThan(0)

        });
    });


});
/**
 * Created by Nem on 2/25/16.
 */
