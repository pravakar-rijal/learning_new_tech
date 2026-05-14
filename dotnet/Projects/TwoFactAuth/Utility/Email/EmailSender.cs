using System.Net;
using System.Net.Mail;

namespace TwoFactAuth.Utility.Email
{
    public class EmailSender : IEmailSender
    {
        private readonly IConfiguration _configuration;
        public EmailSender(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task SendEmailAsync(string from,string to, string subject, string body)
        {
            var message = new MailMessage(from, to, subject, body);

            using (var emailClient = new SmtpClient(_configuration["SMTP:Host"], int.Parse(_configuration["SMTP:Port"])))
            {
                emailClient.Credentials = new NetworkCredential(_configuration["SMTP:User"], _configuration["SMTP:Password"]);

                await emailClient.SendMailAsync(message);
            }

            return;
        }
    }
}
