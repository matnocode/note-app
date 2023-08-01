using Microsoft.EntityFrameworkCore;
using NoteAppApi.Database;
using System.Reflection;

namespace NoteAppApi
{
    public class Startup
    {
        private IConfiguration Configuration { get; set; }

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMediatR(x => { x.RegisterServicesFromAssembly(Assembly.GetExecutingAssembly()); });
            services.AddHttpContextAccessor();
            services.AddDbContext<NoteAppDbContext>(options => { options.UseSqlServer(Configuration.GetConnectionString("devDbString")); });
            services.AddControllers();
            services.AddCors(options =>
            {
                options.AddPolicy("default", policy =>
                {
                    policy.WithOrigins("http://localhost:5173")
                        .AllowAnyHeader()
                        .AllowAnyMethod()
                        .AllowCredentials();
                });
            });

            services.AddDistributedMemoryCache();
            services.AddSession(options =>
            {
                options.IdleTimeout = TimeSpan.FromSeconds(10);
                options.Cookie.HttpOnly = true;
                options.Cookie.IsEssential = true;
                options.Cookie.Name = ".NoteApp";
            });

            services.AddRepos();
            services.AddServices();
        }

        public void Configure(IApplicationBuilder app, IHostEnvironment env)
        {
            app.UseCors("default");
            app.UseSession();
            app.UseHttpsRedirection();
            app.UseRouting();
            app.UseEndpoints(conf => { conf.MapControllers(); });
        }
    }
}