using JempaTV.Califications;
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
        public string? ImdbID { get; set; }
        public Calification? Calification { get; set;}
        public string? Year { get; set; }
        public string? Director { get; set; }
        public string? Actors { get; set; }
        public string? Plot { get; set; }
        public string? Poster {  get; set; }

    }

}
