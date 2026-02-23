using CSI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using CSI.Services; // Là où se trouve ton PasswordService

namespace CSI.Controllers
{
    public class LoginDto
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly SuiviIncidentDBContext _context;
        private readonly PasswordService _passwordService;
        private readonly IConfiguration _config;

        public AuthController(SuiviIncidentDBContext context, PasswordService passwordService, IConfiguration config)
        {
            _context = context;
            _passwordService = passwordService;
            _config = config;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginDto login)
        {
            // 1. Chercher l'analyste par son email
            var analyste = _context.Analyste.FirstOrDefault(a => a.Email == login.Email);

            // 2. Vérifier l'existence et le mot de passe (Argon2)
            if (analyste == null || !_passwordService.VerifyPassword(login.Password, analyste.PasswordHash))
            {
                return Unauthorized(new { message = "Email ou mot de passe incorrect." });
            }

            // 3. Si tout est bon, on génère le Token
            var token = GenerateJwtToken(analyste);

            return Ok(new
            {
                token = token,
                analyste = new
                {
                    analyste.Id,
                    analyste.Nom,
                    analyste.Prenom,
                    analyste.Role,
                    analyste.Phone,          // Ajouté
                    analyste.Disponibilite
                }
            });
        }

        private string GenerateJwtToken(Analyste analyste)
        {
            // Récupération de la clé secrète depuis appsettings.json
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            // On définit le contenu du badge (Claims)
            var claims = new[]
            {
            new Claim(JwtRegisteredClaimNames.Sub, analyste.Id.ToString()),
            new Claim(JwtRegisteredClaimNames.Email, analyste.Email),
            new Claim(ClaimTypes.Role, analyste.Role), // TRÈS IMPORTANT pour Next.js
            new Claim("Prenom", analyste.Prenom)
        };

            // Création de l'objet Token
            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddHours(8), // Durée de validité
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
