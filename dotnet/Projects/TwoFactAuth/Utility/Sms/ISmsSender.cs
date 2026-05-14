namespace TwoFactAuth.Utility.Email
{
    public interface ISmsSender
    {
        Task SendSmsAsync(string to, string body);
    }
}
