using JempaTV.Series;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;

namespace JempaTV.WatchLists
{
    public class WatchListAppService : ApplicationService, IWatchListAppService

    {

        private readonly IRepository<WatchList, int> _watchListRepository;
        private readonly IRepository<Serie, int> _serieRepository;

        public WatchListAppService(IRepository<WatchList, int> watchListRepository, IRepository<Serie, int> serieRepository)
        {
            this._watchListRepository = watchListRepository;
            this._serieRepository = serieRepository;
        }

        public async Task AddSerieAsync(int serieId)
        {
            var list = await _watchListRepository.GetListAsync();
            var watchlist = list.FirstOrDefault();

            if (watchlist == null)
            {
                watchlist = new WatchList();
                await _watchListRepository.InsertAsync(watchlist);
            }

            var serie = await _serieRepository.GetAsync(serieId);
            watchlist.Series.Add(serie);
            await _watchListRepository.UpdateAsync(watchlist);

        }

        public async Task<List<WatchListDto>> GetRecentChangesAsync()
        {

            var list = await _watchListRepository.GetListAsync();

            var recentChanges = new List<WatchListDto>();

            var oneDayAgo = DateTime.UtcNow.AddDays(-1);

            foreach (var watchlist in list) { 
                foreach (var serie in watchlist.Series)
                {
                    if (serie.LastModified >= oneDayAgo)
                    {
                        
                        recentChanges.Add(new WatchListDto
                        {
                            Id = watchlist.Id,
                            User = watchlist.User
                        });
                    }
                }
            }

            return recentChanges;

    
        }

      
    }
}
