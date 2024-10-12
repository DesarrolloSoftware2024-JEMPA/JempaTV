using JempaTV.Series;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;

namespace JempaTV.WatchLists
{
    public class WatchListDto : EntityDto<int>
    {
        public List<SerieDto> Series { get; set; }

        public WatchListDto()
        {
            Series = new List<SerieDto>();
        }

        public int User { get; set; }
    }
}
