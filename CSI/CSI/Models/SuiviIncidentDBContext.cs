using CSI.Models;
using Microsoft.EntityFrameworkCore;

namespace CSI.Models
{
    public class SuiviIncidentDBContext : DbContext
    {
        public SuiviIncidentDBContext(DbContextOptions<SuiviIncidentDBContext> options) : base(options)
        {
        }
        public DbSet<Incident> Incident { get; set; } 

        public DbSet<Analyste> Analyste { get; set; }
    }
}