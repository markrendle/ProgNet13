/// <reference path="../references.ts" />

class HomeController{
    hotels: any[];
    static $inject = ["$http"];
    constructor(private $http: ng.IHttpService) {
        $http.get("/hotels/recentlyRated")
            .success((data: any[]) => {
                this.hotels = data;
            });
    }
}