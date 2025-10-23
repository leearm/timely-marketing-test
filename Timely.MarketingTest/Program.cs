WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

// Add controllers for API endpoints
builder.Services.AddControllers();

// Add HttpClient for Pokemon API calls
builder.Services.AddHttpClient();

builder.CreateUmbracoBuilder()
    .AddBackOffice()
    .AddWebsite()
    .AddComposers()
    .Build();

WebApplication app = builder.Build();

await app.BootUmbracoAsync();

// Add routing before Umbraco middleware
app.UseRouting();

app.UseUmbraco()
    .WithMiddleware(u =>
    {
        u.UseBackOffice();
        u.UseWebsite();
    })
    .WithEndpoints(u =>
    {
        u.UseBackOfficeEndpoints();
        u.UseWebsiteEndpoints();
    });

// Map controllers after Umbraco endpoints
app.MapControllers();

await app.RunAsync();
