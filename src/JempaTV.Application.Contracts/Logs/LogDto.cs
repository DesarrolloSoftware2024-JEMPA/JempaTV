using Microsoft.VisualBasic;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JempaTV.Logs
{
    public class LogDto
    {
        public Guid UserId { get; set; }

        public string? UserName { get; set; }

        public DateTime ExecutionTime { get; set; }

        public int ExecutionDuration { get; set; }

        public string? HttpMethod { get; set; }

        public string? Url { get; set; }

        public string? Exceptions { get; set; }

        public int HttpStatusCode { get; set; }

    }
}
