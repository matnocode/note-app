using Microsoft.EntityFrameworkCore;
using NoteAppApi.Database.Entities;
using NoteAppApi.Database.Interfaces;

namespace NoteAppApi.Database.Repositories
{
    public class UserRepository : AsyncRepository<User>, IUserRepository
    {
        public UserRepository(NoteAppDbContext context) : base(context)
        {
        }

        public async Task<User> GetByUsernameAndPassword(string username, string password)
        {
            return await context.Users.Where(x => x.Name == username && x.Password == password).FirstAsync();
        }
    }
}
