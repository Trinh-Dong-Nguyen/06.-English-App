using DiscountService.Data;
using DiscountService.Interfaces;
using DiscountService.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using StackExchange.Redis;

var builder = WebApplication.CreateBuilder(args);
{
    builder.Services.AddGrpc();
    builder.Services.AddDbContext<DiscountDbContext>(opts => opts.UseSqlite(builder.Configuration.GetConnectionString("DiscountDb")).ConfigureWarnings(warnings =>
            warnings.Ignore(RelationalEventId.PendingModelChangesWarning))
    );
    builder.Services.AddSingleton<IConnectionMultiplexer>(ConnectionMultiplexer.Connect(builder.Configuration.GetConnectionString("Redis") ?? string.Empty));
    builder.Services.AddHostedService<RedisSubscriberService>();
    builder.Services.AddScoped<IDiscountService, DiscountHandleService>();
}

var app = builder.Build();
{
    app.MigrateDatabase();
    app.MapGrpcService<DiscountServiceIml>();
    app.MapGet("/",
        () =>
            "Communication with gRPC endpoints must be made through a gRPC client. To learn how to create a client, visit: https://go.microsoft.com/fwlink/?linkid=2086909");
   
    app.Run();
}
