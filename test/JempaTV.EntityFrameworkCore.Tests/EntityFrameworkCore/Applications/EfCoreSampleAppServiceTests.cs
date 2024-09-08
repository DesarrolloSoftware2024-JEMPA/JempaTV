using JempaTV.Samples;
using Xunit;

namespace JempaTV.EntityFrameworkCore.Applications;

[Collection(JempaTVTestConsts.CollectionDefinitionName)]
public class EfCoreSampleAppServiceTests : SampleAppServiceTests<JempaTVEntityFrameworkCoreTestModule>
{

}
