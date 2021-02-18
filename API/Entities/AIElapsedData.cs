using System;

namespace API.Entities
{
    public class AIElapsedData
    {
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