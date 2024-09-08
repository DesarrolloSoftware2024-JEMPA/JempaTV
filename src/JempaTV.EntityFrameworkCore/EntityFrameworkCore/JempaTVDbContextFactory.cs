using System;
using System.IO;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace JempaTV.EntityFrameworkCore;

/* This class is needed for EF Core console commands
 * (like Add-Migration and Update-Database commands) */
public class JempaTVDbContextFactory : IDesignTimeDbContextFactory<JempaTVDbContext>
{
    public JempaTVDbContext CreateDbContext(string[] args)
    {
        var configuration = BuildConfiguration();
        
        JempaTVEfCoreEntityExtensionMappings.Configure();

        var builder = new DbContextOptionsBuilder<JempaTVDbContext>()
            .UseSqlServer(configuration.GetConnectionString("Default"));
        
        return new JempaTVDbContext(builder.Options);
    }

    private static IConfigurationRoot BuildConfiguration()
    {
        var builder = new ConfigurationBuilder()
            .SetBasePath(Path.Combine(Directory.GetCurrentDirectory(), "../JempaTV.DbMigrator/"))
            .AddJsonFile("appsettings.json", optional: false);

        return builder.Build();
    }
}
