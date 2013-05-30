namespace BedAndBroadband.Services
{
    using Data;
    using Simple.Data;
    using Simple.Web;
    using Simple.Web.Behaviors;
    using Simple.Web.Links;

    [UriTemplate("/hotel/{Id}")]
    [Canonical(typeof(Hotel))]
    public class GetHotel : IGet, IOutput<Hotel>
    {
        private readonly dynamic _db = Database.OpenNamedConnection("Default");
        
        public Status Get()
        {
            Output = _db.Hotels.FindAllById(Id).WithRatings().FirstOrDefault();
            return Output == null ? 404 : 200;
        }

        public int Id { get; set; }
        public Hotel Output { get; private set; }
    }
}