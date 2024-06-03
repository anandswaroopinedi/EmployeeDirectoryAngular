using AspWebApi.Controllers;
using FluentValidation;
using Models;
using System.Runtime.CompilerServices;

namespace AspWebApi.Validations
{
    public class EmployeeValidator : AbstractValidator<Employee>
    {
        public EmployeeValidator() 
        {
            RuleSet("id", () =>
            {
                RuleFor(std => std.Id).NotNull().When(x => x.Id != null).WithMessage("id must be null because there is a auto mapper");
            });
            RuleSet("FirstName,LastName", () =>
            {
                RuleFor(std => std.FirstName).NotNull().Matches( "@\"^[a-zA-Z]+$\"").WithMessage("First Name can't be null and must contains only alpha characters");
            });
            RuleSet("DateOfBirth", () =>
            {
                RuleFor(std => std.DateOfBirth).Must(BeAValidDate).WithMessage("Date is not in correct format");
            });
            RuleSet("email", () =>
            {
                RuleFor(std => std.Email).NotNull().EmailAddress().WithMessage("please enter correct email");
            });
            RuleSet("JoiningDate", () =>
            {
                RuleFor(std => std.JoinDate).Must(BeAValidDate).WithMessage("Date is not in correct format");
            });
        }
        private bool BeAValidDate(string value)
        {
            DateTime date;
            return DateTime.TryParse(value, out date);
        }
    }
}
