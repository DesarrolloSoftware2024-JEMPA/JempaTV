using AutoMapper;
using JempaTV.Califications;
using JempaTV.Series;
using JempaTV.WatchLists;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp;
using Volo.Abp.Application.Services;
using Volo.Abp.Data;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Emailing;
using Volo.Abp.Identity;
using Volo.Abp.Users;
using Volo.Abp.Validation;

namespace JempaTV.Notifications
{
    public class NotificationAppService : ApplicationService, INotificationAppService
    {

        private readonly IRepository<Notification, int> _notificationRepository;
        private readonly ICurrentUser _currentUser;
        private readonly IMapper _mapper;
        private readonly IEmailSender _emailSender;
        private readonly IRepository<IdentityUser> _identityUserRepository;
        private readonly ISerieApiService _serieApiService;

        public NotificationAppService(IRepository<Notification, int> notificationRepository, IMapper mapper, ICurrentUser currentUser, IEmailSender emailSender, IRepository<IdentityUser> repository, ISerieApiService serieApiService) 
        {
            _notificationRepository = notificationRepository;
            _currentUser = currentUser;
            _emailSender = emailSender;
            _mapper = mapper;
            _identityUserRepository = repository;
            _serieApiService = serieApiService;
        }

        private readonly string JempaTvImageUrl = "https://placehold.co/300x450?text=JempaTV";

        public async Task SendNotification(NotificationDto notif)
        {
            var notification = new Notification()
            {
                Title = notif.Title,
                Content = notif.Content,
                Read = notif.Read,
                User = _currentUser.Id,
                Fecha = DateTime.UtcNow,
                OmdbId = notif.OmdbId,

            };

            var serie = await _serieApiService.GetSeriesAsyncImdbId(notif.OmdbId);

            if (serie.Poster != null)
            {
                notification.Poster = serie.Poster;
            } else
            {
                notification.Poster = JempaTvImageUrl;
            }

            var userEmail = _currentUser.Email;
            var userId = _currentUser.Id;            

            // Acceder a todos los atributos de User
            var user = await _identityUserRepository.FirstOrDefaultAsync(u => u.Id == userId);
               
            var emailNotification = user.GetProperty<bool>("emailNotification");

            if ((userEmail != null) && emailNotification)
            {
                await _emailSender.SendAsync(userEmail, notif.Title, notif.Content);
            }

            await _notificationRepository.InsertAsync(notification);
            
        }

        public async Task<Collection<NotificationDto>> GetNotificationFromUser()
        {
            Guid? userId = _currentUser.Id;

            var notificationDtoList = new Collection<NotificationDto>();

            var notificationList = await _notificationRepository.GetListAsync(n => n.User == userId);

            notificationDtoList = _mapper.Map<Collection<NotificationDto>>(notificationList);

            return notificationDtoList;
        }
        
        public async Task<string> GetUnreadNotifications()
        {
            var notificationDtoList = await GetNotificationFromUser();

            var response = false;

            if (!notificationDtoList.IsNullOrEmpty())
            {
                foreach (var notif in notificationDtoList)
                {
                    if (notif.Read == false)
                    {
                        response = true;
                    }
                }
            }

            return JsonConvert.SerializeObject(response);
        }

        public async Task TestNotification()
        {
            var notification = new NotificationDto()
            {
                Fecha = DateTime.UtcNow,
                Title = "Notificación de prueba",
                Content = "Si recibiste esta notificacion es porque el sistema funciona correctamente.",
                Read = false
            };

            await SendNotification(notification);
        }

        public async Task UpdateAsync(NotificationDto notificationDto)
        {
            var notification = await _notificationRepository.GetAsync(n => n.Id == notificationDto.Id);

            notification.Title = notificationDto.Title;
            notification.Content = notificationDto.Content;
            notification.Fecha = notificationDto.Fecha;
            notification.Read = notificationDto.Read;

            await _notificationRepository.UpdateAsync(notification);
        }
    }


}
