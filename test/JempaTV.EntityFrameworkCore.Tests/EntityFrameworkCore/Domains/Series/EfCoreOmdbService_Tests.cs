using JempaTV.Series;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace JempaTV.EntityFrameworkCore.Domains.Series
{
    [Collection(JempaTVTestConsts.CollectionDefinitionName)]
    public class EfCoreOmdbService_Tests : OmdbService_Tests<JempaTVEntityFrameworkCoreTestModule>
    {
    }
}
