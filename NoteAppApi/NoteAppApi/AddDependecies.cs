using NoteAppApi.Database.Interfaces;
using NoteAppApi.Database.Repositories;

namespace NoteAppApi
{
    public static class AddDependecies
    {
        public static void AddRepos(this IServiceCollection services)
        {
            services.AddScoped(typeof(IAsyncRepository<>), typeof(AsyncRepository<>));
            services.AddScoped<ITestRepository, TestRepository>();
        }
    }
}
