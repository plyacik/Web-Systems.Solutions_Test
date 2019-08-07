using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Web_Systems_Solutions_Test.Models;

namespace Web_Systems_Solutions_Test.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private UserManager<ApplicationUser> _userManager;
        private SignInManager<ApplicationUser> _signInManager;
        private readonly ApplicationSettings _appSettings;
        public ApplicationContext context;

        public AccountController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, IOptions<ApplicationSettings> appSettings)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _appSettings = appSettings.Value;
        }

        [HttpPost]
        [Route("Registration")]
        //POST : /api/Account/Registration
        public async Task<Object> Registration(RegistrationModel model)
        {
            var user = new ApplicationUser()
            {
                UserName = model.Email,
                Email = model.Email,
                Name = model.Name,
                SurName = model.SurName,
                age = model.Age,
                isActive = model.isActive
            };

            try
            {
                var result = await _userManager.CreateAsync(user, model.Password);
                // await _userManager.AddToRoleAsync(user, "Client");        
                return Ok(result);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpPost]
        [Route("Login")]
        //POST : /api/Account/Login
        public async Task<Object> Login(LoginModel model)
        {
            var user = await _userManager.FindByNameAsync(model.Email);
            if (user != null && await _userManager.CheckPasswordAsync(user, model.Password))
            {
                IdentityOptions _options = new IdentityOptions();

                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[]
                    {
                        new Claim("UserID",user.Id.ToString())
                    }),
                    Expires = DateTime.UtcNow.AddHours(1),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_appSettings.JWT_Secret)), SecurityAlgorithms.HmacSha256Signature)
                };
                var tokenHandler = new JwtSecurityTokenHandler();
                var securityToken = tokenHandler.CreateToken(tokenDescriptor);
                var token = tokenHandler.WriteToken(securityToken);
                return Ok(new { token });
            }
            else
                return BadRequest(new { message = "Username or password is incorrect." });
        }

        [HttpGet]
        [Authorize]
        [Route("Users")]
        //POST : /api/Account/Users
        public List<UserListModel> Users()
        {
            List<UserListModel> users = new List<UserListModel>();
            var userList = _userManager.Users.ToList();
            foreach (var userDb in userList)
            {
                UserListModel user = new UserListModel
                {
                    Id = userDb.Id,
                    Name = userDb.Name,
                    SurName = userDb.SurName,
                    Age = userDb.age,
                    isActive = userDb.isActive
                };
                users.Add(user);
            }
            return users;
        }

        [HttpPost]
        [Authorize]
        [Route("ChangeActive")]
        //POST : /api/Account/ChangeActive
        public async Task<Object> ChangeActive(ChangeActiveModel model)
        {
            var user = await _userManager.FindByIdAsync(model.UserId);
            if (user != null)
            {
                user.isActive = !user.isActive;
                IdentityResult result = await _userManager.UpdateAsync(user);
                return Ok(result);
            }
            else
                return BadRequest(new { message = "User is incorrect." });
        }

        [HttpPost]
        [Authorize]
        [Route("UserInfo")]
        //POST : /api/Account/UserInfo
        public async Task<Object> UserInfo(UserInfoModel model)
        {
            var user = await _userManager.FindByIdAsync(model.UserId);
            if (user != null)
            {
                return Ok(user);
            }
            else
                return BadRequest(new { message = "User is incorrect." });
        }

        [HttpGet]
        [Authorize]
        [Route("ActiveUsers")]
        //POST : /api/Account/Users
        public List<UserListModel> ActiveUsers()
        {
            List<UserListModel> users = new List<UserListModel>();
            var userList = _userManager.Users.Where(usr => usr.isActive == true).ToList();
            foreach (var userDb in userList)
            {
                UserListModel user = new UserListModel
                {
                    Id = userDb.Id,
                    Name = userDb.Name,
                    SurName = userDb.SurName,
                    Age = userDb.age,
                    isActive = userDb.isActive
                };
                users.Add(user);
            }
            return users;
        }
    }
}