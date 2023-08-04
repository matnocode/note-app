using MediatR;
using NoteAppApi.Database.Interfaces;

namespace NoteAppApi.Commands.Files.DeleteFile
{
    public class DeleteFileCommand : IRequest<Unit>
    {
        public int UserId { get; set; }
        public string Path { get; set; }
    }

    public class DeleteFileCommandHandler : IRequestHandler<DeleteFileCommand, Unit>
    {
        private readonly IFolderRepository folderRepository;
        private readonly IFileRepository fileRepository;

        public DeleteFileCommandHandler(IFolderRepository folderRepository, IFileRepository fileRepository)
        {
            this.folderRepository = folderRepository;
            this.fileRepository = fileRepository;
        }

        public async Task<Unit> Handle(DeleteFileCommand request, CancellationToken cancellationToken)
        {
            var mainFolder = await folderRepository.GetByUserId(request.UserId);
            var file = Folder.GetFolder.GetFolderCommandHandler.GetFileByPath(request.Path, mainFolder);
            if (file == null)
                throw new Exception();

            await fileRepository.DeleteAsync(file);

            return Unit.Value;
        }
    }
}
