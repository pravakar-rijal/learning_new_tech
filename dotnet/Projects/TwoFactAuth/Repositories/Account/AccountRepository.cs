using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.WebUtilities;
using QRCoder;
using TwoFactAuth.Utility.Email;

namespace TwoFactAuth.Repositories.Account
{
    public class AccountRepository : IAccountRepository
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly IEmailSender _emailSender;
        private readonly ISmsSender _smsSender;
        private readonly IMapper _mapper;

        public AccountRepository(UserManager<IdentityUser> userManager,IEmailSender emailSender, ISmsSender smsSender, IMapper mapper)
        {
            _userManager = userManager;
            _emailSender = emailSender;
            _smsSender = smsSender;
            _mapper = mapper;
        }

        public async Task<RegisterUserResponseDto> RegisterUser(RegisterUserRequestDto userDto)
        {
            var user = new IdentityUser
            {
                UserName = userDto.UserName,
                Email = userDto.Email,
                PasswordHash = userDto.Password,
                PhoneNumber = userDto.PhoneNumber,
                TwoFactorEnabled = userDto.EnableTwoFactor,
                PhoneNumberConfirmed = true
            };

            var result = await _userManager.CreateAsync(user, userDto.Password);

            if (!result.Succeeded)
            {
                var errors = result.Errors.Select(e => e.Description);

                return new RegisterUserResponseDto { IsSuccessful = false, Errors = errors };
            }

            var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
            var param = new Dictionary<string, string>()
            {
                {"email", user.Email },
                {"token", token}
            };

            var callback = QueryHelpers.AddQueryString(userDto.ClientUrl, param);

            await _emailSender.SendEmailAsync("pravakarrijal@gmail.com", userDto.Email, "Email Confirmation Token", callback);

            return new RegisterUserResponseDto { IsSuccessful = true, Errors = null };
        }

        public async Task<LoginUserResponseDto> LoginUser(LoginUserRequestDto userDto)
        {
            var user = await _userManager.FindByEmailAsync(userDto.Email);

            if(user is null)
            {
                return new LoginUserResponseDto { IsSuccessful = false, Error = "Invalid Authentication" };
            }

            if(!await _userManager.IsEmailConfirmedAsync(user))
            {
                return new LoginUserResponseDto { IsSuccessful = false, Error = "Email is not Confirmed." };
            }

            if(!await _userManager.CheckPasswordAsync(user, userDto.Password))
            {
                return new LoginUserResponseDto { IsSuccessful = false, Error = "Invalid Authentication" };
            }

            if(await _userManager.GetTwoFactorEnabledAsync(user))
            {
                return new LoginUserResponseDto { IsSuccessful = false, Error = "Generate OTP for successful authentication" };
            }

            return new LoginUserResponseDto { IsSuccessful = true, Error = null };
        }

        public async Task<LoginUserResponseDto> EmailConfirmation(string email, string token)
        {
            var user = await _userManager.FindByEmailAsync(email);

            if (user is null)
            {
                return new LoginUserResponseDto { IsSuccessful = false, Error = "Invalid Authentication" };
            }

            var confirmResult = await _userManager.ConfirmEmailAsync(user, token);

            if (!confirmResult.Succeeded)
            {
                return new LoginUserResponseDto { IsSuccessful = false, Error = "Email can't be confirmed" };
            }

            return new LoginUserResponseDto {IsSuccessful = true, Error = null };
        }

        public async Task<TwoFactorResponseDto> Generate2FAToken(TwoFactorRequestDto twoFactorDto)
        {
            var user = await _userManager.FindByEmailAsync(twoFactorDto.Email);
            
            if (user is null)
            {
                return new TwoFactorResponseDto { IsSuccessful = false, Error = "Failed to find user"};
            }
            
            if(twoFactorDto.Provider == "Email")
            {
                var twoFactEmailToken = await _userManager.GenerateTwoFactorTokenAsync(user, "Email");
                await _emailSender.SendEmailAsync("pravakarrijal@gmail.com", twoFactorDto.Email, "Authentication Token", twoFactEmailToken);
                return new TwoFactorResponseDto { IsSuccessful = true, Message = "OTP successfully sent to Email" };
            }
            else if (twoFactorDto.Provider == "Phone")
            {
                var twoFactPhoneToken = await _userManager.GenerateTwoFactorTokenAsync(user, "Phone");
                await _smsSender.SendSmsAsync(user.PhoneNumber, twoFactPhoneToken);
                return new TwoFactorResponseDto { IsSuccessful = true, Message = "OTP successfully sent to Phone" };
            }
            else if (twoFactorDto.Provider == "Authenticator")
            {
                await _userManager.ResetAuthenticatorKeyAsync(user);
                var key = await _userManager.GetAuthenticatorKeyAsync(user);

                var qrCodeGenerator = new QRCodeGenerator();
                var qrCodeData = qrCodeGenerator.CreateQrCode($"otpauth://totp/TwoFactAuthApp:{user.Email}?secret={key}&issuer=TwoFactAuthApp", QRCodeGenerator.ECCLevel.Q);
                var qrCode = new PngByteQRCode(qrCodeData);
                var qrCodeBytes = qrCode.GetGraphic(3);
                var base64QrCode = Convert.ToBase64String(qrCodeBytes);

                return new TwoFactorResponseDto { IsSuccessful = true, Message = "Authenticator QR generated", Key = key, QrCodeImageBase64 = base64QrCode };
            }

            return new TwoFactorResponseDto { IsSuccessful = false, Error = "Failed to generate OTP/Key" };
        }

        public async Task<LoginUserResponseDto> LoginWith2FA(TwoFactorRequestOTPDto twoFactorDto)
        {
            var user = await _userManager.FindByEmailAsync(twoFactorDto.Email);

            if (user is null)
            {
                return new LoginUserResponseDto { IsSuccessful = false, Error = "Invalid Authentication" };
            }

            if (twoFactorDto.Provider == "Email")
            {
                var isTokenValid = await _userManager.VerifyTwoFactorTokenAsync(user, "Email", twoFactorDto.Token);

                if(!isTokenValid)
                {
                    return new LoginUserResponseDto { IsSuccessful = false, Error = "Can't verify token" };
                }
            }
            if (twoFactorDto.Provider == "Phone")
            {
                var isTokenValid = await _userManager.VerifyTwoFactorTokenAsync(user, "Phone", twoFactorDto.Token);

                if (!isTokenValid)
                {
                    return new LoginUserResponseDto { IsSuccessful = false, Error = "Can't verify token" };
                }
            }
            else if(twoFactorDto.Provider == "Authenticator")
            {
                var isTokenValid = await _userManager.VerifyTwoFactorTokenAsync(user, _userManager.Options.Tokens.AuthenticatorTokenProvider, twoFactorDto.Token);
                
                if (!isTokenValid)
                {
                    return new LoginUserResponseDto { IsSuccessful = false, Error = "Can't verify token" };
                }
            }

            return new LoginUserResponseDto { IsSuccessful = true, Error = null };
        }

    }
}
