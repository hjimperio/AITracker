using System;

namespace API.DTOs
{
    public class ActionItemUpdateDto
    {
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
        public DateTime DateStarted { get; set; }
        public DateTime DateResolved { get; set; }
        public string MapStatus { get; set; }
        
        // Elapsed Data
        public string Reason { get; set; }
    }
}