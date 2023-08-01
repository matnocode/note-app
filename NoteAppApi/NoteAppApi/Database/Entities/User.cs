namespace NoteAppApi.Database.Entities
{
    public class User : BaseEntity
    {
        //main folder Id
        public int FolderId { get; set; }
        public string Name { get; set; }
        public string Password { get; set; }

        public Folder Folder { get; set; }
    }
}
