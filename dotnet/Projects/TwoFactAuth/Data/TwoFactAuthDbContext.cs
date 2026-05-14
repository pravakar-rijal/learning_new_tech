using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace TwoFactAuth.Data
{
    public class TwoFactAuthDbContext : IdentityDbContext<IdentityUser, IdentityRole, string>
    {
        public TwoFactAuthDbContext(DbContextOptions<TwoFactAuthDbContext> options): base(options)
        {
            
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
        }
    }
}
