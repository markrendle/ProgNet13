using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BedAndBroadband.Services
{
    using Data;
    using Simple.Data;
    using Simple.Web;
    using Simple.Web.Behaviors;

    [UriTemplate("/hotels/recentlyrated")]
    public class GetRecentlyRatedHotels : IGet, IOutput<IEnumerable<Hotel>>
    {
        private readonly dynamic _db = Database.OpenNamedConnection("Default");
        public Status Get()
        {
            return Status.Success.OK;
        }

        public IEnumerable<Hotel> Output
        {
            get
            {
                return _db.Hotels.All().WithRatings().OrderByLastRatingDateDescending().Take(5);
            }
        }
    }
}
