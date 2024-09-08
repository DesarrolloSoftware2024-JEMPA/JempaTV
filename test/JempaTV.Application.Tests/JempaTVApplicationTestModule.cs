using Volo.Abp.Modularity;

namespace JempaTV;

[DependsOn(
    typeof(JempaTVApplicationModule),
    typeof(JempaTVDomainTestModule)
)]
public class JempaTVApplicationTestModule : AbpModule
{

}
