namespace BedAndBroadband.Services
{
    using System;
    using Data;
    using Simple.Data;
    using Simple.Web;
    using Simple.Web.Links;

    [UriTemplate("/hotel/{Id}/ratings")]
    [LinksFrom(typeof(Hotel), Rel = "rate")]
    public class RateHotel : IPost<Rating>
    {
        private readonly dynamic _db = Database.OpenNamedConnection("Default");

        public Status Post(Rating input)
        {
            input.HotelId = Id;
            input.Date = DateTimeOffset.UtcNow;
            _db.Ratings.Insert(input);
            return Status.Success.Created;
        }

        public int Id { get; set; }
    }
}