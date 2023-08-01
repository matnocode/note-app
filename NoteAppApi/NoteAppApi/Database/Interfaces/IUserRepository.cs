using NoteAppApi.Database.Entities;

namespace NoteAppApi.Database.Interfaces
{
    public interface IUserRepository : IAsyncRepository<User>
    {
        Task<User> GetByUsernameAndPassword(string username, string password);
    }
}
