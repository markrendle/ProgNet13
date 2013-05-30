/// <reference path="../references.ts" />

class HomeController{
    hotels: Models.Hotel[];
    searchResults: Models.Hotel[];
    query: string;
    static $inject = ["$http", "$window"];
    constructor(private $http: ng.IHttpService, private $window: ng.IWindowService) {
        $http.get("/hotels/recentlyRated")
            .success((data: Models.Hotel[]) => {
                this.hotels = this.averageRatings(data);
            });
    }

    search() {
        this.$http.get("/hotels", { params: { query: this.query } })
            .success((results) => {
                this.searchResults = this.averageRatings(results);
            })
            .error((data, status) => {});
    }
    

    private averageRatings(hotels: Models.Hotel[]) {
        hotels.forEach((hotel: Models.Hotel) => {
            hotel.averageQuality = (hotel.ratings || []).map((r: Models.Rating) => r.quality).average();
        });
        return hotels;
    }
}