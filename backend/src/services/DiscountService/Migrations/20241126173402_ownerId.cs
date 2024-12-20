using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DiscountService.Migrations
{
    /// <inheritdoc />
    public partial class ownerId : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "AuthorId",
                table: "Discounts",
                newName: "OwnerId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "OwnerId",
                table: "Discounts",
                newName: "AuthorId");
        }
    }
}
