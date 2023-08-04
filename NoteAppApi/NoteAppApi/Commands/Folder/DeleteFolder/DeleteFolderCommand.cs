using MediatR;
using Microsoft.IdentityModel.Tokens;
using NoteAppApi.Database.Entities;
using NoteAppApi.Database.Interfaces;

namespace NoteAppApi.Commands.Folder.DeleteFolder
{
    public class DeleteFolderCommand : IRequest<Unit>
    {
        public int UserId { get; set; }
        public string Path { get; set; }
    }

    public class DeleteFolderCommandHandler : IRequestHandler<DeleteFolderCommand, Unit>
    {
        private readonly IFolderRepository folderRepository;
        private readonly IFileRepository fileRepository;

        public DeleteFolderCommandHandler(IFolderRepository folderRepository, IFileRepository fileRepository)
        {
            this.folderRepository = folderRepository;
            this.fileRepository = fileRepository;
        }

        public async Task<Unit> Handle(DeleteFolderCommand request, CancellationToken cancellationToken)
        {
            if (request.Path.IsNullOrEmpty() || request.Path == "Main" || request.Path == "main")
                throw new Exception("Cannot delete main folder");

            var mainFolder = await folderRepository.GetByUserId(request.UserId);
            var folderToDelete = GetFolder.GetFolderCommandHandler.GetFolderByPath(request.Path, mainFolder) ?? throw new Exception("Cannot delete main folder");
            if (folderToDelete.Name == "Main ") throw new Exception("Cannot delete main folder");

            if (folderToDelete.Files.Count > 0)
                foreach (var file in folderToDelete.Files)
                    await fileRepository.DeleteAsync(file);

            if (folderToDelete.Folders.Count > 0)
                foreach (var folder in folderToDelete.Folders)
                    await DeleteFolders(folder);

            await folderRepository.DeleteAsync(folderToDelete);

            return Unit.Value;
        }

        private async Task DeleteFolders(Database.Entities.Folder folder)
        {
            foreach (var f in folder.Folders)
            {
                if (f.Folders.Count > 0)
                    await DeleteFolders(f);
                await folderRepository.DeleteAsync(f);
            }
        }
    }
}
