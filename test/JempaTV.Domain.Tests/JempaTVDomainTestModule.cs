using Volo.Abp.Modularity;

namespace JempaTV;

[DependsOn(
    typeof(JempaTVDomainModule),
    typeof(JempaTVTestBaseModule)
)]
public class JempaTVDomainTestModule : AbpModule
{

}
