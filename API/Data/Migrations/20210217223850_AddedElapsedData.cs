using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Data.Migrations
{
    public partial class AddedElapsedData : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "DaysAndHoursSpent",
                table: "ActionItems",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DueDate",
                table: "ActionItems",
                type: "TEXT",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<double>(
                name: "ElapsedDays",
                table: "ActionItems",
                type: "REAL",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<DateTime>(
                name: "ElapsedDueDate",
                table: "ActionItems",
                type: "TEXT",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<bool>(
                name: "MetElapsedTarget",
                table: "ActionItems",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "MetSLO",
                table: "ActionItems",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "Reason",
                table: "ActionItems",
                type: "TEXT",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DaysAndHoursSpent",
                table: "ActionItems");

            migrationBuilder.DropColumn(
                name: "DueDate",
                table: "ActionItems");

            migrationBuilder.DropColumn(
                name: "ElapsedDays",
                table: "ActionItems");

            migrationBuilder.DropColumn(
                name: "ElapsedDueDate",
                table: "ActionItems");

            migrationBuilder.DropColumn(
                name: "MetElapsedTarget",
                table: "ActionItems");

            migrationBuilder.DropColumn(
                name: "MetSLO",
                table: "ActionItems");

            migrationBuilder.DropColumn(
                name: "Reason",
                table: "ActionItems");
        }
    }
}
