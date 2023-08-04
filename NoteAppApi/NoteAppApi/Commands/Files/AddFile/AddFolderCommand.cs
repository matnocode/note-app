using MediatR;
using NoteAppApi.Commands.Folder.GetFolder;
using NoteAppApi.Database.Interfaces;

namespace NoteAppApi.Commands.Folder.AddFolder
{
    public class AddFileCommand : IRequest<Unit>
    {
        public int UserId { get; set; }
        public string FileName { get; set; } = "";
        public string Path { get; set; } = "";
    }

    public class AddFileCommandHandler : IRequestHandler<AddFileCommand, Unit>
    {
        private readonly IFolderRepository folderRepository;

        public AddFileCommandHandler(IFolderRepository folderRepository)
        {
            this.folderRepository = folderRepository;
        }

        public async Task<Unit> Handle(AddFileCommand request, CancellationToken cancellationToken)
        {
            var mainFolder = await folderRepository.GetByUserId(request.UserId);

            if (request.Path == "Main")
            {
                mainFolder.Files.Add(new Database.Entities.File { DateCreated = DateTime.Now, DateModified = DateTime.Now, Name = request.FileName });
                await folderRepository.Update(mainFolder);
                return Unit.Value;
            }

            var folder = GetFolderCommandHandler.GetFolderByPath(request.Path, mainFolder) ?? throw new Exception();

            folder.Files.Add(new Database.Entities.File { DateCreated = DateTime.Now, DateModified = DateTime.Now, Name = request.FileName });
            await folderRepository.Update(folder);

            return Unit.Value;
        }
    }
}
