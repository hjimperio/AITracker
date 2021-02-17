namespace API.Helpers
{
    public class ActionItemParams : PaginationParams
    {
        public string CurrentUsername { get; set; }
        public string ActionItemNumber { get; set; }
        public string OrderBy { get; set; } = "created";
        public string MapStatus { get; set; } = "all";
    }
}