namespace DiscountService.Models;

public class Discount
{
    public int Id { get; set; }
    public DiscountType Type { get; set; }
    public double? Percentage { get; set; }
    public double? FlatAmount { get; set; }
    public DateTime StartDate { get; set; }
    public string Code { get; set; }
    public DateTime EndDate { get; set; }
    public string? CourseIds { get; set; } 
    public string? OwnerId { get; set; }
    public int? UsageLimit { get; set; }
    public bool IsActive { get; set; } = true;
    public int UsageCount { get; set; } = 0;
}

