using JempaTV.Califications;
using Microsoft.Extensions.Primitives;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JempaTV.Series
{
    public class CreateUpdateSerieDto
    {
        [Required]
        public required string  ImdbID { get; set; }
        [Required]
        [MaxLength(150)]
        public required string Title { get; set; }
        public CalificationDto? Calification { get; set; }
        public string? Year { get; set; }
        public string? Director { get; set; }
        public string? Actors { get; set; }
        public string? Plot { get; set; }
        [Required]
        public required string Poster { get; set; }

    }
}
