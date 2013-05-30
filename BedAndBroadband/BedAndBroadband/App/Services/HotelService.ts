/// <reference path="../references.ts" />
module Services {
    export class HotelService {
        static $inject = ["$http", "$q"];
        constructor(private $http: ng.IHttpService, private $q: ng.IQService) {
        }

        getRecentlyRated() {
            var deferred = this.$q.defer();
            this.$http.get("/hotels/recentlyRated")
                .success((data: Models.Hotel[]) => {
                    deferred.resolve(this.averageRatings(data));
                })
                .error((data, status) => {
                    deferred.reject("Error " + status);
                });
            return deferred.promise;
        }

        find(id: number) {
            var deferred = this.$q.defer();
            this.$http.get("/hotel/" + id)
                .success((data: Models.Hotel) => {
                    deferred.resolve(data);
                })
                .error((data, status) => {
                    if (status === 404) {
                        deferred.reject("Hotel not found");
                    }
                    deferred.reject("Error " + status);
                });
            return deferred.promise;
        }

        search(query: string) {
            var deferred = this.$q.defer();
            this.$http.get("/hotels", { params: { query: query } })
                .success((results) => {
                    deferred.resolve(this.averageRatings(results));
                })
                .error((data, status) => {
                    deferred.reject("Error " + status);
                });
            return deferred.promise;
        }

        rate(hotel: Models.Hotel, rating: Models.Rating) {
            var rateLink = Hypermedia.getLink(hotel, "rate");
            var deferred = this.$q.defer();
            this.$http.post(rateLink, rating)
                .success(() => deferred.resolve())
                .error((data, status) => {
                    deferred.reject("Error " + status);
                });
            return deferred.promise;
        }

        private averageRatings(hotels: Models.Hotel[]) {
            hotels.forEach((hotel: Models.Hotel) => {
                hotel.averageQuality = (hotel.ratings || []).map((r: Models.Rating) => r.quality).average();
            });
            return hotels;
        }
    }
}