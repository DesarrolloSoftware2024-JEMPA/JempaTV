using Xunit;

namespace JempaTV.EntityFrameworkCore;

[CollectionDefinition(JempaTVTestConsts.CollectionDefinitionName)]
public class JempaTVEntityFrameworkCoreCollection : ICollectionFixture<JempaTVEntityFrameworkCoreFixture>
{

}
