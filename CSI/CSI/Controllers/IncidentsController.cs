using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using CSI.Models;

namespace CSI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class IncidentsController : ControllerBase
    //public class IncidentsController : Controller
    {
        private readonly SuiviIncidentDBContext _context;

        public IncidentsController(SuiviIncidentDBContext context)
        {
            _context = context;
        }

        // GET: Incidents
        //public async Task<IActionResult> Index()
        //{
        //    var suiviIncidentDBContext = _context.Incident.Include(i => i.AnalysteEnCharge);
        //    return View(await suiviIncidentDBContext.ToListAsync());
        //}

        // GET: api/Incidents
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Incident>>> GetIncidents()
        {
            // On inclut les données de l'analyste pour faciliter l'affichage côté Next.js
            return await _context.Incident
                .Include(i => i.AnalysteEnCharge)
                .ToListAsync();
        }

        // GET: Incidents/Details/5
        //public async Task<IActionResult> Details(int? id)
        //{
        //    if (id == null)
        //    {
        //        return NotFound();
        //    }

        //    var incident = await _context.Incident
        //        .Include(i => i.AnalysteEnCharge)
        //        .FirstOrDefaultAsync(m => m.Id == id);
        //    if (incident == null)
        //    {
        //        return NotFound();
        //    }

        //    return View(incident);
        //}

        // GET: api/Incidents/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Incident>> GetIncident(int id)
        {
            var incident = await _context.Incident
                .Include(i => i.AnalysteEnCharge)
                .FirstOrDefaultAsync(m => m.Id == id);

            if (incident == null)
            {
                return NotFound();
            }

            return incident;
        }

        // GET: Incidents/Create
        //public IActionResult Create()
        //{
        //    ViewData["AnalysteId"] = new SelectList(_context.Analyste, "Id", "Email");
        //    return View();
        //}

        // POST: Incidents/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        //[HttpPost]
        //[ValidateAntiForgeryToken]
        //public async Task<IActionResult> Create([Bind("Id,Type,Severite,Etat,Description,SourceDetection,DateDeclaration,DateResolution,AnalysteId")] Incident incident)
        //{
        //    if (ModelState.IsValid)
        //    {
        //        _context.Add(incident);
        //        await _context.SaveChangesAsync();
        //        return RedirectToAction(nameof(Index));
        //    }
        //    ViewData["AnalysteId"] = new SelectList(_context.Analyste, "Id", "Email", incident.AnalysteId);
        //    return View(incident);
        //}

        // POST: api/Incidents
        [HttpPost]
        public async Task<ActionResult<Incident>> CreateIncident(Incident incident)
        {
            if (ModelState.IsValid)
            {
                _context.Incident.Add(incident);
                await _context.SaveChangesAsync();

                return CreatedAtAction(nameof(GetIncident), new { id = incident.Id }, incident);
            }
            return BadRequest(ModelState);
        }

        // GET: Incidents/Edit/5
        //public async Task<IActionResult> Edit(int? id)
        //{
        //    if (id == null)
        //    {
        //        return NotFound();
        //    }

        //    var incident = await _context.Incident.FindAsync(id);
        //    if (incident == null)
        //    {
        //        return NotFound();
        //    }
        //    ViewData["AnalysteId"] = new SelectList(_context.Analyste, "Id", "Email", incident.AnalysteId);
        //    return View(incident);
        //}

        // POST: Incidents/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        //[HttpPost]
        //[ValidateAntiForgeryToken]
        //public async Task<IActionResult> Edit(int id, [Bind("Id,Type,Severite,Etat,Description,SourceDetection,DateDeclaration,DateResolution,AnalysteId")] Incident incident)
        //{
        //    if (id != incident.Id)
        //    {
        //        return NotFound();
        //    }

        //    if (ModelState.IsValid)
        //    {
        //        try
        //        {
        //            _context.Update(incident);
        //            await _context.SaveChangesAsync();
        //        }
        //        catch (DbUpdateConcurrencyException)
        //        {
        //            if (!IncidentExists(incident.Id))
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
        //    ViewData["AnalysteId"] = new SelectList(_context.Analyste, "Id", "Email", incident.AnalysteId);
        //    return View(incident);
        //}

        // PUT: api/Incidents/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateIncident(int id, Incident incident)
        {
            if (id != incident.Id)
            {
                return BadRequest();
            }

            _context.Entry(incident).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!IncidentExists(id))
                {
                    return NotFound();
                }
                else { throw; }
            }

            return NoContent();
        }

        // GET: Incidents/Delete/5
        //public async Task<IActionResult> Delete(int? id)
        //{
        //    if (id == null)
        //    {
        //        return NotFound();
        //    }

        //    var incident = await _context.Incident
        //        .Include(i => i.AnalysteEnCharge)
        //        .FirstOrDefaultAsync(m => m.Id == id);
        //    if (incident == null)
        //    {
        //        return NotFound();
        //    }

        //    return View(incident);
        //}

        // POST: Incidents/Delete/5
        //[HttpPost, ActionName("Delete")]
        //[ValidateAntiForgeryToken]
        //public async Task<IActionResult> DeleteConfirmed(int id)
        //{
        //    var incident = await _context.Incident.FindAsync(id);
        //    if (incident != null)
        //    {
        //        _context.Incident.Remove(incident);
        //    }

        //    await _context.SaveChangesAsync();
        //    return RedirectToAction(nameof(Index));
        //}

        // DELETE: api/Incidents/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteIncident(int id)
        {
            var incident = await _context.Incident.FindAsync(id);
            if (incident == null)
            {
                return NotFound();
            }

            _context.Incident.Remove(incident);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool IncidentExists(int id)
        {
            return _context.Incident.Any(e => e.Id == id);
        }
    }
}
