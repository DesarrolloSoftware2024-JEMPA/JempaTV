using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;
using Volo.Abp.AuditLogging;
using Volo.Abp.DependencyInjection;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Identity;

namespace JempaTV.Logs
{
    public class LogAppService : ILogAppService, ITransientDependency
    {

        private readonly IAuditLogRepository _auditLogRepository;
        private readonly IMapper _mapper;
        private readonly IRepository<IdentityUser> _userRepository;

        public LogAppService(IAuditLogRepository auditLogRepository, IMapper mapper, IRepository<IdentityUser> userRepository)
        {
            _auditLogRepository = auditLogRepository;
            _mapper = mapper;
            _userRepository = userRepository;
        }

        public async Task<List<LogDto>> getApiStats()
        {
            var logList = await _auditLogRepository.GetListAsync(l => l.Url.Contains("/api/app/serie"));
            var logListDto = new List<LogDto>();

            foreach (var log in logList)
            {
                logListDto.Add(_mapper.Map<LogDto>(log));
            }

            return logListDto;
        }

        public async Task<int> getAverageExecutionDuration()
        {
            var logListDto = await getApiStats();
            var logQuantity = logListDto.Count();
            var averageDuration = 0;

            foreach (var log in logListDto)
            {
                averageDuration = averageDuration + log.ExecutionDuration;
            }

            averageDuration = averageDuration / logQuantity;
            return averageDuration;
        }



        public async Task<int> getErrorQuantity()
        {
            var logListDto = await getApiStats();
            var err = 0;

            foreach (var log in logListDto)
            {
                if (!log.Exceptions.IsNullOrEmpty())
                {
                    err = err + 1;
                }
            }

            return err;
        }

        public async Task<List<LogDto>> getUserStats()
        {
            var logList = await _auditLogRepository.GetListAsync(l => l.Url.Contains("/api/identity/users"));
            var logListDto = new List<LogDto>();

            foreach (var log in logList)
            {
                logListDto.Add(_mapper.Map<LogDto>(log));
            }

            return logListDto;
        }

        public async Task<List<LogDto>> getAllAuditLogs()
        {
            var logList = await _auditLogRepository.GetListAsync();
            var logListDto = new List<LogDto>();

            foreach (var log in logList)
            {
                logListDto.Add(_mapper.Map<LogDto>(log));
            }

            return logListDto;
        }

        public async Task<int> getTotalUsers()
        {
            return await _userRepository.CountAsync();
        }

    }
}
