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
    public class WalksController : ControllerBase
    {
        private readonly IWalkRepository _walkRepository;
        private readonly IMapper _mapper;
        public WalksController(IWalkRepository walkRepository, IMapper mapper)
        {
            _walkRepository = walkRepository;
            _mapper = mapper;
        }
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var walkDomain = await _walkRepository.GetAllAsync();
            var walkDtos = _mapper.Map<List<WalkDto>>(walkDomain);
            return Ok(walkDtos);
        }

        [HttpGet("{id:guid}")]
        public async Task<IActionResult> GetById([FromRoute]Guid id)
        {
            var walkDomainModel = await _walkRepository.GetByIdAsync(id);

            if (walkDomainModel == null)
            {
                return NotFound();
            }

            var walkDto = _mapper.Map<WalkDto>(walkDomainModel);

            return Ok(walkDto);
        }

        [HttpPost]
        [ValidateModel]
        public async Task<IActionResult> Create([FromBody]CreateWalkRequestDto walkRequestDto)
        {
            if(walkRequestDto == null)
            {
                return BadRequest();
            }

            var walkDomainModel = _mapper.Map<Walk>(walkRequestDto);
            walkDomainModel = await _walkRepository.CreateAsync(walkDomainModel);

            var walkDto = _mapper.Map<WalkDto>(walkDomainModel);
            return CreatedAtAction(nameof(GetById), new { walkDto.Id}, walkDto);
        }

        [HttpPut("{id:guid}")]
        public async Task<IActionResult> Update([FromRoute]Guid id, [FromBody]UpdateWalkRequestDto updateWalkRequestDto)
        {
            var walkDomain = _mapper.Map<Walk>(updateWalkRequestDto);
            var updatedWalkDomain = await _walkRepository.UpdateAsync(id,  walkDomain);
            if (updatedWalkDomain == null)
            {
                return NotFound();
            }    
            var walkDto = _mapper.Map<WalkDto>(updatedWalkDomain);
            return Ok(walkDto);
        }

        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> Delete([FromRoute]Guid id)
        {
            var walkDomain = await _walkRepository.DeleteAsync(id);
            
            if (walkDomain == null)
            {
                return NotFound();
            }

            var walkDto = _mapper.Map<WalkDto>(walkDomain);
            return Ok(walkDto);
        }

    }
}
