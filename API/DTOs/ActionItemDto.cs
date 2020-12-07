using System;

namespace API.DTOs
{
    public class ActionItemDto
    {
        public int Id { get; set; }
        public string Category { get; set; }
        public string Region { get; set; }
        public string Division { get; set; }
        public DateTime DateCreated { get; set; } = DateTime.Now;
        public bool CreationStatus { get; set; }
        public string InternalEmailSubject { get; set; }
        public string ExternalEmailSubject { get; set; }
        public string WorkOrder { get; set; }
        public bool Feedback { get; set; }
        public string Notes { get; set; }
        public int AssignedTo { get; set; }
        public string ActionItemNumber { get; set; }
    }
}