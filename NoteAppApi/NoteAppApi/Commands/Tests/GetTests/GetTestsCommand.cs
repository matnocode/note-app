using MediatR;
using NoteAppApi.Database.Entities;
using NoteAppApi.Database.Interfaces;

namespace NoteAppApi.Commands.Tests.GetTests
{
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
