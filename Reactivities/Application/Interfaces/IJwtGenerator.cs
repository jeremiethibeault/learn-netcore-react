using Domain;

namespace Application.Interfaces
{
    public interface IJwtGenerator
    {
        string CreateRefreshToken();
        
        string CreateToken(AppUser appUser);
    }
}