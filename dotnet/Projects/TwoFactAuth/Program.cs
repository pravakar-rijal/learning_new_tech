using System.Text;
using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using TwoFactAuth.Data;
using TwoFactAuth.MappingProfile;
using TwoFactAuth.Repositories.Account;
using TwoFactAuth.Utility.Email;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddAuthentication().AddCookie();

builder.Services.AddScoped<IAccountRepository, AccountRepository>();
builder.Services.Configure<IConfiguration>(builder.Configuration);
builder.Services.AddSingleton<IEmailSender, EmailSender>();
builder.Services.AddSingleton<ISmsSender, SmsSender>();
builder.Services.AddAutoMapper(typeof(MappingProfile));

builder.Services.AddDbContext<TwoFactAuthDbContext>(opts => opts.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddIdentity<IdentityUser, IdentityRole>(opts =>
{
    opts.Password.RequireNonAlphanumeric = true;
    opts.Password.RequiredLength = 8;
    opts.Password.RequireDigit = true;
})
    .AddEntityFrameworkStores<TwoFactAuthDbContext>()
    .AddDefaultTokenProviders();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
