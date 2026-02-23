using CSI.Models;
using CSI.Services;
using DotNetEnv;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// On récupère la clé depuis appsettings.json
var jwtKey = builder.Configuration["Jwt:Key"];
var keyBytes = Encoding.UTF8.GetBytes(jwtKey);

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(keyBytes)
    };
});

builder.Services.AddAuthorization();

DotNetEnv.Env.Load();

builder.Services.AddControllers()
    .AddJsonOptions(options => {
        // Évite les boucles infinies lors de la conversion en JSON 
        options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
    });

// Récupération de la connexion depuis appsettings.json
//var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
var connectionString = Environment.GetEnvironmentVariable("DB_CONNECTION_STRING");

// Ajout du DbContext et SQL Server
builder.Services.AddDbContext<SuiviIncidentDBContext>(options => options.UseSqlServer(connectionString));

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configuration du CORS pour Next.js (Port 3000)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowNextJS",
        policy => policy.WithOrigins("http://localhost:3000")
                        .AllowAnyMethod()
                        .AllowAnyHeader());
});

// Add services to the container.
//builder.Services.AddControllersWithViews();

builder.Services.AddScoped<IPasswordService, PasswordService>();

var app = builder.Build();

// Toujours activer Swagger en développement pour tester
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(); // Par défaut, l'URL sera /swagger
}

// Configure the HTTP request pipeline.
//if (!app.Environment.IsDevelopment())
//{
//    app.UseExceptionHandler("/Home/Error");
//    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
//    app.UseHsts();
//}

app.UseHttpsRedirection();
// Applique la politique CORS avant l'autorisation
app.UseCors("AllowNextJS");
app.UseAuthentication();
app.UseAuthorization();

// IMPORTANT : Remplace MapControllerRoute (MVC) par MapControllers (API)
app.MapControllers();

//app.UseStaticFiles();

//app.UseRouting();

//app.UseAuthorization();

//app.MapControllerRoute(
//    name: "default",
//    pattern: "{controller=Home}/{action=Index}/{id?}");

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var context = services.GetRequiredService<SuiviIncidentDBContext>();
    var passwordService = services.GetRequiredService<IPasswordService>();

    // 1. On s'assure que la base est créée
    context.Database.EnsureCreated();

    // 2. On vérifie si un Admin existe déjà
    if (!context.Analyste.Any(a => a.Role == "Admin"))
    {
        // 3. On crée l'objet Admin
        var admin = new Analyste
        {
            Nom = "Admin",
            Prenom = "Système",
            Email = "admin@cybertrack.com",
            Phone = "00000000",
            Role = "Admin", // C'est cette valeur qui lui donne les pleins pouvoirs
            Disponibilite = true,
            // On hache le mot de passe initial
            PasswordHash = passwordService.HashPassword("Admin@Cyber2026!")
        };

        context.Analyste.Add(admin);
        context.SaveChanges();

        Console.WriteLine("### SUCCÈS : L'administrateur par défaut a été créé. ###");
    }
}

app.Run();
