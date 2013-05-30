var HomeController = (function () {
    function HomeController($http, $window) {
        this.$http = $http;
        this.$window = $window;
        var _this = this;
        $http.get("/hotels/recentlyRated").success(function (data) {
            _this.hotels = _this.averageRatings(data);
        });
    }
    HomeController.$inject = [
        "$http", 
        "$window"
    ];
    HomeController.prototype.search = function () {
        var _this = this;
        this.$http.get("/hotels", {
            params: {
                query: this.query
            }
        }).success(function (results) {
            _this.searchResults = _this.averageRatings(results);
        }).error(function (data, status) {
        });
    };
    HomeController.prototype.averageRatings = function (hotels) {
        hotels.forEach(function (hotel) {
            hotel.averageQuality = (hotel.ratings || []).map(function (r) {
                return r.quality;
            }).average();
        });
        return hotels;
    };
    return HomeController;
})();
