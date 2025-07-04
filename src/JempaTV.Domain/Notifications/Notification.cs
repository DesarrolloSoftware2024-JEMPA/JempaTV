﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Entities;

namespace JempaTV.Notifications
{
    public class Notification : AggregateRoot<int>
    {

        public string? Title { get; set; }
        public Guid? User {  get; set; }
        public string? Content { get; set; }
        public bool Read { get; set; }
        public DateTime Fecha {  get; set; }
        public string? OmdbId {  get; set; }
        public string? Poster {  get; set; }
    }
}
