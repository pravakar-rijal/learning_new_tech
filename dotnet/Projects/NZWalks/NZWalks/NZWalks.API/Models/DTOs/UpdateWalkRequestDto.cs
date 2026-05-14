using System.ComponentModel.DataAnnotations;

namespace NZWalks.API.Models.DTOs
{
    public class UpdateWalkRequestDto
    {
        [Required]
        [MaxLength(100, ErrorMessage = "Name should be a maximum of 100 characters")]
        public string Name { get; set; } = string.Empty;

        [Required]
        [MaxLength(100, ErrorMessage = "Description should be maximum of 1000 characters")]
        public string Description { get; set; } = string.Empty;

        [Required]
        [Range(0, 10000)]
        public double LengthInKm { get; set; }

        public string? WalkImageUrl { get; set; }

        [Required]
        public Guid RegionId { get; set; }

        [Required]
        public Guid DifficultyId { get; set; }
    }
}
