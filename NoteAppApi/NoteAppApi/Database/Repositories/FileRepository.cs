using NoteAppApi.Database.Entities;
using NoteAppApi.Database.Interfaces;
using File = NoteAppApi.Database.Entities.File;

namespace NoteAppApi.Database.Repositories
{
    public class FileRepository : AsyncRepository<File>, IFileRepository
    {
        public FileRepository(NoteAppDbContext context) : base(context)
        {
        }
    }
}
