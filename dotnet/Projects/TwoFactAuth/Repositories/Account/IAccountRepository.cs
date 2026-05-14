namespace TwoFactAuth.Repositories.Account
{
    public interface IAccountRepository
    {
        Task<RegisterUserResponseDto> RegisterUser(RegisterUserRequestDto userDto);

        Task<LoginUserResponseDto> LoginUser(LoginUserRequestDto userDto);

        Task<LoginUserResponseDto> EmailConfirmation(string email, string token);

        Task<TwoFactorResponseDto> Generate2FAToken(TwoFactorRequestDto twoFactorDto);
        
        Task<LoginUserResponseDto> LoginWith2FA(TwoFactorRequestOTPDto twoFactorDto);


    }
}
