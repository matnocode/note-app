using Microsoft.AspNetCore.Mvc;
using NoteAppApi.Commands.Tests.AddTests;
using NoteAppApi.Commands.Tests.GetTests;

namespace NoteAppApi.Controllers
{
    [ApiController]
    public class TestController : ApiController
    {
        [HttpGet]
        public async Task<ActionResult> AddTest([FromQuery] AddTestCommand command) => await SendMessage(command);

        [HttpGet]
        public async Task<ActionResult> GetTests([FromRoute] GetTestsCommand command) => await SendMessage(command);
    }
}

