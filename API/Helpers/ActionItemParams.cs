using System;

namespace API.Helpers
{
    public class ActionItemParams : PaginationParams
    {
        public string CurrentUsername { get; set; }
        public string InternalEmailSubject { get; set; }
        public string ExternalEmailSubject { get; set; }
        public string TaskNumber { get; set; }
        public string ActionItemNumber { get; set; }
        public string OrderBy { get; set; } = "created";
        public string WorkOrderTypeRequest { get; set; }
        public string MapStatus { get; set; } = "all";
        public int AICreatedBy { get; set; }
        public string MetSLO { get; set; }
        public string MetElapsedTarget { get; set; }
        public string DateStartedFrom { get; set; }
        public string DateStartedTo { get; set; }
        public string DateResolvedFrom { get; set; }
        public string DateResolvedTo { get; set; }
    }
}