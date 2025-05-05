using Microsoft.Extensions.DependencyInjection;
using Volo.Abp;
using Volo.Abp.Authorization;
using Volo.Abp.Autofac;
using Volo.Abp.BackgroundJobs;
using Volo.Abp.Data;
using Volo.Abp.Modularity;
using Volo.Abp.Threading;

namespace JempaTV;

[DependsOn(
    typeof(AbpAutofacModule),
    typeof(AbpTestBaseModule),
    typeof(AbpAuthorizationModule),
    typeof(AbpBackgroundJobsAbstractionsModule)
)]
public class JempaTVTestBaseModule : AbpModule
{
    public override void ConfigureServices(ServiceConfigurationContext context)
    {
        Configure<AbpBackgroundJobOptions>(options =>
        {
            options.IsJobExecutionEnabled = false;
        });

        context.Services.AddAlwaysAllowAuthorization();
    }

    public override void OnApplicationInitialization(ApplicationInitializationContext context)
    {
        SeedTestData(context);
        var dataSeeder = context.ServiceProvider.GetRequiredService<IDataSeeder>(); // Agregado
        AsyncHelper.RunSync(() => dataSeeder.SeedAsync());                          // para client_id error
    }

    private static void SeedTestData(ApplicationInitializationContext context)
    {
        AsyncHelper.RunSync(async () =>
        {
            using (var scope = context.ServiceProvider.CreateScope())
            {
                await scope.ServiceProvider
                    .GetRequiredService<IDataSeeder>()
                    .SeedAsync();
            }
        });
    }
}
