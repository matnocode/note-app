using Azure.Core;
using MediatR;
using Microsoft.EntityFrameworkCore.Query.Internal;
using NoteAppApi.Database.Entities;
using NoteAppApi.Database.Interfaces;

namespace NoteAppApi.Commands.Folder.GetFolder
{
    public class GetFolderCommand : IRequest<Database.Entities.Folder>
    {
        public string? Path { get; set; }
        public int UserId { get; set; }
    }

    //TODO get main user folder, then search specific by Path
    public class GetFolderCommandHandler : IRequestHandler<GetFolderCommand, Database.Entities.Folder>
    {
        private readonly IFolderRepository folderRepository;
        private readonly IUserContext userContext;

        public GetFolderCommandHandler(IFolderRepository folderRepository, IUserContext userContext)
        {
            this.folderRepository = folderRepository;
            this.userContext = userContext;
        }

        public async Task<Database.Entities.Folder> Handle(GetFolderCommand request, CancellationToken cancellationToken)
        {
            //var user = await userContext.GetCurrentUser() ?? throw new UnauthorizedAccessException();
            var mainFolder = await folderRepository.GetByUserId(request.UserId);
            return GetFolderByPath(request.Path ?? "main", mainFolder) ?? mainFolder;
        }

        public static Database.Entities.Folder? GetFolderByPath(string fullPath, Database.Entities.Folder mainFolder)
        {
            var pathArr = fullPath.Split('/');
            Database.Entities.Folder? foundFolder = null;
            var folderName = pathArr?[^1];

            if (folderName == null)
                return null;

            if (fullPath == "Main")
                return mainFolder;

            FindRecursively(mainFolder, folderName, fullPath, ref foundFolder);

            return foundFolder;
        }

        private static void FindRecursively(Database.Entities.Folder folder, string folderName, string fullPath, ref Database.Entities.Folder setFolder)
        {
            foreach (var f in folder.Folders)
            {
                if (!fullPath.Contains(f.Name))
                    continue;

                if (f.Name == folderName)
                {
                    setFolder = f;
                    break;
                }

                if (f.Folders.Count > 0)
                    FindRecursively(f, folderName, fullPath, ref setFolder);

                if (setFolder != null)
                    break;
            }
        }

        public static Database.Entities.File? GetFileByPath(string fullPath, Database.Entities.Folder mainFolder)
        {
            var pathArr = fullPath.Split('/');
            Database.Entities.Folder? foundFolder = null;
            Database.Entities.File? foundFile = null;
            string? folderName;
            string? fileName;

            try
            {
                folderName = pathArr[^2];
                fileName = pathArr[^1];
            }
            catch
            {
                folderName = "Main";
                fileName = fullPath;
            }

            if (folderName != "Main")
                foundFolder = GetFolderByPath(folderName, mainFolder);
            else
                foundFolder = mainFolder;

            if (foundFolder == null) return null;

            foreach (var file in foundFolder.Files)
                if (file.Name == fileName)
                    foundFile = file;

            return foundFile;
        }
    }
}
