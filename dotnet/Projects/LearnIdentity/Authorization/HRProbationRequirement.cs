using Microsoft.AspNetCore.Authorization;

namespace IdentityWebApp.Authorization
{
    public class HRProbationRequirement : IAuthorizationRequirement
    {
        public int ProbationMonths { get; set; }

        public HRProbationRequirement(int probationMonths)
        {
            ProbationMonths = probationMonths;
        }

    }

    public class HRProbationRequirementHandler : AuthorizationHandler<HRProbationRequirement>
    {
        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, HRProbationRequirement requirement)
        {
            if(!context.User.HasClaim(c => c.Type == "EmploymentDate"))
            {
                return Task.CompletedTask;
            }

            if(DateTime.TryParse(context.User.FindFirst(x => x.Type == "EmploymentDate")?.Value, out DateTime employmentDate))
            {
                var period = DateTime.Now - employmentDate;

                if(period.Days > 30 * requirement.ProbationMonths)
                {
                    context.Succeed(requirement);
                }
            }

            return Task.CompletedTask;
        }
    }
}
