using MediatR;
using NoteAppApi.Database.Entities;
using NoteAppApi.Database.Interfaces;

namespace NoteAppApi.Commands.Users.RegisterUser
{
    public class RegisterUserCommand : IRequest<int>
    {
        public string Username { get; set; } = "";
        public string Password { get; set; } = "";
    }

    public class RegisterUserCommandHandler : IRequestHandler<RegisterUserCommand, int>
    {
        private readonly IUserRepository userRepository;

        public RegisterUserCommandHandler(IUserRepository userRepository)
        {
            this.userRepository = userRepository;
        }

        public async Task<int> Handle(RegisterUserCommand request, CancellationToken cancellationToken)
        {
            var folder = new Database.Entities.Folder { DateCreated = DateTime.Now, DateModified = DateTime.Now, Name = "Main" };
            var user = await userRepository.AddAsync(new User { Name = request.Username, Password = request.Password, Folder = folder });
            return user.Id;
        }
    }
}
