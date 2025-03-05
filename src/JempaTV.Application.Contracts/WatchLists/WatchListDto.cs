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

        public Guid? IdUsuario { get; set; }

        public WatchListDto()
        {
            Series = new List<SerieDto>();
        }

    }

    public class CreateUpdateWatchListDto
    {
        public List<CreateUpdateSerieDto> Series { get; set; }

        public Guid? IdUsuario { get; set; }

        public CreateUpdateWatchListDto()
        {
            Series = new List<CreateUpdateSerieDto>();
        }
    }
}
