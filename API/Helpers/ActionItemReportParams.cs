namespace API.Helpers
{
    public class ActionItemReportParams
    {
        public string OrderBy { get; set; } = "created";
        public string WorkOrderTypeRequest { get; set; }
        public string MapStatus { get; set; } = "all";
        public string MetSLO { get; set; }
        public string MetElapsedTarget { get; set; }
        public string DateFrom { get; set; }
        public string DateTo { get; set; }
    }
}