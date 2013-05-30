/// <reference path="../references.ts" />

class HomeController{
    hotels: Models.Hotel[];
    static $inject = ["$http"];
    constructor(private $http: ng.IHttpService) {
        $http.get("/hotels/recentlyRated")
            .success((data: Models.Hotel[]) => {
                this.averageRatings(data);
            });
    }

    private averageRatings(hotels: Models.Hotel[]) {
        hotels.forEach((hotel: Models.Hotel) => {
            hotel.averageQuality = hotel.ratings.map((r) => r.quality).average();
        });
        this.hotels = hotels;
    }
}