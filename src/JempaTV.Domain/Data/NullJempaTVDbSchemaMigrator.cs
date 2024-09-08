using System.Threading.Tasks;
using Volo.Abp.DependencyInjection;

namespace JempaTV.Data;

/* This is used if database provider does't define
 * IJempaTVDbSchemaMigrator implementation.
 */
public class NullJempaTVDbSchemaMigrator : IJempaTVDbSchemaMigrator, ITransientDependency
{
    public Task MigrateAsync()
    {
        return Task.CompletedTask;
    }
}
