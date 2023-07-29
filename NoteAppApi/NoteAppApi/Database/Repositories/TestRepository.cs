using NoteAppApi.Database.Entities;
using NoteAppApi.Database.Interfaces;

namespace NoteAppApi.Database.Repositories
{
    public class TestRepository : AsyncRepository<Test>, ITestRepository
    {
        public TestRepository(NoteAppDbContext context) : base(context)
        {
        }
    }
}
