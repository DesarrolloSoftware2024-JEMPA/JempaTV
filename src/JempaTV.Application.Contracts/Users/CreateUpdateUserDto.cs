using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JempaTV.Users
{
    public class CreateUpdateUserDto
    {
        [Required]
        public Guid Id { get; set; }
        public String? UserName { get; set; }
        public String? Name { get; set; }
        public String? Surname { get; set; }
        public String? Email { get; set; }
        public String? PhoneNumber { get; set; }
    }
}
