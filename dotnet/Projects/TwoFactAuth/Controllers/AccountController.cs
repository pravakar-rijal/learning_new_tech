using Microsoft.AspNetCore.Mvc;
using TwoFactAuth.Repositories.Account;

namespace TwoFactAuth.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IAccountRepository _accountRepository;

        public AccountController(IAccountRepository accountRepository)
        {
            _accountRepository = accountRepository;
        }

        [HttpPost("Register")]
        public async Task<IActionResult> RegisterUser([FromBody] RegisterUserRequestDto userDto)
        {
            if(userDto is null)
            {
                return BadRequest("Invalid User Received");
            }

            var result = await _accountRepository.RegisterUser(userDto);

            if(!result.IsSuccessful)
            {
                return BadRequest(result);
            }

            return StatusCode(201, result);
        }

        [HttpPost("Login")]
        public async Task<IActionResult> LoginUser([FromBody] LoginUserRequestDto userDto)
        {
            if(userDto is null)
            {
                return BadRequest("Invalid User Received");
            }

            var result = await _accountRepository.LoginUser(userDto);

            if (!result.IsSuccessful)
            {
                return Unauthorized(result);
            }

            return StatusCode(200, result);
        }

        [HttpGet("EmailConfirmation")]
        public async Task<IActionResult> EmailConfirmation([FromQuery]string email, [FromQuery]string token)
        {
            var result = await _accountRepository.EmailConfirmation(email, token);

            if(!result.IsSuccessful)
            {
                return Unauthorized(result);
            }

            return Ok(result);
        }

        [HttpPost("Generate2FAToken")]
        public async Task<IActionResult> Generate2FAToken(TwoFactorRequestDto twoFactorDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var result = await _accountRepository.Generate2FAToken(twoFactorDto);

            if (!result.IsSuccessful)
            {
                return BadRequest(result);
            }

            if (twoFactorDto.Provider != "Email" && result.QrCodeImageBase64 is not null)
            {
                var qrCodeBytes = Convert.FromBase64String(result.QrCodeImageBase64);
                //return Ok(result);
                return File(qrCodeBytes, "image/png");
            }

            return Ok(result);
        }

        [HttpPost("LoginWith2FA")]
        public async Task<IActionResult> LoginWith2FA([FromBody] TwoFactorRequestOTPDto twoFactorDto)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest();
            }

            var result = await _accountRepository.LoginWith2FA(twoFactorDto);

            if(!result.IsSuccessful)
            {
                return Unauthorized(result);
            }

            return StatusCode(200, result);
        }
    }
}
