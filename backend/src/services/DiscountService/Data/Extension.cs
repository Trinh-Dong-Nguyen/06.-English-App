using System.Text.Json;
using Microsoft.EntityFrameworkCore;
using DiscountModel = DiscountService.Models.Discount;
namespace DiscountService.Data;

public static class Extension
{
    public static WebApplication MigrateDatabase(this WebApplication webApp)
    {
        using var scope = webApp.Services.CreateScope();
        using var appContext = scope.ServiceProvider.GetRequiredService<DiscountDbContext>();
        appContext.Database.Migrate();
        SeedData(appContext);
        return webApp;
    }

    private static  void SeedData(DiscountDbContext context)
    {
        if (context.Discounts.Any()) return; 
        var discounts = new[]
        {
            new DiscountModel
            {
                Id = 1,
                Type = DiscountType.System,
                Percentage = 10,
                Code = "SYSTEM10",
                StartDate = DateTime.UtcNow,
                EndDate = DateTime.UtcNow.AddDays(7),
                CourseIds = JsonSerializer.Serialize(new[] { "1", "2", "3" }),
                OwnerId = "1",
                FlatAmount = 10,
                UsageLimit = 100,
                IsActive = true
            },
            new DiscountModel
            {
                Id = 2,
                Type = DiscountType.System,
                Percentage = 20,
                Code = "SYSTEM20",
                StartDate = DateTime.UtcNow,
                EndDate = DateTime.UtcNow.AddDays(7),
                CourseIds = JsonSerializer.Serialize(new[] { "1", "2", "3" }),
                OwnerId = "1",
                FlatAmount = 10,
                UsageLimit = 100,
                IsActive = true
            },
            new DiscountModel
            {
                Id = 3,
                Type = DiscountType.System,
                Percentage = 30,
                Code = "SYSTEM30",
                StartDate = DateTime.UtcNow,
                EndDate = DateTime.UtcNow.AddDays(7),
                CourseIds = JsonSerializer.Serialize(new[] { "1", "2", "3" }),
                OwnerId = "1",
                FlatAmount = 10,
                UsageLimit = 100,
                IsActive = true
            }
        };

        context.Discounts.AddRange(discounts);
        context.SaveChanges();
    }
}