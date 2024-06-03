using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataAccessLayer.Migrations
{
    /// <inheritdoc />
    public partial class Mie : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Status",
                table: "EmployeesDb");

            migrationBuilder.AddColumn<int>(
                name: "StatusId",
                table: "EmployeesDb",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_EmployeesDb_StatusId",
                table: "EmployeesDb",
                column: "StatusId");

            migrationBuilder.AddForeignKey(
                name: "FK_EmployeesDb_StatusDb_StatusId",
                table: "EmployeesDb",
                column: "StatusId",
                principalTable: "StatusDb",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_EmployeesDb_StatusDb_StatusId",
                table: "EmployeesDb");

            migrationBuilder.DropIndex(
                name: "IX_EmployeesDb_StatusId",
                table: "EmployeesDb");

            migrationBuilder.DropColumn(
                name: "StatusId",
                table: "EmployeesDb");

            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "EmployeesDb",
                type: "int",
                nullable: true);
        }
    }
}
