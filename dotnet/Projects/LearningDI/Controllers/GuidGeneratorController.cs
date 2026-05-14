using LearningDI.Services;
using Microsoft.AspNetCore.Mvc;

namespace LearningDI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GuidGeneratorController : ControllerBase
    {
        public readonly IGuidGeneratorService _guidGeneratorService;
        public GuidGeneratorController(IGuidGeneratorService guidGeneratorService)
        {
            _guidGeneratorService = guidGeneratorService;
        }

        [HttpGet("Get")]
        public IActionResult Get()
        {
            Guid guid1 = _guidGeneratorService.GetGuid();
            Guid guid2 = _guidGeneratorService.GetGuid();
            return Content("Generated Guid1: " +  guid1 + "\nGenerated Guid2: " + guid2);
        }
    }
}
