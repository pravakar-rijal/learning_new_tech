using System.ComponentModel.DataAnnotations;

namespace TwoFactAuth.Repositories.Account
{
    public class LoginUserRequestDto
    {
        [Required(ErrorMessage = "Email is Required")]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required(ErrorMessage = "Password is Required")]
        public string Password { get; set; } = string.Empty;
    }

    public class LoginUserResponseDto
    {
        public bool IsSuccessful { get; set; }

        public string? Error { get; set; }
    }
}
