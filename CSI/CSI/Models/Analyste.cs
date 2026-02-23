using System.ComponentModel.DataAnnotations;

namespace CSI.Models
{
    public class Analyste
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(50)]
        public string Nom { get; set; }

        [Required]
        [StringLength(50)]
        public string Prenom { get; set; }

        [Required, EmailAddress]
        public string Email { get; set; }
        [Required]
        public string PasswordHash { get; set; }

        [Phone]
        public string Phone { get; set; }

        [Required]
        public string Role { get; set; } // ex: L1, L2, SOC Manager
        public bool Disponibilite { get; set; } = true;

        // Relation : Un analyste travaille sur plusieurs incidents
        public virtual ICollection<Incident> Incidents { get; set; } = new List<Incident>();
    }
}