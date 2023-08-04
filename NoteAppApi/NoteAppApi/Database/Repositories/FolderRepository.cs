using Microsoft.EntityFrameworkCore;
using NoteAppApi.Database.Entities;
using NoteAppApi.Database.Interfaces;

namespace NoteAppApi.Database.Repositories
{
    public class FolderRepository : AsyncRepository<Folder>, IFolderRepository
    {
        public FolderRepository(NoteAppDbContext context) : base(context)
        {
        }

        public async Task<Folder> GetByUserId(int userId)
        {
            int folderId = (await context.Users.FindAsync(userId))?.FolderId ?? -1;

            var folder = await context.Folders
               .Include(x => x.Folders)
               .Include(x => x.Files)
               .Where(x => x.Id == folderId && x.Name == "Main")
               .FirstAsync();

            if (folder != null)
            {
                await LoadSubFoldersRecursive(folder);
            }

            return folder;
        }

        private async Task LoadSubFoldersRecursive(Folder folder)
        {
            await context.Entry(folder).Collection(f => f.Folders).LoadAsync();
            await context.Entry(folder).Collection(f => f.Files).LoadAsync();

            foreach (var subFolder in folder.Folders)
                await LoadSubFoldersRecursive(subFolder);
        }
    }
}
