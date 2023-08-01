using NoteAppApi.Database.Entities;

namespace NoteAppApi.Database.Interfaces
{
    public interface IUserContext
    {
        Task<User?> GetCurrentUser();
        void LoginUser(int userId);
    }
}
