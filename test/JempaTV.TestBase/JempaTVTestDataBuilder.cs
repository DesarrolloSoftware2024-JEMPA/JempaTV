using JempaTV.Series;
using System.Threading.Tasks;
using Volo.Abp.Data;
using Volo.Abp.DependencyInjection;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.MultiTenancy;

namespace JempaTV;

public class JempaTVTestDataSeedContributor : IDataSeedContributor, ITransientDependency
{
    private readonly ICurrentTenant _currentTenant;
    private readonly IRepository<Serie, int> _serieRepository;

    public JempaTVTestDataSeedContributor(ICurrentTenant currentTenant, IRepository<Serie, int> serieRepository)
    {
        _currentTenant = currentTenant;
        _serieRepository = serieRepository;
    }

    public Task SeedAsync(DataSeedContext context)
    {
        /* Seed additional test data... */
        _serieRepository.InsertAsync(
                    new Serie { Title = "Serie de prueba", ImdbID = "#0001" },
                    autoSave: true
                );



        using (_currentTenant.Change(context?.TenantId))
        {
            return Task.CompletedTask;
        }
    }
}
