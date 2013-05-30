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
