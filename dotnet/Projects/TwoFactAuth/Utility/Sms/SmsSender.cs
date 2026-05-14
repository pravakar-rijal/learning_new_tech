using System.Net;
using Twilio;
using Twilio.Rest.Api.V2010.Account;

namespace TwoFactAuth.Utility.Email
{
    public class SmsSender : ISmsSender
    {
        private readonly IConfiguration _configuration;
        public SmsSender(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task SendSmsAsync(string to, string body)
        {

            TwilioClient.Init(_configuration["SMS:SID"], _configuration["SMS:AuthToken"]);

            await MessageResource.CreateAsync(
                to: to,
                from: _configuration["SMS:PhoneNumber"],
                body: body
                );

            return;
        }
    }
}
