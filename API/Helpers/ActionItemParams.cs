namespace API.Helpers
{
    public class ActionItemParams
    {
        private const int MaxPageSize = 150;
        public int PageNumber { get; set; } = 1;
        private int _pageSize = 10;

        public int PageSize
        {
            get => _pageSize;
            set => _pageSize = (value > MaxPageSize) ? MaxPageSize : value;
        }

        public string CurrentUsername { get; set; }
        public string ActionItemNumber { get; set; }
        public string OrderBy { get; set; } = "created";
        public string MapStatus { get; set; } = "open";
    }
}