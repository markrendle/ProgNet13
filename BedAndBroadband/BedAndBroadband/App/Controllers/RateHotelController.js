var RateHotelController = (function () {
    function RateHotelController($scope, $window, hotelService, dialog, hotel) {
        this.$window = $window;
        this.hotelService = hotelService;
        this.dialog = dialog;
        this.hotel = hotel;
        $scope.dc = this;
        this.rating = {
            quality: 0,
            downloadMbps: 0,
            uploadMbps: 0
        };
    }
    RateHotelController.$inject = [
        "$scope", 
        "$window", 
        "hotelService", 
        "dialog", 
        "hotel"
    ];
    RateHotelController.prototype.cancel = function () {
        this.dialog.close(false);
    };
    RateHotelController.prototype.rate = function () {
        var _this = this;
        this.hotelService.rate(this.hotel, this.rating).then(function () {
            return _this.dialog.close(true);
        }, function (error) {
            return _this.$window.alert(error);
        });
    };
    return RateHotelController;
})();
