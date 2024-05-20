using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Interfaces;
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
        private readonly IPhotoService _photoService;

        public UsersController(IUserRepository repo, IMapper mapper, IPhotoService photoService)
        {
            _repo = repo;
            _mapper = mapper;
            _photoService = photoService;
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

        [HttpPost("add-photo")]
        public async Task<ActionResult<PhotoDto>> AddPhoto(IFormFile file)
        {
            var user = await _repo.GetByUsernameAsync(User.GetUsername());
            if (user == null)
                return NotFound();

            var result = await _photoService.AddPhotoAsync(file);
            if (result.Error != null)
                return BadRequest(result.Error.Message);

            var photo = new Photo
            {
                Url = result.SecureUrl.AbsoluteUri,
                PublicId = result.PublicId
            };
            if (!user.Photos.Any())
                photo.IsMain = true;
            user.Photos.Add(photo);

            if (await _repo.SaveAllAsync())
            {
                var photoDto = _mapper.Map<PhotoDto>(photo);
                return CreatedAtAction(nameof(GetUser), new { username = user.UserName }, photoDto);
            }
            return BadRequest("Failed to upload photo");
        }
    }
}
