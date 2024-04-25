using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;

namespace API.DTOs
{
    public class RegisterDto : IValidatableObject
    {
        [Required]
        public string Username { get; set; }
        [Required]
        public string Password { get; set; }

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            string[] commonPasswords = new string[]
            {
                "12345678", "qwertyui", "qwertyuiop", "password",
            };

            if (Password.Length < 8)
            {
                yield return new ValidationResult("Password should have at least 8 symbols.", [nameof(Password)]);
            }
            if (Password.ToLower() == Username.ToLower())
            {
                yield return new ValidationResult("Password should not match with username.", [nameof(Password)]);
            }
            if (!(Regex.IsMatch(Password, @"\w+") &&
                Regex.IsMatch(Password, @"\d+") &&
                Regex.IsMatch(Password, @"([^\w\d]|_)+")))
            {
                yield return new ValidationResult("Password should have at least 1 letter, 1 digit and 1 special symbol.", [nameof(Password)]);
            }
            if (Password.Length > 1 && Password == new string(Password[0], Password.Length))
            {
                yield return new ValidationResult("Password should not consist of one repeating symbol.", [nameof(Password)]);
            }
            if (commonPasswords.FirstOrDefault(x => x == Password) != null)
            {
                yield return new ValidationResult("This password is common and weak, try another.", [nameof(Password)]);
            }
        }
    }
}
