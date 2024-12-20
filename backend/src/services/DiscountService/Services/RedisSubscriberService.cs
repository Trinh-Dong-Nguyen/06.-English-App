using System.Text.Json;
using DiscountService.Events;
using DiscountService.Interfaces;
using StackExchange.Redis;

namespace DiscountService.Services;

public class RedisSubscriberService(IConnectionMultiplexer redis, IServiceProvider serviceProvider)
    : BackgroundService
{
    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        var subscriber = redis.GetSubscriber();

        await subscriber.SubscribeAsync("discounts", async (channel, message) =>
        {
            if (message.IsNullOrEmpty)
                return;
            var eventData = JsonSerializer.Deserialize<DiscountEvent>(message);
            if (eventData != null)
            {
                await ProcessDiscountEvent(eventData);
            }
        });
    }

    private async Task ProcessDiscountEvent(DiscountEvent discountEvent)
    {
        using var scope = serviceProvider.CreateScope();
        var discountService = scope.ServiceProvider.GetRequiredService<IDiscountService>();
        await discountService.CreateOrUpdateDiscountAsync(discountEvent);
    }
}

