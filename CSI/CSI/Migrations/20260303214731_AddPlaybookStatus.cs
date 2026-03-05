using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CSI.Migrations
{
    /// <inheritdoc />
    public partial class AddPlaybookStatus : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "PlaybookStatus",
                table: "Incident",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PlaybookStatus",
                table: "Incident");
        }
    }
}
