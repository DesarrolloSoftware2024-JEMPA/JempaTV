using AutoMapper;
using JempaTV.Califications;
using JempaTV.WatchLists;
using Scriban.Syntax;
using JetBrains.Annotations;

using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.ObjectMapping;
using Volo.Abp.Users;
using Volo.Abp.Identity;
using Volo.Abp.AuditLogging;
using JempaTV.Logs;
using Volo.Abp.Account;
using Volo.Abp.Data;
using System.Text.Json.Nodes;
using System.Net;
using Newtonsoft.Json;

namespace JempaTV.Users
{
    public class UserAppService : ApplicationService, IUserAppService
    {
        private readonly ICurrentUser _currentUser;
        private readonly IIdentityUserAppService _identityUserAppService;
        private readonly IRepository<IdentityUser> _identityUserRepository;
        

        public UserAppService(ICurrentUser currentUser, IIdentityUserAppService identityUserAppService, IRepository<IdentityUser> repository)
        { 
            _currentUser = currentUser;
            _identityUserAppService = identityUserAppService;
            _identityUserRepository = repository;
        }

        public async Task setUserEmailConfiguration(bool emailNotification)
        {
            var userId = _currentUser.Id;
            var user = await _identityUserRepository.FirstOrDefaultAsync(u => u.Id == userId);

            if (user != null)
            {
                user.SetProperty("emailNotification", emailNotification);
                await _identityUserRepository.UpdateAsync(user);
            }
            
        }

        public async Task<string> getUserEmailConfiguration()
        {
            var userId = _currentUser.Id;
            var user = await _identityUserRepository.FirstOrDefaultAsync(u => u.Id == userId);
            var userEmailConfig = "";

            if (user != null)
            {
                userEmailConfig = user.GetProperty<string>("emailNotification");
            }

            return JsonConvert.SerializeObject(userEmailConfig);

        }

        public async Task setProfilePicture(string profilePicture)
        {
            var userId = _currentUser.Id;
            var user = await _identityUserRepository.FirstOrDefaultAsync(u => u.Id == userId);

            if (user != null)
            {
                user.SetProperty("profilePicture", profilePicture);
                await _identityUserRepository.UpdateAsync(user);
            }

        }

        public async Task<string> getProfilePicture()
        {
            var userId = _currentUser.Id;
            var user = await _identityUserRepository.FirstOrDefaultAsync(u => u.Id == userId);
            var userProfilePicture = "";

            if (user != null)
            {
                userProfilePicture = user.GetProperty<string>("profilePicture");
            }

            return JsonConvert.SerializeObject(userProfilePicture);

        }

        public async Task<PagedResultDto<IdentityUserDto>> GetAllUsers()
        { 
            return await _identityUserAppService.GetListAsync(new GetIdentityUsersInput());

        }
       



    }
}
