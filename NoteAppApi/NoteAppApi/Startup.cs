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
            services.AddCors();

            services.AddRepos();
        }

        public void Configure(IApplicationBuilder app, IHostEnvironment env)
        {
            app.UseCors();
            app.UseHttpsRedirection();
            app.UseRouting();
            app.UseEndpoints(conf => { conf.MapControllers(); });
        }
    }
}