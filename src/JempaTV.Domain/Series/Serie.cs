using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Entities;

namespace JempaTV.Series
{
    public class Serie : AggregateRoot<int>
    {
        public required string Title { get; set; }

        public DateTime LastModified { get; set; }
    }
}
