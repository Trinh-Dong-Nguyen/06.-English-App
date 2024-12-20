using System.Text.Json;
using DiscountService.Models;
using Microsoft.EntityFrameworkCore;
using DiscountModel = DiscountService.Models.Discount;
namespace DiscountService.Data;

public class DiscountDbContext(DbContextOptions<DiscountDbContext> options) : DbContext(options)
{
    public DbSet<DiscountModel> Discounts { get; set; }
    public DbSet<DiscountHistory> DiscountHistories { get; set; }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<DiscountModel>().ToTable("Discounts");
        modelBuilder.Entity<DiscountHistory>().ToTable("DiscountHistory");
    }
}
