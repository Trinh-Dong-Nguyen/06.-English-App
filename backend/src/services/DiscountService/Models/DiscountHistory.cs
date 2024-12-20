namespace DiscountService.Models;

public class DiscountHistory
{
    public int Id { get; set; }
    public int DiscountId { get; set; }
    public string CourseId { get; set; }
    public string UserId { get; set; }
    public DateTime RedeemedAt { get; set; }

    public Discount Discount { get; set; }
}