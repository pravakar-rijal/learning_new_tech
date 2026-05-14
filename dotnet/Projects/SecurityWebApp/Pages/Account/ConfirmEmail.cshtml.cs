using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace SecurityWebApp.Pages.Account
{
    public class ConfirmEmailModel : PageModel
    {
        public UserManager<IdentityUser> UserManager { get; set; }

        [BindProperty]
        public string Message { get; set; }

        public ConfirmEmailModel(UserManager<IdentityUser> userManager)
        {
            UserManager = userManager;    
        }
        public async Task<IActionResult> OnGetAsync(string userId, string token)
        {
            var user = await UserManager.FindByIdAsync(userId);

            if(user != null)
            {
                var result = await UserManager.ConfirmEmailAsync(user, token);
                if (result.Succeeded)
                {
                    this.Message = "Email is Confirmed. You can now login";
                    return Page();
                    //return RedirectToPage("/Account/Login");
                }
            }

            this.Message = "Failed to Validate Email";
            return Page();
        }
    }
}
