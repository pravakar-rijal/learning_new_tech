using System.ComponentModel.DataAnnotations;

namespace TwoFactAuth.Repositories.Account
{
    public class TwoFactorRequestDto
    {
        [Required]
        public string Email { get; set; } = string.Empty;

        [Required]
        public string? Provider { get; set; }

    }

    public class TwoFactorRequestOTPDto
    {
        [Required]
        public string Email { get; set; } = string.Empty;

        public string? Provider { get; set; }

        [Required]
        public string Token { get; set; } = string.Empty;
    }

    public class TwoFactorResponseDto
    {
        public bool IsSuccessful { get; set; }

        public string? Error { get; set; }

        public string? Message { get; set; }

        public string? Key { get; set; }

        public string? QrCodeImageBase64 { get; set; }
    }
}
