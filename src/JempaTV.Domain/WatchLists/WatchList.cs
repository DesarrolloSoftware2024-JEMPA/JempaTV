using JempaTV.Series;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Entities;

namespace JempaTV.WatchLists
{
    public class WatchList : AggregateRoot<int>
    {
        public List<Serie> Series { get; set; }

        public Guid? IdUsuario { get; set; }

        public WatchList()
        {
            Series = new List<Serie>();
        }

    }
}
