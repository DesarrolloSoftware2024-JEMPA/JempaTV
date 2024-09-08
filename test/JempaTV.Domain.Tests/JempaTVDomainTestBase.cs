using Volo.Abp.Modularity;

namespace JempaTV;

/* Inherit from this class for your domain layer tests. */
public abstract class JempaTVDomainTestBase<TStartupModule> : JempaTVTestBase<TStartupModule>
    where TStartupModule : IAbpModule
{

}
