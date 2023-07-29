using MediatR;
using Microsoft.AspNetCore.Mvc;
using NoteAppApi.Database.Entities;
using NoteAppApi.Database.Interfaces;

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

    public class AddTestCommand : IRequest<Unit>
    {
        public string Content { get; set; }
    }

    public class AddTestCommandHandler : IRequestHandler<AddTestCommand, Unit>
    {
        private readonly ITestRepository testRepository;

        public AddTestCommandHandler(ITestRepository testRepository)
        {
            this.testRepository = testRepository;
        }

        public async Task<Unit> Handle(AddTestCommand request, CancellationToken cancellationToken)
        {
            await testRepository.AddAsync(new Test { Text = request.Content });
            return Unit.Value;
        }
    }

    public class GetTestsCommand : IRequest<List<Test>>
    {
    }

    public class GetTestsCommandHandler : IRequestHandler<GetTestsCommand, List<Test>>
    {
        private readonly ITestRepository testRepository;

        public GetTestsCommandHandler(ITestRepository testRepository)
        {
            this.testRepository = testRepository;
        }

        public async Task<List<Test>> Handle(GetTestsCommand request, CancellationToken cancellationToken)
        {
            return await testRepository.GetAllAsync();

        }
    }
}

