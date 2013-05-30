var Services;
(function (Services) {
    var HotelService = (function () {
        function HotelService($http, $q) {
            this.$http = $http;
            this.$q = $q;
        }
        HotelService.$inject = [
            "$http", 
            "$q"
        ];
        HotelService.prototype.getRecentlyRated = function () {
            var _this = this;
            var deferred = this.$q.defer();
            this.$http.get("/hotels/recentlyRated").success(function (data) {
                deferred.resolve(_this.averageRatings(data));
            }).error(function (data, status) {
                deferred.reject("Error " + status);
            });
            return deferred.promise;
        };
        HotelService.prototype.find = function (id) {
            var deferred = this.$q.defer();
            this.$http.get("/hotels/" + id).success(function (data) {
                deferred.resolve(data);
            }).error(function (data, status) {
                if(status === 404) {
                    deferred.reject("Hotel not found");
                }
                deferred.reject("Error " + status);
            });
            return deferred.promise;
        };
        HotelService.prototype.search = function (query) {
            var _this = this;
            var deferred = this.$q.defer();
            this.$http.get("/hotels", {
                params: {
                    query: query
                }
            }).success(function (results) {
                deferred.resolve(_this.averageRatings(results));
            }).error(function (data, status) {
                deferred.reject("Error " + status);
            });
            return deferred.promise;
        };
        HotelService.prototype.averageRatings = function (hotels) {
            hotels.forEach(function (hotel) {
                hotel.averageQuality = (hotel.ratings || []).map(function (r) {
                    return r.quality;
                }).average();
            });
            return hotels;
        };
        return HotelService;
    })();
    Services.HotelService = HotelService;    
})(Services || (Services = {}));
