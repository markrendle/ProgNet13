/// <reference path="../references.ts" />
class HotelController {
    hotel: Models.Hotel;
    static $inject = ["hotelService", "$routeParams", "$window"];
    constructor(private hotelService: Services.HotelService, private $routeParams: ng.IRouteParamsService, private $window: ng.IWindowService) {
        hotelService.find($routeParams["id"]).then(
            (hotel) => {
                this.hotel = hotel;
            },
            (error) => {
                $window.alert(error);
            });
    }

}