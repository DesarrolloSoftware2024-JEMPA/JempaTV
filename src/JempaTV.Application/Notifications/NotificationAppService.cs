using JempaTV.WatchLists;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;

namespace JempaTV.Notifications
{
    public class NotificationAppService : ApplicationService, INotificationAppService
    {
        public Task SendNotification(NotificationDto notif, int userId)
        {
            throw new NotImplementedException();
        }
    }
}
