using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;

namespace JempaTV.Notifications
{
    public class NotificationDto : EntityDto<int>
    {
        public string title { get; set; }

        public string content { get; set; }

        public string type { get; set; }
    }
}
