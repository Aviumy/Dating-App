using Microsoft.EntityFrameworkCore;

namespace API.Interfaces
{
    public interface IDbSeeder
    {
        Task Seed(DbContext context);
    }
}
