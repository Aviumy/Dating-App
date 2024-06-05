using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly ITokenService _tokenService;

        public AccountController(UserManager<AppUser> userManager, ITokenService tokenService)
        {
            _userManager = userManager;
            _tokenService = tokenService;
        }

        [HttpPost("register")]  // POST: api/account/register
        public async Task<ActionResult<UserDto>> Register ([FromBody] RegisterDto registerDto)
        {
            if (await UserExists(registerDto.Username))
            {
                return BadRequest("This username is taken");
            }

            var user = new AppUser()
            {
                UserName = registerDto.Username.ToLower(),
                NickName = registerDto.Nickname,
                Gender = registerDto.Gender.ToLower(),
                DateOfBirth = registerDto.DateOfBirth,
                Country = registerDto.Country.ToLower(),
                City = registerDto.City.ToLower(),
                Introduction = registerDto.Introduction,
                LookingFor = registerDto.LookingFor,
                Interests = registerDto.Interests,
            };

            var result = await _userManager.CreateAsync(user, registerDto.Password);
            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            return new UserDto
            {
                Username = user.UserName,
                Token = _tokenService.CreateToken(user),
            };
        }

        [HttpPost("login")]  // POST: api/account/login
        public async Task<ActionResult<UserDto>> Login([FromBody] LoginDto loginDto)
        {
            var user = await _userManager.Users.Include(x => x.Photos)
                .FirstOrDefaultAsync(x => x.UserName == loginDto.Username.ToLower());
            if (user == null)
            {
                return Unauthorized("There is no such user");
            }

            var result = await _userManager.CheckPasswordAsync(user, loginDto.Password);
            if (!result)
            {
                return Unauthorized("Wrong password");
            }

            return new UserDto
            {
                Username = user.UserName,
                Token = _tokenService.CreateToken(user),
                MainPhotoUrl = user.Photos.FirstOrDefault(x => x.IsMain)?.Url,
            };
        }

        private async Task<bool> UserExists(string username)
        {
            var user = await _userManager.Users.FirstOrDefaultAsync(x => x.UserName == username.ToLower());
            return user != null;
        }
    }
}
