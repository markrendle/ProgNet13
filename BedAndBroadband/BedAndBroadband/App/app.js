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
