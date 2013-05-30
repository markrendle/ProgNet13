namespace BedAndBroadband.Data
{
    using System;

    public class Rating
    {
        public int Id { get; set; }
        public int Quality { get; set; }
        public decimal DownloadMbps { get; set; }
        public decimal UploadMbps { get; set; }
        public DateTimeOffset Date { get; set; }
    }
}