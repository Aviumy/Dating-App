using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace API.Data
{
    public class DataSeeder : IDbSeeder
    {
        public async Task Seed(UserManager<AppUser> userManager)
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

            foreach (var user in users)
            {
                user.UserName = user.UserName.ToLower();
                await userManager.CreateAsync(user, "asdf123_");
            }
        }
    }
}
