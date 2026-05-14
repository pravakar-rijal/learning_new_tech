using System.ComponentModel.DataAnnotations;

namespace WebAPIDemo.Models
{
    public class Shirt
    {
        [Required]
        public int Id { get; set; }
        public string Brand { get; set; } = string.Empty;
        public string color { get; set; } = string.Empty;
        public string Size { get; set; } = string.Empty;
        public double? Price { get; set; }
    }
}
