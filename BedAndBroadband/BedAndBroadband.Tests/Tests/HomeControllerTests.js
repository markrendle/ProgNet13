/// <chutzpah_reference path="../Scripts/sugar-full.development.js" />
/// <chutzpah_reference path="../Scripts/angular.js" />
/// <chutzpah_reference path="../Scripts/angular-mocks.js" />
/// <chutzpah_reference path="../app.js" />
/// <chutzpah_reference path="../Scripts/jasmine/jasmine.js" />
/// <reference path="../Scripts/typings/jasmine/jasmine.d.ts" />
/// <reference path="../Scripts/typings/angularjs/angular-mocks.d.ts" />
/// <reference path="../Scripts/typings/angularjs/angular.d.ts" />
/// <reference path="../app.d.ts" />
describe("HomeController", function () {
    describe("construction", function () {
        var ctrl, $httpBackend;
        beforeEach(inject(function (_$httpBackend_, $rootScope, $controller) {
            $httpBackend = _$httpBackend_;
            $httpBackend.expectGET("/hotels/recentlyRated").respond([
                {
                    name: "The Ritz",
                    ratings: [
                        {
                            quality: 1
                        }, 
                        {
                            quality: 2
                        }, 
                        {
                            quality: 3
                        }
                    ]
                }, 
                {
                    name: "Claridges",
                    ratings: [
                        {
                            quality: 4
                        }, 
                        {
                            quality: 5
                        }, 
                        {
                            quality: 6
                        }
                    ]
                }
            ]);
            ctrl = $controller(HomeController);
        }));
        it("should average quality rating for each hotel", function () {
            $httpBackend.flush();
            expect(ctrl.hotels[0].name).toBe("The Ritz");
            expect(ctrl.hotels[0].averageQuality).toBe(2);
            expect(ctrl.hotels[1].name).toBe("Claridges");
            expect(ctrl.hotels[1].averageQuality).toBe(5);
        });
    });
});
