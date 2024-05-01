using API.Entities;
using API.Interfaces.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class UsersController : BaseApiController
    {
        private readonly IUserRepository _repo;

        public UsersController(IUserRepository repo)
        {
            _repo = repo;
        }

        [HttpGet]  // api/users
        public async Task<ActionResult<IEnumerable<AppUser>>> GetUsers()
        {
            var users = await _repo.GetAllAsync();
            return Ok(users);
        }

        [HttpGet("{id}")]  // api/users/3
        public async Task<ActionResult<AppUser>> GetUser(int id)
        {
            var user = await _repo.GetAsync(id);
            return user;
        }
    }
}
