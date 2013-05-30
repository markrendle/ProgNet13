/// <reference path="../references.ts" />
class HotelController {
    hotel: Models.Hotel;
    static $inject = ["hotelService", "$routeParams", "$window", "$dialog"];
    constructor(private hotelService: Services.HotelService,
                private $routeParams: ng.IRouteParamsService,
                private $window: ng.IWindowService,
                private $dialog: ng.ui.IDialogProvider) {
        hotelService.find($routeParams["id"]).then(
            (hotel) => {
                this.hotel = hotel;
            },
            (error) => {
                $window.alert(error);
            });
    }

    rate() {
        var dialog = this.$dialog.dialog({
            templateUrl: "html/rateHotel.html",
            controller: "RateHotelController",
            resolve: {
                hotel: () => this.hotel
            }
        });
        dialog.open();
    }
}