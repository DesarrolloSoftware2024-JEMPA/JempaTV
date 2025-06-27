using JempaTV.EntityFrameworkCore;
using JempaTV.WatchLists;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Repositories.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore;

namespace JempaTV
{
    public class WatchlistRepository : EfCoreRepository<JempaTVDbContext, WatchList, int>, IWatchlistRepository
    {
        public WatchlistRepository(IDbContextProvider<JempaTVDbContext> dbContextProvider) : base(dbContextProvider)
        {
        }
        public async Task<List<WatchList>> GetRecentChangesAsync()
        {
            var oneDayAgo = DateTime.UtcNow.AddDays(-1);

            var dbContext = await GetDbContextAsync();

            return await dbContext.WatchLists
                .Include(w => w.Series)
                .Where(w => w.Series.Any(s => s.LastModified >= oneDayAgo))
                .ToListAsync();
        }
    }
}
