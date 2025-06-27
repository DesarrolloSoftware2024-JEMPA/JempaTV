using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace JempaTV.Migrations
{
    /// <inheritdoc />
    public partial class WatchlistHasManySeries : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AppSeries_AppWatchLists_WatchListId",
                table: "AppSeries");

            migrationBuilder.AddForeignKey(
                name: "FK_AppSeries_AppWatchLists_WatchListId",
                table: "AppSeries",
                column: "WatchListId",
                principalTable: "AppWatchLists",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AppSeries_AppWatchLists_WatchListId",
                table: "AppSeries");

            migrationBuilder.AddForeignKey(
                name: "FK_AppSeries_AppWatchLists_WatchListId",
                table: "AppSeries",
                column: "WatchListId",
                principalTable: "AppWatchLists",
                principalColumn: "Id");
        }
    }
}
