using NoteAppApi.Database.Interfaces;
using NoteAppApi.Database.Repositories;
using NoteAppApi.Database.Services;

namespace NoteAppApi
{
    public static class AddDependecies
    {
        public static void AddRepos(this IServiceCollection services)
        {
            services.AddScoped(typeof(IAsyncRepository<>), typeof(AsyncRepository<>));
            services.AddScoped<IFileRepository, FileRepository>();
            services.AddScoped<IFolderRepository, FolderRepository>();
            services.AddScoped<IUserRepository, UserRepository>();
        }

        public static void AddServices(this IServiceCollection services)
        {
            services.AddScoped<IUserContext, UserContext>();
        }
    }
}
