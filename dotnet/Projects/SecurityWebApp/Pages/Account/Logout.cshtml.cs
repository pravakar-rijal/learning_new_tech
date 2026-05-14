using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace SecurityWebApp.Pages.Account
{
    public class LogoutModel : PageModel
    {
        public SignInManager<IdentityUser> SignInManager { get; set; }
        public LogoutModel(SignInManager<IdentityUser> signInManager)
        {
            SignInManager = signInManager;
        }
        public void OnGet()
        {
        }

        public async Task<IActionResult> OnPostAsync()
        {
            await SignInManager.SignOutAsync();
            return RedirectToPage("/Account/Login");
        }
    }
}
