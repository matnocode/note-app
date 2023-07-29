using System.ComponentModel.DataAnnotations;

namespace NoteAppApi.Database.Entities
{
    public class BaseEntity
    {
        [Key]
        public int Id { get; set; }
    }
}
