using API.Entities;
using Microsoft.AspNetCore.Identity;

namespace API.Interfaces
{
    public interface IDbSeeder
    {
        Task Seed(UserManager<AppUser> userManager, RoleManager<AppRole> roleManager);
    }
}
