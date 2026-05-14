using AutoMapper;
using NZWalks.API.Models.Domain;
using NZWalks.API.Models.DTOs;

namespace NZWalks.API.Mappings
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            //Region
            CreateMap<RegionDto, Region>().ReverseMap();
            CreateMap<CreateRegionRequestDto, Region>();
            CreateMap<UpdateRegionRequestDto, Region>();

            //Walk
            CreateMap<WalkDto, Walk>().ReverseMap();
            CreateMap<CreateWalkRequestDto, Walk>();
            CreateMap<UpdateWalkRequestDto, Walk>();

            //Difficulty
            CreateMap<DifficultyDto, Difficulty>().ReverseMap();
        }
    }
}
