using CSI.Models;
using Microsoft.AspNetCore.Mvc;

namespace CSI.Controllers
{
    public class IngestionRequest
    {
        public string Type { get; set; }
        public string Description { get; set; }
        public string Severite { get; set; } // Haute, Moyenne, Basse
        public string Source { get; set; }   // Ex: "CrowdStrike", "Sentinel", "FortiGate"
    }

    [Route("api/[controller]")]
    [ApiController]
    public class IngestionController : ControllerBase
    {
        private readonly SuiviIncidentDBContext _context;

        public IngestionController(SuiviIncidentDBContext context)
        {
            _context = context;
        }

        // POST: api/Ingestion/incident
        [HttpPost("incident")]
        public async Task<IActionResult> PostAutoIncident([FromBody] IngestionRequest request)
        {
            var apiToken = Environment.GetEnvironmentVariable("API_TOKEN");
            if (!Request.Headers.TryGetValue("X-SOC-TOKEN", out var extractedKey) ||
                extractedKey != apiToken) 
            {
                return Unauthorized("Accès refusé : Clé d'ingestion invalide.");
            }
            if (request == null) return BadRequest("Données d'alerte invalides.");

            // Création de l'objet Incident à partir de l'alerte automatique
            var nouvelIncident = new Incident
            {
                Type = request.Type,
                // On ajoute un marqueur [AUTO] pour le distinguer en un coup d'œil
                Description = $"[ALERTE AUTO - {request.Source}] : {request.Description}",
                Severite = request.Severite,
                DateDeclaration = DateTime.Now,
                Etat = "Nouveau", // Toujours "Nouveau" à l'ingestion
                SourceDetection = "API: " + request.Source,
                AnalysteId = null // Sera assigné plus tard par l'Admin
            };

            try
            {
                _context.Incident.Add(nouvelIncident);
                await _context.SaveChangesAsync();

                // On retourne le ticket ID créé pour que l'outil tiers puisse le loguer
                return Ok(new
                {
                    Status = "Success",
                    Message = "Incident créé automatiquement",
                    TicketId = nouvelIncident.Id
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erreur d'ingestion : {ex.Message}");
            }
        }
    }
}
