module Models {
    interface Hotel {
        id: number;
        name: string;
        address: string;
        city: string;
        postcode: string;
        country: string;
        wired: bool;
        wireless: bool;
        lastRatingDate: Date;
        ratings: Rating[];
        averageQuality?: number;
        averageUpload?: number;
        averageDownload?: number;
    }
    interface Rating {
        id: number;
        quality: number;
        downloadMbps: number;
        uploadMbps: number;
        date: Date;
    }
}
module Services {
    class HotelService {
        private $http;
        private $q;
        static $inject: string[];
        constructor($http: ng.IHttpService, $q: ng.IQService);
        public getRecentlyRated(): ng.IPromise;
        public find(id: number): ng.IPromise;
        public search(query: string): ng.IPromise;
        private averageRatings(hotels);
    }
}
class HomeController {
    private $http;
    private $window;
    public hotels: Models.Hotel[];
    public searchResults: Models.Hotel[];
    public query: string;
    static $inject: string[];
    constructor($http: ng.IHttpService, $window: ng.IWindowService);
    public search(): void;
    private averageRatings(hotels);
}
class HotelController {
    private hotelService;
    private $routeParams;
    private $window;
    public hotel: Models.Hotel;
    static $inject: string[];
    constructor(hotelService: Services.HotelService, $routeParams: ng.IRouteParamsService, $window: ng.IWindowService);
}
module Utils {
    function transformResponse(data);
}
