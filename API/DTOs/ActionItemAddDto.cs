using System;

namespace API.DTOs
{
    public class ActionItemAddDto
    {
        public string Category { get; set; }
        public string Division { get; set; }
        public string Request { get; set; }
        public string InternalEmailSubject { get; set; }
        public int AssignedToId { get; set; }
        public string WorkOrderTypeRequest { get; set; }
        public bool Feedback { get; set; }
        public string Notes { get; set; }
        public string TGOCP { get; set; }
        public string TaskNumber { get; set; }
        public string ActionItemNumber { get; set; }
        public int DeliveryManagerSupportId { get; set; }
        public string ExternalEmailSubject { get; set; }
        public DateTime DateStarted { get; set; }
        public string CurrentTeamOwner { get; set; }
        public string CurrentIndividualAssigned { get; set; }
        public string Remarks { get; set; }
        public string MapStatus { get; set; }
        public DateTime DateResolved { get; set; }
    }
}