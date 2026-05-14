using Microsoft.AspNetCore.Mvc;
using WebAPIDemo.Models;

namespace WebAPIDemo.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ShirtsController : ControllerBase
    {
        //[HttpGet]
        //[Route("/shirts")]
        [HttpGet]
        public string GetShirts([FromQuery]bool IsArchived)
        {
            var isArchived = IsArchived ? nameof(IsArchived) : $"not {nameof(IsArchived)}";
            return $"Return all shirts which {isArchived}";
        }

        //[HttpGet]
        //[Route("/shirts/{id}")]
        [HttpGet("{id}/{color}")]
        public string GetShirtById(int id, [FromRoute] string color, [FromHeader(Name = "size")]string size)
        {
            return $"Reading shirt with Id: {id} and color {color} and size {size}";
        }

        //[HttpPost]
        //[Route("/shirts")]
        [HttpPost]
        public string CreateShirt([FromBody] Shirt shirt, [FromForm] Shirt shirtForm)
        {
            return $"Creating a new shirt {shirtForm.Brand}";
        }

        //[HttpPut]
        //[Route("/shirts/{id}")]
        [HttpPut("{id}")]
        public string UpdateShirt(int id)
        {
            return $"Updating shirt with Id: {id}";
        }

        //[HttpDelete]
        //[Route("/shirts/{id}")]
        [HttpDelete("{id}")]
        public string DeleteShirt(int id)
        {
            return $"Deleting shirt with Id: {id}";
        }
    }
}
