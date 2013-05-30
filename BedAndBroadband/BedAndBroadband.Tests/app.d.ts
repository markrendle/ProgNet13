module Hypermedia {
    interface ILink {
        href: string;
        rel: string;
    }
    interface IResourceWithLinks {
        links: ILink[];
    }
    function getLink(resource: IResourceWithLinks, rel: string);
}
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
        links?: Hypermedia.ILink[];
    }
    interface Rating {
        id?: number;
        quality: number;
        downloadMbps: number;
        uploadMbps: number;
        date?: Date;
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
        public rate(hotel: Models.Hotel, rating: Models.Rating): ng.IPromise;
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
    private $dialog;
    public hotel: Models.Hotel;
    static $inject: string[];
    constructor(hotelService: Services.HotelService, $routeParams: ng.IRouteParamsService, $window: ng.IWindowService, $dialog: ng.ui.IDialogProvider);
    public rate(): void;
}
class RateHotelController {
    private $window;
    private hotelService;
    private dialog;
    public hotel: Models.Hotel;
    public rating: Models.Rating;
    static $inject: string[];
    constructor($scope, $window: ng.IWindowService, hotelService: Services.HotelService, dialog: ng.ui.IDialog, hotel: Models.Hotel);
    public cancel(): void;
    public rate(): void;
}
module Utils {
    function transformResponse(data);
}
