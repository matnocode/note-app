using MediatR;
using NoteAppApi.Database.Interfaces;

namespace NoteAppApi.Commands.Files.SaveFileContent
{
    public class SaveFileContentCommand : IRequest<Unit>
    {
        public int UserId { get; set; }
        public string Path { get; set; } = "";
        public string Content { get; set; } = "";
    }

    public class SaveFileContentCommandHandler : IRequestHandler<SaveFileContentCommand, Unit>
    {
        private readonly IFolderRepository folderRepository;
        private readonly IFileRepository fileRepository;

        public SaveFileContentCommandHandler(IFolderRepository folderRepository, IFileRepository fileRepository)
        {
            this.folderRepository = folderRepository;
            this.fileRepository = fileRepository;
        }

        public async Task<Unit> Handle(SaveFileContentCommand request, CancellationToken cancellationToken)
        {
            var mainFolder = await folderRepository.GetByUserId(request.UserId);
            var file = Folder.GetFolder.GetFolderCommandHandler.GetFileByPath(request.Path ?? "Main", mainFolder) ?? throw new Exception();
            file.Content = request.Content;
            await fileRepository.Update(file);

            return Unit.Value;
        }
    }
}
