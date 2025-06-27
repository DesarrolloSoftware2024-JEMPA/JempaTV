using JempaTV.Califications;
using Shouldly;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Modularity;
using Xunit;

namespace JempaTV.Series
{
    public abstract class SerieAppServiceTests<TStartupModule> : JempaTVApplicationTestBase<TStartupModule>
    where TStartupModule : IAbpModule
    {

        private readonly ISerieAppService _serieAppService;
        private readonly IRepository<Serie, int> _serieRepository;

        public SerieAppServiceTests()
        {
            _serieAppService = GetRequiredService<ISerieAppService>();
            _serieRepository = GetRequiredService<IRepository<Serie, int>>();
        }

        [Fact]
        public async Task FindSerieImdbId_Should_Find_Serie()
        {
            var imdbId = "#0001";

            var result = await _serieAppService.FindSerieImdbId(imdbId);

            result.ShouldNotBeNull();
            result.Title.ShouldBe("Serie de prueba");
        }
    }
}
