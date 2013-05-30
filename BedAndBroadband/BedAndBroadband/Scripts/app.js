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
            this.$http.get("/hotel/" + id).success(function (data) {
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
var HotelController = (function () {
    function HotelController(hotelService, $routeParams, $window) {
        this.hotelService = hotelService;
        this.$routeParams = $routeParams;
        this.$window = $window;
        var _this = this;
        hotelService.find($routeParams["id"]).then(function (hotel) {
            _this.hotel = hotel;
        }, function (error) {
            $window.alert(error);
        });
    }
    HotelController.$inject = [
        "hotelService", 
        "$routeParams", 
        "$window"
    ];
    return HotelController;
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
angular.module("bandb", [
    "ui.bootstrap"
]).config([
    "$routeProvider", 
    "$httpProvider", 
    function ($routeProvider, $httpProvider) {
        $routeProvider.when("/hotel/:id", {
            templateUrl: "html/hotel.html",
            controller: HotelController,
            controllerAs: "dc"
        }).when("/", {
            templateUrl: "html/home.html",
            controller: HomeController,
            controllerAs: "dc"
        });
        $httpProvider.defaults.transformResponse = Utils.transformResponse;
    }]).service("hotelService", Services.HotelService);
