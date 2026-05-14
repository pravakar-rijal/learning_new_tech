using System.ComponentModel.DataAnnotations;

namespace IdentityAPI.Models
{
    public class Credential
    {
        [Required(ErrorMessage = "User Name is Required")]
        public string Username { get; set; } = string.Empty;

        [Required(ErrorMessage = "Password is Required")]
        public string Password { get; set; } = string.Empty;
    }
}
