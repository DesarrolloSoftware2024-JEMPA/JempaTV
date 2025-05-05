using AutoMapper;
using JempaTV.Series;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Users;

namespace JempaTV.WatchLists
{
    public class WatchListAppService : ApplicationService, IWatchListAppService

    {

        private readonly IRepository<WatchList, int> _watchListRepository;
        private readonly IRepository<Serie, int> _serieRepository;
        private readonly ICurrentUser _currentUser;
        private readonly IMapper _mapper;

        public WatchListAppService(IRepository<WatchList, int> watchListRepository, IRepository<Serie, int> serieRepository, IMapper mapper, ICurrentUser currentUser)
        {
            this._watchListRepository = watchListRepository;
            this._serieRepository = serieRepository;
            this._currentUser = currentUser;
            this._mapper = mapper;
        }

        public async Task AddSerieAsync(int serieId)
        {
            try
            {
                Guid? IdUsuario = _currentUser.Id;

                var watchlist = ((List<WatchList>)await _watchListRepository.GetListAsync()).FirstOrDefault(w => w.IdUsuario == IdUsuario);

                if (watchlist == null)
                {
                    watchlist = new WatchList();
                    watchlist.IdUsuario=IdUsuario;
                    await _watchListRepository.InsertAsync(watchlist);
                }

                var serie = await _serieRepository.GetAsync(serieId);

                if (!(watchlist.Series.Contains(serie))) { watchlist.Series?.Add(serie); }

                await _watchListRepository.UpdateAsync(watchlist);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                throw;
            }
            

        }

        public async Task AddWatchlist()
        {
            try
            {
                Guid? IdUsuario = _currentUser.Id;

                var watchlist = await _watchListRepository.FirstOrDefaultAsync(w => w.IdUsuario == IdUsuario);

                if (watchlist?.Id == null)
                {
                    var userWatchlist = new WatchList(){ IdUsuario = IdUsuario};
                    await _watchListRepository.InsertAsync(userWatchlist);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                throw;
            }
        }

        public async Task<List<SerieDto>> GetSeriesAsync()
        {
            Guid? IdUsuario = _currentUser.Id;

            var queryable = await _watchListRepository.WithDetailsAsync(w => w.Series);

            var watchlist = (await AsyncExecuter.ToListAsync(queryable)).FirstOrDefault(w => w.IdUsuario == IdUsuario);

            var seriesList = new List<SerieDto>();

            if (watchlist != null)
            foreach (var serie in watchlist.Series)
            {
                seriesList.Add(_mapper.Map<SerieDto>(serie));
            }

            return seriesList;

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
                            IdUsuario = watchlist.IdUsuario,
                        });
                    }
                }
            }

            return recentChanges;

    
        }
        public async Task DeleteSerieFromWatchlist(int IdSerie)
        {
            Guid? IdUsuario = _currentUser.Id;

            var queryable = await _watchListRepository.WithDetailsAsync(w => w.Series);

            var watchlist = (await AsyncExecuter.ToListAsync(queryable)).FirstOrDefault(w => w.IdUsuario == IdUsuario);

            var Series = new List<Serie>();

            if (watchlist != null)
                foreach (var serie in watchlist.Series)
                {
                    if (serie.Id != IdSerie)
                    {
                        Series.Add(serie);
                    }
                    
                }

            watchlist.Series = Series;

            await _watchListRepository.UpdateAsync(watchlist);
            
        }


      
    }
}
