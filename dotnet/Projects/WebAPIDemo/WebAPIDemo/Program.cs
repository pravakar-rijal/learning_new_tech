var builder = WebApplication.CreateBuilder();

builder.Services.AddControllers();

var app = builder.Build();

app.UseHttpsRedirection();

//app.MapGet("/shirts", () =>
//{
//    return "These are all the types of shirts";
//});
app.MapControllers();

app.Run();