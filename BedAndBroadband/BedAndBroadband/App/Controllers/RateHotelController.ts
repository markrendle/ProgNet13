/// <reference path="../references.ts" />
class RateHotelController {
    rating: Models.Rating;
    static $inject = ["$scope", "$window", "hotelService", "dialog", "hotel"];
    constructor($scope, private $window: ng.IWindowService, private hotelService: Services.HotelService, private dialog: ng.ui.IDialog, public hotel: Models.Hotel) {
        $scope.dc = this;
        this.rating = {
            quality: 0,
            downloadMbps: 0,
            uploadMbps: 0
        };
    }

    cancel() {
        this.dialog.close(false);
    }

    rate() {
        this.hotelService.rate(this.hotel, this.rating).then(
            () => this.dialog.close(true),
            (error) => this.$window.alert(error));
    }
}