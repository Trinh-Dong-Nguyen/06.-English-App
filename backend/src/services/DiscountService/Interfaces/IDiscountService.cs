using DiscountService.Events;
using DiscountService.Services;

namespace DiscountService.Interfaces;

public interface IDiscountService
{
    Task CreateOrUpdateDiscountAsync(DiscountEvent discountEvent);
}