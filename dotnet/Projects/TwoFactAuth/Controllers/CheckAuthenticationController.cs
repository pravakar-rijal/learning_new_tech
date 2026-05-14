using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace TwoFactAuth.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class CheckAuthenticationController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get()
        {
            return Ok("You are Authenticated");
        }
    }
}
