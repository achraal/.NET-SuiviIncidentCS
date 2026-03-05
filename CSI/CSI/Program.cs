using CSI.Models;
using CSI.Services;
using DotNetEnv;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
//using Microsoft.OpenApi;
using System.Text;
using System.Text.Json.Serialization;

DotNetEnv.Env.Load();

var builder = WebApplication.CreateBuilder(args);

// On récupère la clé depuis appsettings.json
//var jwtKey = builder.Configuration["JWT_KEY"];
var jwtKey = Environment.GetEnvironmentVariable("JWT_KEY");
var jwtIssuer = Environment.GetEnvironmentVariable("JWT_ISSUER");
var jwtAudience = Environment.GetEnvironmentVariable("JWT_AUDIENCE");
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
        //ValidIssuer = builder.Configuration["JWT_ISSUER"],
        ValidIssuer = jwtIssuer,
        //ValidAudience = builder.Configuration["JWT_AUDIENCE"],
        ValidAudience = jwtAudience,
        IssuerSigningKey = new SymmetricSecurityKey(keyBytes)
    };
});

builder.Services.AddAuthorization();

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
// Supprime l'alias en haut et remplace le bloc AddSwaggerGen par celui-ci :
/*builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new global::Microsoft.OpenApi.Models.OpenApiInfo
    {
        Title = "CSI API",
        Version = "v1"
    });

    // On définit la sécurité
    var securityScheme = new Microsoft.OpenApi.Models.OpenApiSecurityScheme
    {
        Name = "Authorization",
        Description = "Entrez 'Bearer' suivi d'un espace et de votre jeton.",
        In = Microsoft.OpenApi.Models.ParameterLocation.Header,
        Type = Microsoft.OpenApi.Models.SecuritySchemeType.ApiKey,
        Scheme = "Bearer",
        BearerFormat = "JWT",
        Reference = new Microsoft.OpenApi.Models.OpenApiReference
        {
            Id = "Bearer",
            Type = Microsoft.OpenApi.Models.ReferenceType.SecurityScheme
        }
    };

    options.AddSecurityDefinition("Bearer", securityScheme);

    options.AddSecurityRequirement(new Microsoft.OpenApi.Models.OpenApiSecurityRequirement
    {
        { securityScheme, new string[] { } }
    });
});*/
var frontendUrl = Environment.GetEnvironmentVariable("NEXT_JS");
// Configuration du CORS pour Next.js (Port 3000)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowNextJS",
        policy => policy.WithOrigins(frontendUrl)
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
    var adminEmail = Environment.GetEnvironmentVariable("DEFAULT_ADMIN_EMAIL");
    var adminPass = Environment.GetEnvironmentVariable("DEFAULT_ADMIN_PASSWORD");
    var adminPhone = Environment.GetEnvironmentVariable("DEFAULT_ADMIN_PHONE");
    // 2. On vérifie si un Admin existe déjà
    if (!context.Analyste.Any(a => a.Role == "Admin"))
    {
        // 3. On crée l'objet Admin
        var admin = new Analyste
        {
            Nom = "Admin",
            Prenom = "Système",
            Email = adminEmail,
            Phone = adminPhone,
            Role = "Admin", // C'est cette valeur qui lui donne les pleins pouvoirs
            Disponibilite = true,
            // On hache le mot de passe initial
            PasswordHash = passwordService.HashPassword(adminPass)
        };

        context.Analyste.Add(admin);
        context.SaveChanges();

        Console.WriteLine("### SUCCÈS : L'administrateur par défaut a été créé. ###");
    }
}

app.Run();
