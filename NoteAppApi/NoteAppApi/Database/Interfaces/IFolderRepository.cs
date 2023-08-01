using NoteAppApi.Database.Entities;

namespace NoteAppApi.Database.Interfaces
{
    public interface IFolderRepository : IAsyncRepository<Folder>
    {
        Task<Folder> GetByUserId(int userId);
    }
}
