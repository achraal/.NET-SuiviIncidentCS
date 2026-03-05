using CSI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CSI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize] // Seuls les utilisateurs connectés voient les stats
    public class StatsController : ControllerBase
    {
        private readonly SuiviIncidentDBContext _context;

        public StatsController(SuiviIncidentDBContext context)
        {
            _context = context;
        }

        [HttpGet("dashboard")]
        public async Task<IActionResult> GetDashboardStats()
        {
            // 1. Répartition par Sévérité (Ex: Faible, Moyenne, Haute, Critique)
            var severiteStats = await _context.Incident
                .GroupBy(i => i.Severite)
                .Select(g => new { Label = g.Key, Count = g.Count() })
                .ToListAsync();

            // 2. Répartition par Type (Ex: Malware, Phishing, etc.)
            var typeStats = await _context.Incident
                .GroupBy(i => i.Type)
                .Select(g => new { Label = g.Key, Count = g.Count() })
                .ToListAsync();

            // 3. Indicateurs clés (KPI)
            var totalIncidents = await _context.Incident.CountAsync();
            var incidentsResolus = await _context.Incident.CountAsync(i => i.Etat == "Résolu");

            var septDerniersJours = await _context.Incident
    .Where(i => i.DateDeclaration >= DateTime.Now.AddDays(-7))
    .GroupBy(i => i.DateDeclaration.Date)
    .Select(g => new { Date = g.Key, Count = g.Count() })
    .OrderBy(g => g.Date)
    .ToListAsync();

            var analystePerformance = await _context.Incident
    .Where(i => i.AnalysteEnCharge != null && i.Etat == "Résolu")
    .GroupBy(i => i.AnalysteEnCharge.Nom)
    .Select(g => new { Nom = g.Key, Resolus = g.Count() })
    .ToListAsync();

            // Calcul du temps moyen de résolution (MTTR) en heures
            var mttr = 0.0;
            var incidentsAvecFin = await _context.Incident
                .Where(i => i.DateResolution != null)
                .ToListAsync();

            if (incidentsAvecFin.Any())
            {
                mttr = incidentsAvecFin.Average(i => (i.DateResolution.Value - i.DateDeclaration).TotalHours);
            }

            return Ok(new
            {
                Severite = severiteStats,
                Types = typeStats,
                Historique = septDerniersJours, 
                Performance = analystePerformance, 
                Kpis = new
                {
                    Total = totalIncidents,
                    Resolus = incidentsResolus,
                    Mttr = Math.Round(mttr, 2),
                    Critiques = await _context.Incident.CountAsync(i => i.Severite == "Critique"), 
                    NonAssignes = await _context.Incident.CountAsync(i => i.AnalysteId == null) 
                }
            });
        }
    }
}
