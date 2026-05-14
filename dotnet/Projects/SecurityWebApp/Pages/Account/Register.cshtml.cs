using System.Net;
using System.Net.Mail;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using SecurityWebApp.DTOs;
using SecurityWebApp.Services;

namespace SecurityWebApp.Pages.Account
{
    public class RegisterModel : PageModel
    {
        public UserManager<IdentityUser> UserManager {  get; set; }

        private readonly IEmailService _emailService;

        public RegisterModel(UserManager<IdentityUser> userManager, IEmailService emailService)
        {
            UserManager = userManager;
            _emailService = emailService;
        }

        [BindProperty]
        public RegisterViewModel RegisterViewModel { get; set; } = new RegisterViewModel();

        public void OnGet()
        {
        }

        public async Task<IActionResult> OnPostAsync()
        {
            if(!ModelState.IsValid) return Page();

            //Validate Email if unique or not (Will be handled)

            //Create User
            var user = new IdentityUser
            {
                Email = RegisterViewModel.Email,
                UserName = RegisterViewModel.Email,
            };

            var result = await UserManager.CreateAsync(user, RegisterViewModel.Password);

            if(result.Succeeded)
            {
                var confirmationToken = await UserManager.GenerateEmailConfirmationTokenAsync(user);
                var confirmationLink = Url.PageLink(pageName: "/Account/ConfirmEmail", values: new { userId = user.Id, token = confirmationToken });

                await _emailService.SendAsync("pravakarrijal@gmail.com", user.Email, "Please Confirm Email", $"Please click on this link to confirm your email address: {confirmationLink}");

                return RedirectToPage("/Account/Login");
            }
            else
            {
                foreach(var error in  result.Errors)
                {
                    ModelState.AddModelError("Register", error.Description);
                }

                return Page();
            }
            


        }
    }
}
