using System;

namespace API.DTOs
{
    public class EmployeeUpdateDto
    {
        public string Gender { get; set; }
        public string Position { get; set; }
        public DateTime DateHired { get; set; }
        public string HomeAddress { get; set; }
    }
}