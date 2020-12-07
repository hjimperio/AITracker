using System;

namespace API.DTOs
{
    public class EmployeeDto
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public DateTime Created { get; set; }
        public DateTime LastActive { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Position { get; set; }
        public DateTime DateHired { get; set; }
        public string HomeAddress { get; set; }
    }
}