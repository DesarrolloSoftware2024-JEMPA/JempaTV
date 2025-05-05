using JempaTV.Series;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;

namespace JempaTV.WatchLists
{
    public interface IWatchListAppService : IApplicationService
    {
        Task AddSerieAsync(int serieId);

        Task AddWatchlist();

        Task<List<SerieDto>> GetSeriesAsync();

        Task<List<WatchListDto>> GetRecentChangesAsync();

    }
}
