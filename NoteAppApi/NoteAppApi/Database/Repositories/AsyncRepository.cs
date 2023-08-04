using Microsoft.EntityFrameworkCore;
using NoteAppApi.Database.Entities;
using NoteAppApi.Database.Interfaces;

namespace NoteAppApi.Database.Repositories
{
    public class AsyncRepository<T> : IAsyncRepository<T> where T : BaseEntity
    {
        public readonly NoteAppDbContext context;
        public AsyncRepository(NoteAppDbContext context)
        {
            this.context = context;
        }

        public async Task<T?> GetAsync(int id) => await context.Set<T>().FirstOrDefaultAsync(x => x.Id == id);
        public async Task<List<T>> GetAllAsync() => await context.Set<T>().ToListAsync();
        public async Task DeleteAsync(T entity)
        {
            context.Set<T>().Remove(entity);
            await context.SaveChangesAsync();
        }
        public async Task<T> AddAsync(T entity)
        {
            var added = await context.Set<T>().AddAsync(entity);
            await context.SaveChangesAsync();

            return added.Entity;
        }
        public async Task Update(T entity)
        {
            context.Set<T>().Update(entity);
            await context.SaveChangesAsync();
        }
    }
}
