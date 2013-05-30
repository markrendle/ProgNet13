var HomeController = (function () {
    function HomeController($http) {
        this.$http = $http;
        var _this = this;
        $http.get("/hotels/recentlyRated").success(function (data) {
            _this.averageRatings(data);
        });
    }
    HomeController.$inject = [
        "$http"
    ];
    HomeController.prototype.averageRatings = function (hotels) {
        hotels.forEach(function (hotel) {
            hotel.averageQuality = hotel.ratings.map(function (r) {
                return r.quality;
            }).average();
        });
        this.hotels = hotels;
    };
    return HomeController;
})();
var Utils;
(function (Utils) {
    var JSON_START = /^\s*(\[|\{[^\{])/, JSON_END = /[\}\]]\s*$/, PROTECTION_PREFIX = /^\)\]\}',?\n/;
    function dateReviver(key, value) {
        var a;
        if(typeof value === 'string') {
            a = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)\+00:00$/.exec(value);
            if(a) {
                return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4], +a[5], +a[6]));
            }
        }
        return value;
    }
    ;
    function transformResponse(data) {
        if(angular.isString(data)) {
            data = data.replace(PROTECTION_PREFIX, '');
            if(JSON_START.test(data) && JSON_END.test(data)) {
                data = JSON.parse(data, dateReviver);
            }
        }
        return data;
    }
    Utils.transformResponse = transformResponse;
    ;
})(Utils || (Utils = {}));
angular.module("bandb", []).config([
    "$routeProvider", 
    "$httpProvider", 
    function ($routeProvider, $httpProvider) {
        $routeProvider.when("/", {
            templateUrl: "html/home.html",
            controller: HomeController,
            controllerAs: "dc"
        });
        $httpProvider.defaults.transformResponse = Utils.transformResponse;
    }]);
