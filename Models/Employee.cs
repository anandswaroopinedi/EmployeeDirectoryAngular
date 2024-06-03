using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;

namespace Models
{
    public class Employee
    {

        public string Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }

        public string DateOfBirth { get; set; }
        public string Email { get; set; }
        public string MobileNumber { get; set; }
        public string JoinDate { get; set; }
        public string JobTitle { get; set; }
        public string Location { get; set; }
        public string Department { get; set; }

        public string ManagerId { get; set; }
        public string Project { get; set; }
        public Status Status { get; set; }
    }
}
