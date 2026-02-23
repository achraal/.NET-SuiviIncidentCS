using Konscious.Security.Cryptography;
using System.Security.Cryptography;
using System.Text;

namespace CSI.Services
{
    public interface IPasswordService
    {
        string HashPassword(string password);
        bool VerifyPassword(string password, string hash);
    }
    public class PasswordService : IPasswordService
    {
        public string HashPassword(string password)
        {
            var salt = RandomNumberGenerator.GetBytes(16);
            var argon2 = new Argon2id(Encoding.UTF8.GetBytes(password))
            {
                Salt = salt,
                DegreeOfParallelism = 8,
                Iterations = 4,
                MemorySize = 65536 // 64 MB
            };
            var hash = argon2.GetBytes(32);
            return $"{Convert.ToBase64String(salt)}.{Convert.ToBase64String(hash)}";
        }

        public bool VerifyPassword(string password, string hash)
        {
            try
            {
                var parts = hash.Split('.');
                var salt = Convert.FromBase64String(parts[0]);
                var hashBytes = Convert.FromBase64String(parts[1]);

                var argon2 = new Argon2id(Encoding.UTF8.GetBytes(password))
                {
                    Salt = salt,
                    DegreeOfParallelism = 8,
                    Iterations = 4,
                    MemorySize = 65536
                };
                return argon2.GetBytes(32).SequenceEqual(hashBytes);
            }
            catch { return false; }
        }
    }
}
