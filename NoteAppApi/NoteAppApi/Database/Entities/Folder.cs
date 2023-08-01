namespace NoteAppApi.Database.Entities
{
    public class Folder : BaseEntity
    {
        public string? Name { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }
        public HashSet<File> Files { get; set; } = new HashSet<File>();
        public HashSet<Folder> Folders { get; set; } = new HashSet<Folder>();
    }
}
