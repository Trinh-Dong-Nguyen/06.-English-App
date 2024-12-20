using System.Globalization;
using System.Text.Json;
using DiscountService.Data;
using DiscountService.Models;
using Grpc.Core;
using Microsoft.EntityFrameworkCore;
using DiscountModel = DiscountService.Models.Discount;
namespace DiscountService.Services;

public class DiscountServiceIml(DiscountDbContext context) : DiscountService.DiscountServiceBase
{
    
    public override async Task<DiscountResponse> CreateDiscount(CreateDiscountRequest request, ServerCallContext context1)
    {
        var discount = new DiscountModel
        {
            Type = request.Type,
            Code = request.Code,
            Percentage = request.Percentage,
            FlatAmount = request.FlatAmount,
            StartDate = DateTime.Parse(request.StartDate),
            EndDate = DateTime.Parse(request.EndDate),
            CourseIds = JsonSerializer.Serialize(request.CourseIds),
            OwnerId = request.OwnerId,
            UsageLimit = request.UsageLimit,
            IsActive = true
        };

        context.Discounts.Add(discount);
        await context.SaveChangesAsync();

        return new DiscountResponse { Id = discount.Id, Status = "Created" };
    }

    public override async Task<ApplyDiscountResponse> ApplyDiscount(ApplyDiscountRequest request, ServerCallContext context1)
    {
        var discount = await context.Discounts.FindAsync(request.DiscountId);

        if (discount is not { IsActive: true })
            return new ApplyDiscountResponse { Status = "Invalid Discount" };

        if (discount.UsageLimit.HasValue && discount.UsageCount >= discount.UsageLimit)
            return new ApplyDiscountResponse { Status = "Limit Reached" };

        var discountAmount = discount.Percentage.HasValue
            ? discount.Percentage.Value / 100.0 * 100.0 
            : discount.FlatAmount ?? 0.0;

        discount.UsageCount++;
        context.DiscountHistories.Add(new DiscountHistory
        {
            DiscountId = discount.Id,
            CourseId = request.CourseId,
            UserId = request.UserId,
            RedeemedAt = DateTime.UtcNow
        });

        await context.SaveChangesAsync();

        return new ApplyDiscountResponse { Status = "Applied", DiscountAmount = discountAmount };
    }

    public override async Task<GetDiscountResponse> GetDiscountByCourse(GetDiscountByCourseRequest request, ServerCallContext context1)
    {
        var discounts = await context.Discounts.AsNoTracking()
            .Where(d => d.CourseIds != null && d.CourseIds.Contains(request.CourseId) && d.IsActive)
            .ToListAsync();

        var response = new GetDiscountResponse();
        response.Discounts.AddRange(discounts.Select(d => new Discount
        {
            Id = d.Id,
            Code = d.Code,
            Type = d.Type,
            Percentage = d.Percentage ?? 0,
            FlatAmount = d.FlatAmount ?? 0,
            StartDate = d.StartDate.ToString(CultureInfo.InvariantCulture),
            EndDate = d.EndDate.ToString(CultureInfo.InvariantCulture),
            OwnerId = d.OwnerId,
            UsageLimit = d.UsageLimit ?? 0,
            IsActive = d.IsActive,
            UsageCount = d.UsageCount
        }));

        return response;
    }
    public override async Task<GetDiscountResponse>  GetDiscountsByOwner(GetDiscountsByOwnerRequest request, ServerCallContext context1)
    {
        var discounts = await context.Discounts.AsNoTracking()
            .Where(d => d.OwnerId == request.OwnerId && d.IsActive)
            .ToListAsync();

        var response = new GetDiscountResponse();
        response.Discounts.AddRange(discounts.Select(d => new Discount
        {
            Id = d.Id,
            Type = d.Type,
            Code = d.Code,
            Percentage = d.Percentage ?? 0,
            FlatAmount = d.FlatAmount ?? 0,
            StartDate = d.StartDate.ToString(CultureInfo.InvariantCulture),
            OwnerId = d.OwnerId,
            EndDate = d.EndDate.ToString(CultureInfo.InvariantCulture),
            UsageLimit = d.UsageLimit ?? 0,
            IsActive = d.IsActive,
            UsageCount = d.UsageCount
        }));

        return response;
    }

    public override async Task<DiscountResponse> UpdateDiscount(UpdateDiscountRequest request, ServerCallContext context1)
    {
        var discount = await context.Discounts.Where(d => d.Id == request.DiscountId).FirstOrDefaultAsync();
        if (discount is null)
            return new DiscountResponse { Status = "Discount not found" };
        discount.Type = request.Type;
        discount.Percentage = request.Percentage;
        discount.FlatAmount = request.FlatAmount;
        discount.StartDate = DateTime.Parse(request.StartDate);
        discount.EndDate = DateTime.Parse(request.EndDate);
        discount.CourseIds = JsonSerializer.Serialize(request.CourseIds);
        discount.OwnerId = request.OwnerId;
        discount.UsageLimit = request.UsageLimit;
        discount.Code = request.Code;
        await context.SaveChangesAsync();
        return new DiscountResponse { Id = discount.Id, Status = "Updated" };
        
    }

    public override async Task<ApplyDiscountResponse> DisableDiscount(DisableDiscountRequest request, ServerCallContext context1)
    {
        var discount = await context.Discounts.FindAsync(request.DiscountId);
        if (discount is null)
            return new ApplyDiscountResponse { Status = "Discount not found" };
        discount.IsActive = false;
        await context.SaveChangesAsync();
        return new ApplyDiscountResponse { Status = "Disabled" };
        
    }
}