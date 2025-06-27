using JempaTV.Series;
using Shouldly;
using System.Threading.Tasks;
using System;
using Xunit;
using JempaTV.Califications;
using Volo.Abp.Domain.Repositories;

namespace JempaTV.EntityFrameworkCore.Applications.Series
{
    [Collection(JempaTVTestConsts.CollectionDefinitionName)]
    public class EfCoreSerieServiceTests : SerieAppServiceTests<JempaTVEntityFrameworkCoreTestModule>
    {
    }
}
