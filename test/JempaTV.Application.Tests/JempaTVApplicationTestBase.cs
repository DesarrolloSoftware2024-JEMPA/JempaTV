using Volo.Abp.Modularity;

namespace JempaTV;

public abstract class JempaTVApplicationTestBase<TStartupModule> : JempaTVTestBase<TStartupModule>
    where TStartupModule : IAbpModule
{

}
