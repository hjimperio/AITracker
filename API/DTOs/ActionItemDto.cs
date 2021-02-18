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

        // Elapsed Data
        public DateTime DueDate { get; set; }
        public int SLODays { get; set; }
        public bool MetSLO { get; set; }
        public DateTime ElapsedDueDate { get; set; }
        public bool MetElapsedTarget { get; set; }
        public string DaysAndHoursSpent { get; set; }
        public int TargetElapsedDays { get; set; }
        public double ElapsedDays { get; set; }
        public string Reason { get; set; }
    }
}