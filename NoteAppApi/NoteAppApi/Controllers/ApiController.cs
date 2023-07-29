using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace NoteAppApi.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class ApiController : ControllerBase
    {
        private IMediator _mediator;
        private IMediator mediator => _mediator ?? HttpContext.RequestServices.GetRequiredService<IMediator>();

        public async Task<ActionResult> SendMessage<TResponse>(IRequest<TResponse> request)
        {
            try
            {
                var response = await mediator.Send(request);
                return Ok(response);
            }

            catch (Exception e)
            {
                return BadRequest(e);
            }

        }
    }
}
