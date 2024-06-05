using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace API.Data
{
    public class DataSeeder : IDbSeeder
    {
        public async Task Seed(UserManager<AppUser> userManager, RoleManager<AppRole> roleManager)
        {
            if (await userManager.Users.AnyAsync())
                return;

            var serializer = new JsonSerializer();
            var users = new List<AppUser>();
            using (var streamReader = new StreamReader(@"Data\UserSeedData.json"))
            using (var jsonTextReader = new JsonTextReader(streamReader))
            {
                users = serializer.Deserialize<List<AppUser>>(jsonTextReader);
            }

            var roles = new List<AppRole>()
            {
                new AppRole() {Name = "Member"},
                new AppRole() {Name = "Admin"},
                new AppRole() {Name = "Moderator"},
            };
            foreach (var role in roles)
            {
                await roleManager.CreateAsync(role);
            }

            foreach (var user in users)
            {
                user.UserName = user.UserName.ToLower();
                await userManager.CreateAsync(user, "asdf123_");
                await userManager.AddToRoleAsync(user, "Member");
            }

            var admin = new AppUser()
            {
                UserName = "admin"
            };
            await userManager.CreateAsync(admin, "asdf123_");
            await userManager.AddToRoleAsync(admin, "Admin");

            var mod = new AppUser()
            {
                UserName = "moderator"
            };
            await userManager.CreateAsync(mod, "asdf123_");
            await userManager.AddToRoleAsync(mod, "Moderator");
        }
    }
}
