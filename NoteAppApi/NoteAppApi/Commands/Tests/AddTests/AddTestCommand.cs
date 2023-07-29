using MediatR;
using NoteAppApi.Database.Entities;
using NoteAppApi.Database.Interfaces;

namespace NoteAppApi.Commands.Tests.AddTests
{
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
}
