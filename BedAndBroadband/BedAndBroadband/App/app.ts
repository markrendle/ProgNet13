/// <reference path="references.ts" />
angular.module("bandb", [])
    .config([<any>"$routeProvider", ($routeProvider: ng.IRouteProvider) => {
        $routeProvider
            .when("/", { templateUrl: "html/home.html", controller: HomeController, controllerAs: "dc" });
    }]);