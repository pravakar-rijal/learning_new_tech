using System.ComponentModel.DataAnnotations;

namespace TwoFactAuth.Repositories.Account
{
    public class RegisterUserRequestDto
    {
        [Required(ErrorMessage = "UserName is Required")]
        public string UserName { get; set; } = string.Empty;

        [Required(ErrorMessage = "Email is Required")]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required(ErrorMessage = "Password is Required")]
        public string Password { get; set; } = string.Empty;

        [Required(ErrorMessage = "Confirm Password is Required")]
        [Compare("Password", ErrorMessage = "Password and Confirm Password does not match")]
        public string ConfirmPassword { get; set; } = string.Empty;

        public string? PhoneNumber { get; set; } = string.Empty;

        public bool EnableTwoFactor { get; set; } = false;

        public string? ClientUrl { get; set; } = string.Empty;
    }

    public class RegisterUserResponseDto
    {
        public bool IsSuccessful { get; set; }

        public IEnumerable<string>? Errors { get; set; }
    }
}
