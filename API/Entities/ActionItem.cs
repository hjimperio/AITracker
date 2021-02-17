using System;

namespace API.Entities
{
    public class ActionItem
    {
        public int Id { get; set; }
        public string Region { get; set; }
        public string Division { get; set; }
        public string InternalEmailSubject { get; set; }
        public string ExternalEmailSubject { get; set; }
        public string WorkOrderTypeRequest { get; set; }
        public bool Feedback { get; set; }
        public string Notes { get; set; }
        public string TaskNumber { get; set; }
        public string ActionItemNumber { get; set; }
        public int AiCreatedBy { get; set; }
        public DateTime DateCreated { get; set; } = DateTime.Now;
        public DateTime DateStarted { get; set; }
        public DateTime DateResolved { get; set; }
        public string MapStatus { get; set; }
        public AppUser AppUser { get; set; }
        public int AppUserId { get; set; }
    }
}