using Microsoft.EntityFrameworkCore;
using NZWalks.API.Data;
using NZWalks.API.Models.Domain;

namespace NZWalks.API.Repositories
{
    public class SQLWalkRepository : IWalkRepository
    {
        private readonly NZWalksDbContext _context;
        public SQLWalkRepository(NZWalksDbContext context)
        {
            _context = context;
        }

        public async Task<List<Walk>> GetAllAsync()
        {
            var walkDomain = await _context.Walks.Include("Region").Include("Difficulty").ToListAsync();
            return walkDomain;
        }

        public async Task<Walk?> GetByIdAsync(Guid id)
        {
            var walkDomainModel = await _context.Walks.Include("Region").Include("Difficulty").FirstOrDefaultAsync(walk => walk.Id == id);
            if (walkDomainModel == null)
            {
                return null;
            }
            return walkDomainModel;
        }
        public async Task<Walk> CreateAsync(Walk walk)
        {
            await _context.Walks.AddAsync(walk);
            await _context.SaveChangesAsync();
            return walk;
        }

        public async Task<Walk?> UpdateAsync(Guid id, Walk walk)
        {
            var existingWalk = await _context.Walks.FirstOrDefaultAsync(walk => walk.Id.Equals(id));
            if (existingWalk == null)
            {
                return null;
            }

            existingWalk.Name = walk.Name;
            existingWalk.Description = walk.Description;
            existingWalk.LengthInKm = walk.LengthInKm;
            existingWalk.WalkImageUrl = walk.WalkImageUrl;
            existingWalk.RegionId = walk.RegionId;
            existingWalk.DifficultyId = walk.DifficultyId;

            await _context.SaveChangesAsync();
            return existingWalk;
        }

        public async Task<Walk?> DeleteAsync(Guid id)
        {
            var existingWalk = await _context.Walks.FirstOrDefaultAsync(walk => walk.Id.Equals(id));

            if (existingWalk == null)
            {
                return null;
            }

            _context.Walks.Remove(existingWalk);
            await _context.SaveChangesAsync();
            return existingWalk;
        }
    }
}
