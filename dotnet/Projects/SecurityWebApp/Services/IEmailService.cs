
namespace SecurityWebApp.Services
{
    public interface IEmailService
    {
        Task SendAsync(string from, string to, string subject, string body);
    }
}