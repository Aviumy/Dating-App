using API.DTOs;
using API.Entities;
using API.Extensions;
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
            var members = await _repo.GetAllMembersAsync();
            return Ok(members);
        }

        [HttpGet("{username}")]  // api/users/lisa
        public async Task<ActionResult<MemberDto>> GetUser(string username)
        {
            var member = await _repo.GetMemberAsync(username);
            return member;
        }

        [HttpPut]
        public async Task<ActionResult> UpdateUser(MemberUpdateDto memberUpdateDto)
        {
            var username = User.GetUsername();
            var user = await _repo.GetByUsernameAsync(username);
            if (user == null)
                return NotFound();

            _mapper.Map(memberUpdateDto, user);

            if (await _repo.SaveAllAsync())
                return NoContent();
            else
                return BadRequest("Failed to update user.");
        }
    }
}
