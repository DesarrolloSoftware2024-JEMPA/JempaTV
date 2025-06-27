using JempaTV.Califications;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;

namespace JempaTV.Series
{
    public class SerieDto : EntityDto<int>
    {
        public string ImdbID { get; set; }
        public string Title { get; set; }
        public CalificationDto? Calification { get; set; }
        public string Year { get; set; }
        public string? Director { get; set; }
        public string? Actors { get; set; }
        public string? Plot { get; set; }
        public string Poster { get; set; }

    }
}
