using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;

namespace JempaTV.Notifications
{
    public interface INotificationAppService : IApplicationService
    {
        Task SendNotification(NotificationDto notif, int userId);
    }
}
