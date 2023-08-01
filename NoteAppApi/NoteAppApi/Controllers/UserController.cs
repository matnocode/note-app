using Microsoft.AspNetCore.Mvc;
using NoteAppApi.Commands.Users.LoginUser;
using NoteAppApi.Commands.Users.RegisterUser;

namespace NoteAppApi.Controllers
{
    public class UserController : ApiController
    {
        [HttpGet]
        public async Task<ActionResult> RegisterUser([FromQuery] RegisterUserCommand command) => await SendMessage(command);

        [HttpGet]
        public async Task<ActionResult> LoginUser([FromQuery] LoginUserCommand command) => await SendMessage(command);
    }
}
