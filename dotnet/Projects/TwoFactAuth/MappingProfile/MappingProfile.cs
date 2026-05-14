using AutoMapper;
using Microsoft.AspNetCore.Identity;
using TwoFactAuth.Repositories.Account;

namespace TwoFactAuth.MappingProfile
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<RegisterUserRequestDto, IdentityUser>().ReverseMap();
        }
    }
}
