var HotelController = (function () {
    function HotelController(hotelService, $routeParams, $window, $dialog) {
        this.hotelService = hotelService;
        this.$routeParams = $routeParams;
        this.$window = $window;
        this.$dialog = $dialog;
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
        "$window", 
        "$dialog"
    ];
    HotelController.prototype.rate = function () {
        var _this = this;
        var dialog = this.$dialog.dialog({
            templateUrl: "html/rateHotel.html",
            controller: "RateHotelController",
            resolve: {
                hotel: function () {
                    return _this.hotel;
                }
            }
        });
        dialog.open();
    };
    return HotelController;
})();
