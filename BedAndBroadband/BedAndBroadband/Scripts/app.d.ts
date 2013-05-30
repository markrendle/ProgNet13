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
class HomeController {
    private $http;
    public hotels: Models.Hotel[];
    static $inject: string[];
    constructor($http: ng.IHttpService);
    private averageRatings(hotels);
}
module Utils {
    function transformResponse(data);
}
