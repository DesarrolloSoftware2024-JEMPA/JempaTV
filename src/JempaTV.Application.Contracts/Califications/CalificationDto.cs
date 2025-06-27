using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;

namespace JempaTV.Califications
{
    public class CalificationDto : EntityDto<int>
    {
        public required int IdSerie { get; set; }
        public required int Valor { get; set; }
        public string? Comentario { get; set; }
    }
}   