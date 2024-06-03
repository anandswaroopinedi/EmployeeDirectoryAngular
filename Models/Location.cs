using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models
{
    public class Location
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
}
