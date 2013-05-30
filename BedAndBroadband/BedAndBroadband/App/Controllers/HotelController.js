var HotelController = (function () {
    function HotelController(hotelService, $routeParams, $window) {
        this.hotelService = hotelService;
        this.$routeParams = $routeParams;
        this.$window = $window;
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
        "$window"
    ];
    return HotelController;
})();
