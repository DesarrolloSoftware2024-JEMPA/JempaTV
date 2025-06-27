using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Net.Http;
using System.Text;
using Newtonsoft.Json;
using System.Threading.Tasks;
using System.Diagnostics;

namespace JempaTV.Series
{
    public class OmdbService : ISerieApiService
    {

        private static readonly string apiKey = "b059b513";
        private static readonly string omdbUrl = "http://www.omdbapi.com/";
        private int Id = 0;

        public async Task<ICollection<SerieDto>> GetSeriesAsync(string title)
        {

            try
            {
                var matchedSeries = new List<SerieDto>();
                using HttpClient client = new();

                //Formamos la url con los datos

                string url = $"{omdbUrl}?s={title}&apikey={apiKey}&type=series&page=1";


                //Obtenemos la respuesta de forma asincrona
                var response = await client.GetAsync(url);

                //Pasamos la respuesta a un JSON
                string jsonResponse = await response.Content.ReadAsStringAsync();

                if (!jsonResponse.IsNullOrEmpty())
                {

                //Deserializamos el JSON a un Objeto
                var searchResponse = JsonConvert.DeserializeObject<SearchResponse>(jsonResponse);

                if (searchResponse.List == null)
                {
                    throw new Exception("Error al convertir los datos de la API");
                }

                //Finalmente obtenemos la lista de series similares

                var omdbSeriesList = searchResponse?.List ?? new List<OmdbSerie>();




                foreach (var serie in omdbSeriesList)
                {
                    Id = Id + 1;
                    matchedSeries.Add(new SerieDto 
                    { 
                        Id = Id,
                        Title = serie.Title,
                        ImdbID = serie.ImdbID, 
                        Actors = serie.Actors,
                        Director = serie.Director,
                        Year = serie.Year,
                        Plot = serie.Plot,
                        Poster = serie.Poster
                    });

                }
                }
                return matchedSeries;

            }
            catch (HttpRequestException e)
            {

                throw new Exception("Error al acceder a los datos de la API: ", e);
            }

        }

        public async Task<ICollection<SerieDto>> GetDetailedSerieAsync(string title)
        {
            try
            {
                var matchedSeries = new List<SerieDto>();
                using HttpClient client = new();

                //Formamos la url con los datos
                string url = $"{omdbUrl}?t={title}&apikey={apiKey}&plot=full&type=series&";

                //Obtenemos la respuesta de forma asincrona
                var response = await client.GetAsync(url);

                //Pasamos la respuesta a un JSON
                var jsonResponse = await response.Content.ReadAsStringAsync();

                var serie = JsonConvert.DeserializeObject<OmdbSerie>(jsonResponse);

                matchedSeries.Add(new SerieDto
                {
                    Id = Id,
                    Title = serie.Title,
                    ImdbID = serie.ImdbID,
                    Actors = serie.Actors,
                    Director = serie.Director,
                    Year = serie.Year,
                    Plot = serie.Plot,
                    Poster = serie.Poster
                });


                return matchedSeries;

            }
            catch (HttpRequestException e)
            {

                throw new Exception("Error al acceder a los datos de la API: ", e);
            }
        }

        private class SearchResponse
        {
            [JsonProperty("Search")]
            public List<OmdbSerie> List { get; set; }
        }

        private class OmdbSerie

        {
            public string ImdbID { get; set; }
            public string Title { get; set; }
            public string Year { get; set; }
            public string Director { get; set; }
            public string Actors { get; set; }
            public string Plot { get; set; }
            public string Poster {  get; set; }

        }

        public async Task<SerieDto> GetSeriesAsyncImdbId(string imdbId)
        {

            try
            {
                using HttpClient client = new();

                //Formamos la url con los datos
                string url = $"{omdbUrl}?i={imdbId}&apikey={apiKey}&type=series&page=1";
                //Obtenemos la respuesta de forma asincrona
                var response = await client.GetAsync(url);

                //Pasamos la respuesta a un JSON
                string jsonResponse = await response.Content.ReadAsStringAsync();

                //Deserializamos el JSON a un Objeto
                var searchResponse = JsonConvert.DeserializeObject<OmdbSerie>(jsonResponse);

                if (searchResponse == null)
                {
                    throw new Exception("Error al convertir los datos de la API");
                }

                //Finalmente obtenemos la lista de series similares
                var serie = searchResponse ?? new OmdbSerie();

                var serieDto = new SerieDto
                    {
                        Id = Id,
                        Title = serie.Title,
                        ImdbID = serie.ImdbID,
                        Actors = serie.Actors,
                        Director = serie.Director,
                        Year = serie.Year,
                        Plot = serie.Plot,
                        Poster = serie.Poster
                    };

                return serieDto;

            }
            catch (HttpRequestException e)
            {

                throw new Exception("Error al acceder a los datos de la API: ", e);
            }

        }
    }
}