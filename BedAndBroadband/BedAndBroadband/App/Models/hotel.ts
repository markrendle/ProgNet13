module Models {
    export interface Hotel {
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

    export interface Rating {
        id?: number;
        quality: number;
        downloadMbps: number;
        uploadMbps: number;
        date?: Date;
    }
}