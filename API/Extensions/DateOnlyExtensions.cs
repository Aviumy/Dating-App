namespace API.Extensions
{
    public static class DateOnlyExtensions
    {
        public static int CalculateAge(this DateOnly dateOfBirth)
        {
            DateTime now = DateTime.UtcNow;
            int age = now.Year - dateOfBirth.Year;
            if (now.Month < dateOfBirth.Month)
            {
                age--;
            }
            else if (now.Month == dateOfBirth.Month)
            {
                if (now.Day < dateOfBirth.Day)
                {
                    age--;
                }
            }
            return age;
        }
    }
}
