using AutoMapper;
using JempaTV.Califications;
using JempaTV.WatchLists;
using Scriban.Syntax;
using JetBrains.Annotations;

using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.ObjectMapping;
using Volo.Abp.Users;
using Volo.Abp;
using Microsoft.Extensions.Logging;

namespace JempaTV.Series
{
    public class SerieAppService : CrudAppService<Serie, SerieDto, int, PagedAndSortedResultRequestDto, CreateUpdateSerieDto>, ISerieAppService
    {
        private readonly ISerieApiService _seriesApiService;
        private readonly IRepository<WatchList, int> _watchlistRepository;
        private readonly IRepository<Serie, int> _serieRepository;
        private readonly ICurrentUser _currentUser;
        private readonly IMapper _mapper;
        private readonly ILogger<SerieAppService> _logger;
        public SerieAppService(ILogger<SerieAppService> logger, IRepository<Serie, int> repository, ISerieApiService seriesapiService, IRepository<WatchList, int> watchlistRepository, IRepository<Serie, int> serieRepository, IMapper mapper, ICurrentUser currentUser) : base(repository)
        {
            _seriesApiService = seriesapiService;
            _watchlistRepository = watchlistRepository;
            _serieRepository = serieRepository;
            _currentUser = currentUser;
            _mapper = mapper;
            _logger = logger;
        }

        public async Task<ICollection<SerieDto>> SearchAsync(string title)
        {
            return await _seriesApiService.GetSeriesAsync(title);
        }

        public async Task<SerieDto> SearchImdbId(string imdbId)
        {
            return await _seriesApiService.GetSeriesAsyncImdbId(imdbId);
        }

        public async Task<SerieDto> FindSerieImdbId (string imdbId)
        {
            var serie = await _serieRepository.FirstOrDefaultAsync(s => s.ImdbID == imdbId);
            return _mapper.Map<SerieDto>(serie);
        }

        public async Task PersistSeriesAsync(string title)
        {
            var matchedSeries = await _seriesApiService.GetDetailedSerieAsync(title);

            var listSeries = _mapper.Map<List<Serie>>(matchedSeries);

            await _serieRepository.InsertManyAsync(listSeries);
        }

        public async Task<Collection<SerieDto>> GetInternalSeries()
        {
            var series = await _serieRepository.ToListAsync();

            var seriesDto = _mapper.Map<Collection<SerieDto>>(series);

            return new Collection<SerieDto>(seriesDto);
        }

        public async Task<List<CalificationDto>> GetCalificationsAsync()
        {
            
            try
            {

                Guid? IdUsuario = _currentUser.Id;

                var calificationList = new List<CalificationDto>();

                var queryable = await _watchlistRepository.WithDetailsAsync(w => w.Series);

                var watchlist = (await AsyncExecuter.ToListAsync(queryable)).FirstOrDefault(w=>w.IdUsuario == IdUsuario);

                if (watchlist != null)
                {
                    foreach (var serie in watchlist.Series)
                    {
                            var seriesQueryable = await _serieRepository.WithDetailsAsync(s => s.Calification);

                            var series = (await AsyncExecuter.ToListAsync(seriesQueryable)).FirstOrDefault(s=> s.Id == serie.Id);

                            if (series?.Calification != null)
                            {
                            calificationList.Add(_mapper.Map<CalificationDto>(series?.Calification));
                            }
                              
                    }

                }

                return calificationList;

            } catch (Exception ex)
            {
                _logger.LogError(ex, "Ocurri� un error al obtener las calificaciones del usuario actual.");

                return new List<CalificationDto>();
            }

            
        }

        public async Task<CalificationDto> GetCalificationFromSerieAsync(int serieId)
        {
            try
            {
                var serieQueryable = await _serieRepository.WithDetailsAsync(s => s.Calification);

                var series = (await AsyncExecuter.ToListAsync(serieQueryable)).FirstOrDefault(s => s.Id == serieId);

                return _mapper.Map<CalificationDto>(series.Calification);

            }
            catch (Exception ex)
            {

                _logger.LogError(ex, "Ocurri� un error al obtener la calificacion de dicha serie.");

                return null;
            }
        }

        public async Task AddCalificationAsync(CalificationDto calification)
        {
            if (calification.Valor < 5 | calification.Valor > 0) 
            {
                Guid? IdUsuario = _currentUser.Id;

                var serie = await _serieRepository.GetAsync(calification.IdSerie);
            
               var userWatchlist = await _watchlistRepository.GetAsync(w => w.IdUsuario == IdUsuario);

                if (serie != null && userWatchlist != null)
                {

                    if (userWatchlist.Series.Contains(serie))
                    {

                        var newCalification = (_mapper.Map<Calification>(calification));
                        serie.Calification = newCalification;
                        await _serieRepository.UpdateAsync(serie);

                    }
                    else
                    {
                        throw new Exception("La serie no se encuentra en la Watchlist de este usuario.");
                    }
                }

            }
            else
            {
                throw new Exception("El valor de la calificacion no se encuentra entre 0 y 5");
            }

        }

        public async Task EditCalificationAsync(CalificationDto updateCalification)
        {
            Guid? IdUsuario = _currentUser.Id;

            var queryable1 = await _serieRepository.WithDetailsAsync(s => s.Calification);

            var serie = (await AsyncExecuter.ToListAsync(queryable1)).FirstOrDefault(s => s.Id == updateCalification.IdSerie);

            var queryable2 = await _watchlistRepository.WithDetailsAsync(w => w.Series);

            var watchlist = (await AsyncExecuter.ToListAsync(queryable2)).FirstOrDefault(w => w.IdUsuario == IdUsuario);

            if (watchlist.Series.Contains(serie))
            {
                var calification = _mapper.Map<Calification>(updateCalification);
                serie.Calification = calification;
                await _serieRepository.UpdateAsync(serie);
            } 
            else
            {
                _logger.LogInformation("La serie no pertenece a la watchlist de este usuario");
            }
        }

    }

}
