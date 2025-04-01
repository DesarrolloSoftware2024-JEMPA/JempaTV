using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;

namespace JempaTV.Notifications
{
    public interface INotificationAppService : IApplicationService
    {
        Task SendNotification(NotificationDto notif);

        Task<Collection<NotificationDto>> GetNotificationFromUser();

        Task<string> GetUnreadNotifications();

        Task TestNotification();

        Task UpdateAsync(NotificationDto notificationDto);
    }
}
