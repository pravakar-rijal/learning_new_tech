using System.ComponentModel.DataAnnotations;
using System.Security.Claims;
using IdentityWebApp.DTOs;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace IdentityWebApp.Pages.Account
{
    public class LoginModel : PageModel
    {
        [BindProperty]
        public Credential Credential { get; set; } = new();
        public void OnGet()
        {
        }

        public async Task<IActionResult> OnPostAsync()
        {
            if (!ModelState.IsValid) return Page();

            if(Credential.Username == "admin" && Credential.Password == "admin123")
            {
                var claims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name, Credential.Username),
                    new Claim(ClaimTypes.Email, "admin@pravkarrijal.com.np"),
                    new Claim(ClaimTypes.Role, "Admin"),
                    new Claim("Department", "HR"),
                    new Claim("Manager", "true"),
                    new Claim("EmploymentDate", "2024-01-01")
                };

                var identity = new ClaimsIdentity(claims, "MyCookieAuth");
                ClaimsPrincipal claimsPrincipal = new ClaimsPrincipal(identity);

                var authProperties = new AuthenticationProperties
                {
                    IsPersistent = Credential.RememberMe,
                };

                await HttpContext.SignInAsync("MyCookieAuth", claimsPrincipal, authProperties);

                return RedirectToPage("/Index");
            }

            return Page();

        }
    }
}
