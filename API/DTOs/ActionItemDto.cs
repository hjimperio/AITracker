using System;

namespace API.DTOs
{
    public class ActionItemDto
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
        public string AiCreatedBy { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateStarted { get; set; }
        public DateTime DateResolved { get; set; }
        public string MapStatus { get; set; }
    }
}