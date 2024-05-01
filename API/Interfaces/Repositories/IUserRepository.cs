using API.Entities;

namespace API.Interfaces.Repositories
{
    public interface IUserRepository : IRepository<AppUser>
    {
        Task<AppUser> GetByUsernameAsync(string username);
    }
}
