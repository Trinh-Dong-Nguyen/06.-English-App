namespace DiscountService.Events;

public class DiscountEvent
{
    public int Id;
    public DiscountType Type;
    public double? Percentage;
    public double? FlatAmount;
    public DateTime StartDate;
    public string Code;
    public DateTime EndDate;
    public List<string>? CourseIds;
    public string? OwnerId;
    public int? UsageLimit;
    public bool IsActive;
    public int UsageCount;
}