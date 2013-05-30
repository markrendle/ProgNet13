/// <reference path="references.ts" />
angular.module("bandb", ["ui.bootstrap"])
    .config([<any>"$routeProvider", "$httpProvider",
        ($routeProvider: ng.IRouteProvider, $httpProvider: ng.IHttpProvider) => {
            $routeProvider
                .when("/hotel/:id", {templateUrl: "html/hotel.html", controller: HotelController, controllerAs: "dc" })
                .when("/", { templateUrl: "html/home.html", controller: HomeController, controllerAs: "dc" });

            $httpProvider.defaults.transformResponse = Utils.transformResponse;
        }])
    .service("hotelService", Services.HotelService);