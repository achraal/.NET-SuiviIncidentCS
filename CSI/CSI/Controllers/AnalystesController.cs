using CSI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CSI.Services; // Là où se trouve ton PasswordService

namespace CSI.Controllers
{
    public class AnalysteCreationDto // On l'appelle DTO car c'est pour le "Transfert"
    {
        public string Nom { get; set; }
        public string Prenom { get; set; }
        public string Email { get; set; }
        public string Password { get; set; } // <--- C'est la clé ! Mot de passe en clair
        public string Role { get; set; }
        public string Phone { get; set; }
        public bool Disponibilite { get; set; }
    }
    [Route("api/[controller]")] // Route : api/analystes
    [ApiController] // Active les comportements spécifiques à l'API (ex: validation auto du modèle)
    public class AnalystesController : ControllerBase
    //public class AnalystesController : Controller
    {
        private readonly SuiviIncidentDBContext _context;
        private readonly IPasswordService _passwordService;

        public AnalystesController(SuiviIncidentDBContext context, IPasswordService passwordService)
        {
            _context = context;
            _passwordService = passwordService;
        }

        // GET: Analystes
        //public async Task<IActionResult> Index()
        //{
        //    return View(await _context.Analyste.ToListAsync());
        //}
        // GET: api/Analystes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Analyste>>> GetAnalystes()
        {
            return await _context.Analyste.ToListAsync(); // Renvoie JSON 
        }

        // GET: Analystes/Details/5
        //public async Task<IActionResult> Details(int? id)
        //{
        //    if (id == null)
        //    {
        //        return NotFound();
        //    }

        //    var analyste = await _context.Analyste
        //        .FirstOrDefaultAsync(m => m.Id == id);
        //    if (analyste == null)
        //    {
        //        return NotFound();
        //    }

        //    return View(analyste);
        //}
        // GET: api/Analystes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Analyste>> GetAnalyste(int id)
        {
            var analyste = await _context.Analyste.FindAsync(id);

            if (analyste == null)
            {
                return NotFound();
            }

            return analyste;
        }

        // GET: Analystes/Create
        //public IActionResult Create()
        //{
        //    return View();
        //}

        // POST: Analystes/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        //[HttpPost]
        //[ValidateAntiForgeryToken]
        //public async Task<IActionResult> Create([Bind("Id,Nom,Prenom,Email,Phone,Role,Disponibilite")] Analyste analyste)
        //{
        //    if (ModelState.IsValid)
        //    {
        //        _context.Add(analyste);
        //        await _context.SaveChangesAsync();
        //        return RedirectToAction(nameof(Index));
        //    }
        //    return View(analyste);
        //}

        // POST: api/Analystes
        [Authorize(Roles = "Admin")] // Seul l'admin peut créer d'autres analystes
        [HttpPost]
        public async Task<ActionResult<Analyste>> CreateAnalyste([FromBody] AnalysteCreationDto dto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            // On vérifie si l'email existe déjà
            if (_context.Analyste.Any(a => a.Email == dto.Email))
                return BadRequest("Cet email est déjà utilisé.");

            var nouvelAnalyste = new Analyste
            {
                Nom = dto.Nom,
                Prenom = dto.Prenom,
                Email = dto.Email,
                Phone = dto.Phone,
                Role = dto.Role, // L'admin choisit le rôle ici
                Disponibilite = dto.Disponibilite,
                // HACHAGE ICI : On transforme le mot de passe clair en hash Argon2
                PasswordHash = _passwordService.HashPassword(dto.Password)
            };

            _context.Analyste.Add(nouvelAnalyste);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetAnalyste), new { id = nouvelAnalyste.Id }, nouvelAnalyste);
        }
        //[HttpPost]
        //public async Task<ActionResult<Analyste>> CreateAnalyste(Analyste analyste)
        //{
        //    if (ModelState.IsValid)
        //    {
        //        _context.Analyste.Add(analyste);
        //        await _context.SaveChangesAsync();

        //        // Renvoie une 201 Created avec l'URL pour voir la ressource créée
        //        return CreatedAtAction(nameof(GetAnalyste), new { id = analyste.Id }, analyste);
        //    }
        //    return BadRequest(ModelState);
        //}

        // GET: Analystes/Edit/5
        //public async Task<IActionResult> Edit(int? id)
        //{
        //    if (id == null)
        //    {
        //        return NotFound();
        //    }

        //    var analyste = await _context.Analyste.FindAsync(id);
        //    if (analyste == null)
        //    {
        //        return NotFound();
        //    }
        //    return View(analyste);
        //}

        // POST: Analystes/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        //[HttpPost]
        //[ValidateAntiForgeryToken]
        //public async Task<IActionResult> Edit(int id, [Bind("Id,Nom,Prenom,Email,Phone,Role,Disponibilite")] Analyste analyste)
        //{
        //    if (id != analyste.Id)
        //    {
        //        return NotFound();
        //    }

        //    if (ModelState.IsValid)
        //    {
        //        try
        //        {
        //            _context.Update(analyste);
        //            await _context.SaveChangesAsync();
        //        }
        //        catch (DbUpdateConcurrencyException)
        //        {
        //            if (!AnalysteExists(analyste.Id))
        //            {
        //                return NotFound();
        //            }
        //            else
        //            {
        //                throw;
        //            }
        //        }
        //        return RedirectToAction(nameof(Index));
        //    }
        //    return View(analyste);
        //}

        // PUT: api/Analystes/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAnalyste(int id, [FromBody] AnalysteCreationDto dto)
        {
            var analyste = await _context.Analyste.FindAsync(id);
            if (analyste == null) return NotFound();

            // Mise à jour des champs classiques
            analyste.Nom = dto.Nom;
            analyste.Prenom = dto.Prenom;
            analyste.Email = dto.Email;
            analyste.Phone = dto.Phone;
            analyste.Role = dto.Role;
            analyste.Disponibilite = dto.Disponibilite;

            // LOGIQUE DU MOT DE PASSE :
            // On ne re-hache le mot de passe que si l'admin en a saisi un nouveau
            if (!string.IsNullOrWhiteSpace(dto.Password))
            {
                analyste.PasswordHash = _passwordService.HashPassword(dto.Password);
            }
            // Si dto.Password est vide, on ne touche pas à analyste.PasswordHash

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                return BadRequest("Erreur lors de la mise à jour en base de données.");
            }

            return NoContent(); // Succès 204
        }

        //[HttpPut("{id}")]
        //public async Task<IActionResult> UpdateAnalyste(int id, Analyste analyste)
        //{
        //    if (id != analyste.Id)
        //    {
        //        return BadRequest();
        //    }

        //    _context.Entry(analyste).State = EntityState.Modified;

        //    try
        //    {
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!AnalysteExists(id))
        //        {
        //            return NotFound();
        //        }
        //        else { throw; }
        //    }

        //    return NoContent(); // Succès, mais pas de contenu à renvoyer
        //}

        // GET: Analystes/Delete/5
        //public async Task<IActionResult> Delete(int? id)
        //{
        //    if (id == null)
        //    {
        //        return NotFound();
        //    }

        //    var analyste = await _context.Analyste
        //        .FirstOrDefaultAsync(m => m.Id == id);
        //    if (analyste == null)
        //    {
        //        return NotFound();
        //    }

        //    return View(analyste);
        //}

        // POST: Analystes/Delete/5
        //[HttpPost, ActionName("Delete")]
        //[ValidateAntiForgeryToken]
        //public async Task<IActionResult> DeleteConfirmed(int id)
        //{
        //    var analyste = await _context.Analyste.FindAsync(id);
        //    if (analyste != null)
        //    {
        //        _context.Analyste.Remove(analyste);
        //    }

        //    await _context.SaveChangesAsync();
        //    return RedirectToAction(nameof(Index));
        //}

        // DELETE: api/Analystes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAnalyste(int id)
        {
            var analyste = await _context.Analyste.FindAsync(id);
            if (analyste == null)
            {
                return NotFound();
            }

            _context.Analyste.Remove(analyste);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AnalysteExists(int id)
        {
            return _context.Analyste.Any(e => e.Id == id);
        }
    }
}
