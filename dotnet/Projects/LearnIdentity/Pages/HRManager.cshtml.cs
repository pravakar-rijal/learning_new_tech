using System.Net.Http.Headers;
using IdentityWebApp.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.DataProtection.AuthenticatedEncryption.ConfigurationModel;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Newtonsoft.Json;

namespace IdentityWebApp.Pages
{
    [Authorize(Policy = "HRManagerOnly")]
    public class HRManagerModel : PageModel
    {
        private readonly IHttpClientFactory _httpClientFactory;

        [BindProperty]
        public List<WeatherForecast> weatherForecasts {  get; set; } = new List<WeatherForecast>();

        public HRManagerModel(IHttpClientFactory httpClientFactory)
        {
            _httpClientFactory = httpClientFactory;
        }

        public async Task<PageResult> OnGetAsync()
        {
            var client = _httpClientFactory.CreateClient("IdentityWebAPI");
            JwtToken token = new JwtToken();
            var strToken = HttpContext.Session.GetString("access_token");
            
            if(strToken == null || string.IsNullOrEmpty(strToken))
            {
                token = await Authenticate();
            }
            else
            {
                token = JsonConvert.DeserializeObject<JwtToken>(strToken) ?? new JwtToken();
            }

            if(token == null || string.IsNullOrWhiteSpace(token.AccessToken) || token.ExpiresAt < DateTime.UtcNow)
            {
                token = await Authenticate();
            }

            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token.AccessToken);
            weatherForecasts = await client.GetFromJsonAsync<List<WeatherForecast>>("WeatherForecast") ?? new List<WeatherForecast>();
            return Page();
        }

        private async Task<JwtToken> Authenticate()
        {
            var client = _httpClientFactory.CreateClient("IdentityWebAPI");
            var response = await client.PostAsJsonAsync("/api/Auth/Login", new Credential { Username = "admin", Password = "admin123" });
            response.EnsureSuccessStatusCode();
            string stringJwt = await response.Content.ReadAsStringAsync();
            HttpContext.Session.SetString("access_token", stringJwt);
            return JsonConvert.DeserializeObject<JwtToken>(stringJwt)?? new JwtToken();
        }
    }
}
