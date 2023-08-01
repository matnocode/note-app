using Microsoft.EntityFrameworkCore;
using NoteAppApi.Database.Entities;
using File = NoteAppApi.Database.Entities.File;

namespace NoteAppApi.Database
{
    public class NoteAppDbContext : DbContext
    {
        public NoteAppDbContext(DbContextOptions options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }

        public DbSet<Folder> Folders { get; set; }
        public DbSet<File> Files { get; set; }
        public DbSet<User> Users { get; set; }
    }
}
