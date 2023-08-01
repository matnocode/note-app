using MediatR;
using NoteAppApi.Commands.Folder.GetFolder;
using NoteAppApi.Database.Interfaces;

namespace NoteAppApi.Commands.Folder.AddFolder
{
    public class AddFolderCommand : IRequest<Unit>
    {
        public int UserId { get; set; }
        public string FolderName { get; set; } = "";
        public string Path { get; set; } = "";
    }

    public class AddFolderCommandHandler : IRequestHandler<AddFolderCommand, Unit>
    {
        private readonly IFolderRepository folderRepository;

        public AddFolderCommandHandler(IFolderRepository folderRepository)
        {
            this.folderRepository = folderRepository;
        }

        public async Task<Unit> Handle(AddFolderCommand request, CancellationToken cancellationToken)
        {
            var mainFolder = await folderRepository.GetByUserId(request.UserId);

            if (request.Path == "Main")
            {
                mainFolder.Folders.Add(new Database.Entities.Folder { DateCreated = DateTime.Now, DateModified = DateTime.Now, Name = request.FolderName });
                await folderRepository.Update(mainFolder);
                return Unit.Value;
            }

            var folder = GetFolderCommandHandler.GetFolderByPath(request.Path, mainFolder) ?? throw new Exception();

            folder.Folders.Add(new Database.Entities.Folder { DateCreated = DateTime.Now, DateModified = DateTime.Now, Name = request.FolderName });
            await folderRepository.Update(folder);

            return Unit.Value;
        }
    }
}
