using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;

namespace JempaTV.Logs
{
    public interface ILogAppService : IApplicationService
    {
        Task<List<LogDto>> getApiStats();

        Task<int> getAverageExecutionDuration();

        Task<int> getErrorQuantity();

        Task<List<LogDto>> getUserStats();

        Task<List<LogDto>> getAllAuditLogs();

        Task<int> getTotalUsers();
    }
}
