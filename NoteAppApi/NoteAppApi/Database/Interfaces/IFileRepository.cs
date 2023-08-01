using NoteAppApi.Database.Entities;
using File = NoteAppApi.Database.Entities.File;

namespace NoteAppApi.Database.Interfaces
{
    public interface IFileRepository : IAsyncRepository<File>
    {
    }
}
