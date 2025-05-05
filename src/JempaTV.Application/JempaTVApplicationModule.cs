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
using Volo.Abp.Data;
using JempaTV.OpenIddict;
using Volo.Abp.Threading;
using Volo.Abp.OpenIddict;
using Microsoft.Extensions.Options;
using JempaTV.Users;
using JempaTV.Notifications;
using JempaTV.Logs;
using Volo.Abp.Settings;
using JempaTV.Settings;

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

        // Background Worker
        var workerManager = context.ServiceProvider.GetRequiredService<IBackgroundWorkerManager>();
        workerManager.AddAsync(context.ServiceProvider.GetRequiredService<WatchListChangeWorker>());

        // OpenIddict 
        var serviceProvider = context.ServiceProvider;
        var dataSeeder = serviceProvider.GetRequiredService<OpenIddictDataSeedContributor>();
        AsyncHelper.RunSync(() => dataSeeder.SeedAsync(new DataSeedContext()));


    }

    public override void ConfigureServices(ServiceConfigurationContext context)
    {

        Configure<AbpAutoMapperOptions>(options =>
        {
            options.AddMaps<JempaTVApplicationModule>();
        });


        context.Services.AddTransient<ISerieApiService, OmdbService>();
        context.Services.AddTransient<IDataSeedContributor, OpenIddictDataSeedContributor>();
        context.Services.AddTransient<IUserAppService, UserAppService>();
        context.Services.AddTransient<ILogAppService, LogAppService>();
    }
}
