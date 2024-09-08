using JempaTV.EntityFrameworkCore;
using Volo.Abp.Autofac;
using Volo.Abp.Modularity;

namespace JempaTV.DbMigrator;

[DependsOn(
    typeof(AbpAutofacModule),
    typeof(JempaTVEntityFrameworkCoreModule),
    typeof(JempaTVApplicationContractsModule)
)]
public class JempaTVDbMigratorModule : AbpModule
{
}
