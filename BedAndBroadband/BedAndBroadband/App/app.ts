/// <reference path="references.ts" />
angular.module("bandb", [])
    .config([<any>"$routeProvider", "$httpProvider",
        ($routeProvider: ng.IRouteProvider, $httpProvider: ng.IHttpProvider) => {
            $routeProvider
                .when("/", { templateUrl: "html/home.html", controller: HomeController, controllerAs: "dc" });

            $httpProvider.defaults.transformResponse = Utils.transformResponse;
        }]);