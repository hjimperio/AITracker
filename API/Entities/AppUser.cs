using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace API.Entities 
{
    public class AppUser : IdentityUser<int>
    {
        public DateTime DateOfBirth { get; set; }
        public DateTime Created { get; set; } = DateTime.Now;
        public DateTime LastActive { get; set; } = DateTime.Now;
        public string Gender { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Position { get; set; }
        public DateTime DateHired { get; set; }
        public string HomeAddress { get; set; }
        public ICollection<ActionItem> ActionItems { get; set; }
        public ICollection<AppUserRole> UserRoles { get; set; }
    }
}