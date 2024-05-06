using API.Entities;
using API.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;

namespace API.Data.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;

        public UserRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<AppUser>> GetAllAsync()
        {
            var users = await _context.Users.Include(p => p.Photos).ToListAsync();
            return users;
        }

        public async Task<AppUser> GetAsync(int id)
        {
            var user = await _context.Users.Include(p => p.Photos)
                .FirstOrDefaultAsync(x => x.Id == id);
            return user;
        }

        public async Task<AppUser> GetByUsernameAsync(string username)
        {
            var user = await _context.Users.Include(p => p.Photos)
                .FirstOrDefaultAsync(x => x.UserName == username);
            return user;
        }

        public async Task<bool> SaveAllAsync()
        {
            var entriesChanged = await _context.SaveChangesAsync();
            return entriesChanged > 0;
        }

        public void Update(AppUser item)
        {
            _context.Entry(item).State = EntityState.Modified;
        }
    }
}
