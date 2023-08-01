using NoteAppApi.Database.Entities;
using NoteAppApi.Database.Interfaces;

namespace NoteAppApi.Database.Services
{
    public class UserContext : IUserContext
    {
        private readonly IHttpContextAccessor httpContext;
        private readonly IUserRepository userRepository;

        public UserContext(IHttpContextAccessor httpContext, IUserRepository userRepository)
        {
            this.httpContext = httpContext;
            this.userRepository = userRepository;
        }

        public async Task<User?> GetCurrentUser()
        {
            var userId = ValidateUser();
            return await userRepository.GetAsync(userId);
        }

        public void LoginUser(int userId)
        {
            if (httpContext.HttpContext == null) throw new Exception();
            httpContext.HttpContext.Response.Cookies.Append("userId", userId.ToString());
        }

        private int ValidateUser()
        {
            //throw exception if not passeed
            //implement later
            //var auth = (httpContext.HttpContext?.Session.GetString("authKey")) ?? throw new UnauthorizedAccessException();

            //wont be null because above one passed
            var id = (httpContext.HttpContext?.Request.Cookies["userId"]) ?? throw new UnauthorizedAccessException();
            return int.Parse(id);
        }
    }
}
