﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;

namespace JempaTV.Notifications
{
    public class NotificationDto : EntityDto<int>
    {
        public string Title { get; set; }

        public string User { get; set; }

        public string? Content { get; set; }

        public string? Type { get; set; }

        public bool Read {  get; set; }
    }
}
