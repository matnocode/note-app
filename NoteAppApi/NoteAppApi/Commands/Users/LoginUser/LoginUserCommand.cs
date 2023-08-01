using MediatR;
using NoteAppApi.Database.Interfaces;

namespace NoteAppApi.Commands.Users.LoginUser
{
    public class LoginUserCommand : IRequest<int>
    {
        public string Username { get; set; } = "";
        public string Password { get; set; } = "";
    }

    public class LoginUserCommandHandler : IRequestHandler<LoginUserCommand, int>
    {
        private readonly IUserRepository userRepository;

        public LoginUserCommandHandler(IUserRepository userRepository)
        {
            this.userRepository = userRepository;
        }

        public async Task<int> Handle(LoginUserCommand request, CancellationToken cancellationToken)
        {
            var user = await userRepository.GetByUsernameAndPassword(request.Username, request.Password);
            return user.Id;
        }
    }
}
