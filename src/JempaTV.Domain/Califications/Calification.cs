using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Entities;

namespace JempaTV.Califications
{
    public class Calification : Entity<int>
    {
        public required int IdSerie { get; set; }
        public required int Valor { get; set; }
        public string? Comentario { get; set; }
    }
}