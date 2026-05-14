using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using IdentityAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace IdentityAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public AuthController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromBody] Credential credential)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest();
            }

            if(credential.Username == "admin" && credential.Password == "admin123")
            {
                List<Claim> claims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name, credential.Username),
                    new Claim(ClaimTypes.Email, "admin@gmail.com"),
                    new Claim("Department", "HR"),
                    new Claim("Admin", "true"),
                };

                var expiresAt = DateTime.UtcNow.AddMinutes(24);

                return Ok(new { access_token = CreateToken(claims, expiresAt), expires_at = expiresAt});
            }

            ModelState.AddModelError("Unauthorized", "You are not authorized to access the endpoint");
            
            return Unauthorized(ModelState);
        }

        private string CreateToken (IEnumerable<Claim> claims, DateTime expiresAt)
        {
            string secret = _configuration["JWT:Secret"] ?? "";

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secret));

            var jwt = new JwtSecurityToken(
                claims: claims,
                notBefore: DateTime.UtcNow,
                expires: expiresAt,
                signingCredentials: new SigningCredentials(key: key, algorithm: SecurityAlgorithms.HmacSha256)
                );

            var token = new JwtSecurityTokenHandler().WriteToken(jwt);

            return token;
        }
    }
}
