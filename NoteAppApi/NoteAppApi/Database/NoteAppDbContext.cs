using Microsoft.EntityFrameworkCore;
using NoteAppApi.Database.Entities;

namespace NoteAppApi.Database
{
    public class NoteAppDbContext : DbContext
    {
        public NoteAppDbContext(DbContextOptions options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Test>().ToTable("Tests");

            base.OnModelCreating(modelBuilder);
        }

        public DbSet<Test> Tests;
    }
}
