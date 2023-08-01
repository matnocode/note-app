using Microsoft.AspNetCore.Mvc;
using NoteAppApi.Commands.Folder.AddFolder;
using NoteAppApi.Commands.Folder.GetFolder;

namespace NoteAppApi.Controllers
{
    public class FolderController : ApiController
    {
        [HttpGet]
        public async Task<ActionResult> GetFolder([FromQuery] GetFolderCommand command) => await SendMessage(command);

        [HttpGet]
        public async Task<ActionResult> AddFolder([FromQuery] AddFolderCommand command) => await SendMessage(command);
    }
}
