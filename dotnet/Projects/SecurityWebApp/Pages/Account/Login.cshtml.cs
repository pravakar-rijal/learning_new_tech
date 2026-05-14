using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using SecurityWebApp.DTOs;

namespace SecurityWebApp.Pages.Account
{
    public class LoginModel : PageModel
    {
        public SignInManager<IdentityUser> SignInManager { get; set; }
        public LoginModel(SignInManager<IdentityUser> signInManager)
        {
            SignInManager = signInManager;
        }

        [BindProperty]
        public LoginViewModel LoginViewModel { get; set; } = new LoginViewModel();

        public void OnGet()
        {

        }

        public async Task<IActionResult> OnPostAsync()
        {
            if(!ModelState.IsValid) return Page();


            var result = await SignInManager.PasswordSignInAsync(LoginViewModel.Email, LoginViewModel.Password, LoginViewModel.RememberMe, false);

            if (result.Succeeded)
            {
                return RedirectToPage("/Index");
            }
            else
            {
                if (result.IsLockedOut)
                {
                    ModelState.AddModelError("Login", "You are locked out");
                }
                else
                {
                    ModelState.AddModelError("Login", "Failed to Login");
                }
            }

            return Page();
        }
    }
}
