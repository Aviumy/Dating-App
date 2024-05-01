using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System.Security.Cryptography;
using System.Text;

namespace API.Data
{
    public class DataSeeder : IDbSeeder
    {
        public async Task Seed(DbContext context)
        {
            var dataContext = context as DataContext;
            try
            {
                await dataContext.Database.EnsureDeletedAsync();
                await dataContext.Database.MigrateAsync();

                var serializer = new JsonSerializer();
                var users = new List<AppUser>();
                using (var streamReader = new StreamReader(@"Data\UserSeedData.json"))
                using (var jsonTextReader = new JsonTextReader(streamReader))
                {
                    users = serializer.Deserialize<List<AppUser>>(jsonTextReader);
                }

                foreach (var user in users)
                {
                    using var hmac = new HMACSHA512();
                    user.UserName = user.UserName.ToLower();
                    user.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes("asdf123_"));
                    user.PasswordSalt = hmac.Key;
                }

                await dataContext.Users.AddRangeAsync(users);
                await dataContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("An error occured during db migration:\r\n" + ex.Message);
            }
        }
    }
}
