using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CSI.Models
{
    public class Incident
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string Type { get; set; } // ex: Phishing, Ransomware, Brute Force

        [Required]
        public string Severite { get; set; } // Faible, Moyen, Critique

        [Required]
        public string Etat { get; set; } // Nouveau, En cours, Résolu, Fermé

        [Required]
        [DataType(DataType.MultilineText)]
        public string Description { get; set; }
        public string SourceDetection { get; set; } // SIEM, EDR, Signalement Utilisateur
        public DateTime DateDeclaration { get; set; } = DateTime.Now;
        public DateTime? DateResolution { get; set; }
        // Foreign Key vers Analyste
        public int? AnalysteId { get; set; }

        [ForeignKey("AnalysteId")]
        public virtual Analyste? AnalysteEnCharge { get; set; }
        public string? PlaybookStatus { get; set; } // Stockera "1,0,1" ou un JSON
    }
}