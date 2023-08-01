namespace NoteAppApi.Database.Entities
{
    public class File : BaseEntity
    {
        public string? Content { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }
        public string? Name { get; set; }
    }
}
