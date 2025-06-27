using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Repositories;

namespace JempaTV.WatchLists
{
    public interface IWatchlistRepository : IRepository<WatchList, int>
    {
        Task<List<WatchList>> GetRecentChangesAsync();
    }
}
