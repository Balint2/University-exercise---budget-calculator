var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();


/*
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});*/


var app = builder.Build();

app.UseStaticFiles();

//app.UseCors();



//app.MapGet("/", () => "Hello World!");



Console.WriteLine("Valami");

app.MapControllers(); // Ha van ApiController

app.MapGet("/", async context =>
{
    context.Response.ContentType = "text/html";
    await context.Response.SendFileAsync("wwwroot/index.html");
});

// Ha késõbb van API is:


app.Run();
