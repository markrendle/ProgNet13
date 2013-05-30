namespace BedAndBroadband.Services
{
    using System.Collections.Generic;
    using Data;
    using Simple.Data;
    using Simple.Web;
    using Simple.Web.Behaviors;

    [UriTemplate("/hotels")]
    public class GetHotels : IGet, IOutput<IEnumerable<Hotel>>
    {
        private readonly dynamic _db = Database.OpenNamedConnection("Default");

        public Status Get()
        {
            var q = _db.Hotels.All().WithRatings();
            if (!string.IsNullOrWhiteSpace(Query))
            {
                q = q.Where(_db.Hotels.Name.Like("%" + Query + "%") || _db.Hotels.City.Like("%" + Query + "%"));
            }
            Output = q;
            return 200;
        }

        public IEnumerable<Hotel> Output { get; private set; }

        public string Query { get; set; }
    }
}