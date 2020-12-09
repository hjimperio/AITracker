using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Data.Migrations
{
    public partial class AddActionItems : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ActionItems",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Category = table.Column<string>(type: "TEXT", nullable: true),
                    Division = table.Column<string>(type: "TEXT", nullable: true),
                    Request = table.Column<string>(type: "TEXT", nullable: true),
                    DateCreated = table.Column<DateTime>(type: "TEXT", nullable: false),
                    InternalEmailSubject = table.Column<bool>(type: "INTEGER", nullable: false),
                    AssignedToId = table.Column<int>(type: "INTEGER", nullable: false),
                    WorkOrderTypeRequest = table.Column<string>(type: "TEXT", nullable: true),
                    Feedback = table.Column<bool>(type: "INTEGER", nullable: false),
                    Notes = table.Column<string>(type: "TEXT", nullable: true),
                    TGOCP = table.Column<string>(type: "TEXT", nullable: true),
                    TaskNumber = table.Column<string>(type: "TEXT", nullable: true),
                    ActionItemNumber = table.Column<string>(type: "TEXT", nullable: true),
                    DeliveryManagerSupportId = table.Column<int>(type: "INTEGER", nullable: false),
                    ExternalEmailSubject = table.Column<string>(type: "TEXT", nullable: true),
                    DateStarted = table.Column<DateTime>(type: "TEXT", nullable: false),
                    CurrentTeamOwner = table.Column<string>(type: "TEXT", nullable: true),
                    CurrentIndividualAssigned = table.Column<string>(type: "TEXT", nullable: true),
                    Remarks = table.Column<string>(type: "TEXT", nullable: true),
                    MapStatus = table.Column<bool>(type: "INTEGER", nullable: false),
                    DateResolved = table.Column<DateTime>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ActionItems", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ActionItems");
        }
    }
}
