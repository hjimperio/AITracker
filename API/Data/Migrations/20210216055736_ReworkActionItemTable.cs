using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Data.Migrations
{
    public partial class ReworkActionItemTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Category",
                table: "ActionItems");

            migrationBuilder.DropColumn(
                name: "CurrentIndividualAssigned",
                table: "ActionItems");

            migrationBuilder.DropColumn(
                name: "CurrentTeamOwner",
                table: "ActionItems");

            migrationBuilder.DropColumn(
                name: "Remarks",
                table: "ActionItems");

            migrationBuilder.RenameColumn(
                name: "TGOCP",
                table: "ActionItems",
                newName: "Region");

            migrationBuilder.RenameColumn(
                name: "DeliveryManagerSupportId",
                table: "ActionItems",
                newName: "AppUserId");

            migrationBuilder.RenameColumn(
                name: "AssignedToId",
                table: "ActionItems",
                newName: "AiCreatedBy");

            migrationBuilder.CreateIndex(
                name: "IX_ActionItems_AppUserId",
                table: "ActionItems",
                column: "AppUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_ActionItems_AspNetUsers_AppUserId",
                table: "ActionItems",
                column: "AppUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ActionItems_AspNetUsers_AppUserId",
                table: "ActionItems");

            migrationBuilder.DropIndex(
                name: "IX_ActionItems_AppUserId",
                table: "ActionItems");

            migrationBuilder.RenameColumn(
                name: "Region",
                table: "ActionItems",
                newName: "TGOCP");

            migrationBuilder.RenameColumn(
                name: "AppUserId",
                table: "ActionItems",
                newName: "DeliveryManagerSupportId");

            migrationBuilder.RenameColumn(
                name: "AiCreatedBy",
                table: "ActionItems",
                newName: "AssignedToId");

            migrationBuilder.AddColumn<string>(
                name: "Category",
                table: "ActionItems",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CurrentIndividualAssigned",
                table: "ActionItems",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CurrentTeamOwner",
                table: "ActionItems",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Remarks",
                table: "ActionItems",
                type: "TEXT",
                nullable: true);
        }
    }
}
