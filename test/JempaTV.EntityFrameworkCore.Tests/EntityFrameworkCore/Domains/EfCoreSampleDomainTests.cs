using JempaTV.Samples;
using Xunit;

namespace JempaTV.EntityFrameworkCore.Domains;

[Collection(JempaTVTestConsts.CollectionDefinitionName)]
public class EfCoreSampleDomainTests : SampleDomainTests<JempaTVEntityFrameworkCoreTestModule>
{

}
