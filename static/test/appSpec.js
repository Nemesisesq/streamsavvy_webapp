/**
 * Created by Nem on 7/12/15.
 */
describe('hello wordl', function () {
    it('should world', function () {
        expect(true).toBe(true)
    })
});

describe('An Angular Js test suite', function () {
    beforeEach(module('ngResource', function ($provide, $controllerProvider) {
        $controllerProvider.register('MainCtrl', function ($scope) {
            $scope.hello = 'world';
            this.reverse = function (input) {
                return input.split('').reverse().join('')
            }
        })
    }));

    it('should have tests', function () {
        expect(false).toBe(false)
    });

    it('should inject dependencies', inject(function ($resource) {
        expect($resource).toBeDefined();
    }));

    it('should compile angular expressions', inject(function ($rootScope, $compile) {
        $rootScope.sum = 4;

        var expression = '<p> 2 + 2 == {{ sum }}</p>'
        var element = $compile(expression)($rootScope)

        expect(element.html()).not.toContain('2 + 2 == 4');

        $rootScope.$digest();

        expect(element.html()).toContain('2 + 2 == 4');

    }));

    it('should provide controllers', inject(function ($rootScope, $controller) {
        var $scope = $rootScope.$new(),
            ctrl = $controller('MainCtrl', {$scope: $scope});
        expect($scope.hello).toBe('world');
        expect(ctrl.reverse('foo')).toBe('oof');


    }));
});

describe('TestApp', function () {
    var $httpBackend;

    beforeEach(module('myApp'));

    beforeEach(inject(function (_$httpBackend_) {
        $httpBackend = _$httpBackend_;
    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    })

    it('should return a package', inject(function (http, $rootScope) {
        var $scope = $rootScope.$new();
        $httpBackend.expectGET('/hello').respond(200, [
            {name: 'world'}
        ]);
        $scope.hello = [];
        var result = http.get('/hello');

        result.then(function(data){
            $scope.hello = data;
        })

        expect($scope.hello.length).toBe(0);

        $httpBackend.flush();

        expect($scope.hello.length).toBe(1);

    }));


});
