using API.DTOs;
using API.Entities;
using API.Interfaces.Repositories;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class UsersController : BaseApiController
    {
        private readonly IUserRepository _repo;
        private readonly IMapper _mapper;

        public UsersController(IUserRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        [HttpGet]  // api/users
        public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers()
        {
            var users = await _repo.GetAllAsync();
            var usersToReturn = _mapper.Map<IEnumerable<MemberDto>>(users);
            return Ok(usersToReturn);
        }

        [HttpGet("{id}")]  // api/users/3
        public async Task<ActionResult<MemberDto>> GetUser(int id)
        {
            var user = await _repo.GetAsync(id);
            var userToReturn = _mapper.Map<MemberDto>(user);
            userToReturn.Photos = user.Photos.Select(x => _mapper.Map<PhotoDto>(x)).ToList();
            return userToReturn;
        }
    }
}
