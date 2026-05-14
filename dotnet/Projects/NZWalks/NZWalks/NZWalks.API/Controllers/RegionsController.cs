using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using NZWalks.API.CustomActionFilters;
using NZWalks.API.Models.Domain;
using NZWalks.API.Models.DTOs;
using NZWalks.API.Repositories;

namespace NZWalks.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegionsController : ControllerBase
    {
        private readonly IRegionRepository _regionRepository;
        private readonly IMapper _mapper;
        public RegionsController(IRegionRepository regionRepository, IMapper mapper)
        {
            _regionRepository = regionRepository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var regionsDomain = await _regionRepository.GetAllAsync();
            var regionsDto = _mapper.Map<List<RegionDto>>(regionsDomain);
            return Ok(regionsDto);
        }

        [HttpGet("{id:guid}")]
        public async Task<IActionResult> GetById([FromRoute]Guid id)
        {
            var region = await _regionRepository.GetByIdAsync(id);

            if (region == null)
            {
                return NotFound();
            }

            var regionDto = _mapper.Map<RegionDto>(region);

            return Ok(regionDto);
        }

        [HttpPost]
        [ValidateModel]
        public async Task<IActionResult> Create([FromBody]CreateRegionRequestDto regionRequestDto)
        {
            if (regionRequestDto == null)
            {
                throw new InvalidDataException();
            }

            var regionDomain = await _regionRepository.CreateAsync(_mapper.Map<Region>(regionRequestDto));

            var regionDto = _mapper.Map<RegionDto>(regionDomain);

            return CreatedAtAction(nameof(GetById),new { id = regionDto.Id}, regionDto);
        }

        [HttpPut("{id:guid}")]
        [ValidateModel]
        public async Task<IActionResult> Update([FromRoute]Guid id, [FromBody]UpdateRegionRequestDto updateRegionRequestDto)
        {
                var regionDomain = _mapper.Map<Region>(updateRegionRequestDto);

                var updatedRegionDomain = await _regionRepository.UpdateAsync(id, regionDomain);

                if (updatedRegionDomain == null)
                {
                    return NotFound();
                }

                var regionDto = _mapper.Map<RegionDto>(updatedRegionDomain);

                return Ok(regionDto);
        }

        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var regionDomain = await _regionRepository.DeleteAsync(id);

            if (regionDomain == null)
            {
                return NotFound();
            }
            
            var regionDto = _mapper.Map<RegionDto>(regionDomain);

            return Ok(regionDto);
        }
    }
}
