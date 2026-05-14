using Microsoft.EntityFrameworkCore;
using NZWalks.API.Data;
using NZWalks.API.Models.Domain;

namespace NZWalks.API.Repositories
{
    public class SQLRegionRepository : IRegionRepository
    {
        private readonly NZWalksDbContext _context;

        public SQLRegionRepository(NZWalksDbContext context)
        {
            _context = context;
        }
        public async Task<List<Region>> GetAllAsync()
        {
            return await _context.Regions.ToListAsync();
        }
        public async Task<Region?> GetByIdAsync(Guid id)
        {
            return await _context.Regions.FirstOrDefaultAsync(region => region.Id == id);
        }
        public async Task<Region> CreateAsync(Region region)
        {
            await _context.Regions.AddAsync(region);
            await _context.SaveChangesAsync();
            return region;
        }

        public async Task<Region?> UpdateAsync(Guid id, Region region)
        {
            Region? existingRegion = await _context.Regions.FirstOrDefaultAsync(region => region.Id == id);

            if (existingRegion == null)
            {
                return null;
            }

            existingRegion.Name = region.Name;
            existingRegion.Code = region.Code;
            existingRegion.RegionImageUrl = region.RegionImageUrl;

            await _context.SaveChangesAsync();
            return existingRegion;  
        }

        public async Task<Region?> DeleteAsync(Guid id)
        {
            var existingRegion = await _context.Regions.FirstOrDefaultAsync(region => region.Id == id);

            if (existingRegion is null)
            {
                return null;
            }

            _context.Regions.Remove(existingRegion);
            await _context.SaveChangesAsync();
            return existingRegion;
        }
    }
}
