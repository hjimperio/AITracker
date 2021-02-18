using System;
using System.Collections.Generic;
using System.Linq;

namespace API.Extensions
{
    public static class DateTimeExtensions
    {
        public static int CalculateAge(this DateTime dob)
        {
            var today = DateTime.Today;
            var age = today.Year - dob.Year;
            if (dob.Date > today.AddYears(-age)) age --;
            return age;
        }
        
        public static DateTime CalculateDueDate(this DateTime current, string workOrder, string predicate, 
            IEnumerable<DateTime> holidays = null)
        {
            int days = 0;
            
            switch(workOrder)
            {
                case "Change Request":
                    days = (predicate == "SLO") ? 2 : 1;
                    break;
                case "Clone":
                    days = (predicate == "SLO") ? 7 : 2;
                    break;
                case "Base":
                    days = (predicate == "SLO") ? 10 : 3;
                    break;
                case "Complex":
                    days = 13;
                    break;
                case "FS Complex":
                    days = 15;
                    break;
            }

            var sign = Math.Sign(days);
            var unsignedDays = Math.Abs(days);
            for (var i = 0; i < unsignedDays; i++)
            {
                do
                {
                    current = current.AddDays(sign);
                }
                while (current.DayOfWeek == DayOfWeek.Saturday
                    || current.DayOfWeek == DayOfWeek.Sunday
                    || (holidays != null && holidays.Contains(current.Date))
                    );
            }

            return current;
        }

        public static TimeSpan CalculateElapsedDays(this DateTime ds, DateTime dr)
        {
            TimeSpan dateDiff = dr.Subtract(ds);
            return dateDiff;
        }
    }
}