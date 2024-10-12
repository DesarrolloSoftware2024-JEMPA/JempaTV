using Volo.Abp.PermissionManagement;
using Volo.Abp.SettingManagement;
using Volo.Abp.Account;
using Volo.Abp.Identity;
using Volo.Abp.AutoMapper;
using Volo.Abp.FeatureManagement;
using Volo.Abp.Modularity;
using Volo.Abp.TenantManagement;
using JempaTV.Series;
using Microsoft.Extensions.DependencyInjection;
using JempaTV.BackgroundWorker;
using Volo.Abp.BackgroundWorkers;
using Volo.Abp;

namespace JempaTV;

[DependsOn(
    typeof(JempaTVDomainModule),
    typeof(JempaTVApplicationContractsModule),
    typeof(AbpPermissionManagementApplicationModule),
    typeof(AbpFeatureManagementApplicationModule),
    typeof(AbpIdentityApplicationModule),
    typeof(AbpAccountApplicationModule),
    typeof(AbpTenantManagementApplicationModule),
    typeof(AbpSettingManagementApplicationModule)
    )]
public class JempaTVApplicationModule : AbpModule
{

    public override void OnApplicationInitialization(ApplicationInitializationContext context)
    {
        var workerManager = context.ServiceProvider.GetRequiredService<IBackgroundWorkerManager>();

        // Agregar el Background Worker
        workerManager.AddAsync(context.ServiceProvider.GetRequiredService<WatchListChangeWorker>());
    }

    public override void ConfigureServices(ServiceConfigurationContext context)
    {
        Configure<AbpAutoMapperOptions>(options =>
        {
            options.AddMaps<JempaTVApplicationModule>();
        });
        context.Services.AddTransient<ISerieApiService, OmdbService>();
    }
}
