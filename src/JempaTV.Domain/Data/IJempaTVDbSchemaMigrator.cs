using System.Threading.Tasks;

namespace JempaTV.Data;

public interface IJempaTVDbSchemaMigrator
{
    Task MigrateAsync();
}
