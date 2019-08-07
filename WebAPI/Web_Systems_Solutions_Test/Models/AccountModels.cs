using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Web_Systems_Solutions_Test.Models
{
    public class RegistrationModel
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public string Name { get; set; }
        public string SurName { get; set; }
        public int Age { get; set; }
        public bool isActive { get; set; }
    }

    public class LoginModel
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }

    public class UserListModel
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string SurName { get; set; }
        public int Age { get; set; }
        public bool isActive { get; set; }
    }

    public class ChangeActiveModel
    {
        public string UserId { get; set; }
    }

    public class UserInfoModel
    {
        public string UserId { get; set; }
    }
}
