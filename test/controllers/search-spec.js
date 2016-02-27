describe('SearchController', function () {
    beforeEach(
        function () {

            module('myApp');
            module('ngMockE2E');
        }
    );

    var $controller, $rootScope, $httpBackend, $timeout;

    beforeEach(inject(function (_$controller_, _$rootScope_, _$httpBackend_,_$timeout_) {
        $controller = _$controller_;
        $rootScope = _$rootScope_;
        $httpBackend = _$httpBackend_;
        $timeout = _$timeout_;

        $httpBackend.expectGET('/netflixable/').respond('hello world')
        $httpBackend.expectGET('/api/package/').respond('hello world')
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

        it('calls the server with a query and gets a list back', function (done) {

            expect($scope.suggestions).toBe([]);
            $httpBackend.whenGET(/^\/api\//).passThrough()
            //$rootScope.$apply();

            setTimeout(function () {
                spyOn($scope, 'search').and.callThrough()

                var res = $scope.search('orange');
                expect(res).toBe('hello world')
                expect($scope.suggestions.length).toBeGreaterThan(0)
                done();
            },1000);

        });
    });


});
/**
 * Created by Nem on 2/25/16.
 */
