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

        public UsersController(IUserRepository repo)
        {
            _repo = repo;
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
    }
}
