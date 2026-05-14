using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace SecurityWebApp.DTOs
{
    public class RegisterViewModel
    {
        [Required]
        [EmailAddress(ErrorMessage = "Invalid Email Address")]
        public string Email { get; set; }

        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }
    }
}
