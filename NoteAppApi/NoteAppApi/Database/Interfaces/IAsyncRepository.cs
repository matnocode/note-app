using NoteAppApi.Database.Entities;

namespace NoteAppApi.Database.Interfaces
{
    public interface IAsyncRepository<T> where T : BaseEntity
    {
        Task<T?> GetAsync(int id);
        Task DeleteAsync(int id);
        Task AddAsync(T entity);
        Task Update(T entity);
        Task<List<T>> GetAllAsync();
    }
}
