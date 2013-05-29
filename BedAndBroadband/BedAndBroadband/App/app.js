angular.module("bandb", []).config([
    "$routeProvider", 
    function ($routeProvider) {
        $routeProvider.when("/", {
            templateUrl: "html/home.html",
            controller: HomeController,
            controllerAs: "dc"
        });
    }]);
