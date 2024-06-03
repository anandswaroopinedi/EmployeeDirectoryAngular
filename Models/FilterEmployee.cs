using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models
{
    public class FilterEmployee
    {
        public string Alphabet { set; get; }
        public int[] Locations {  set; get; }
        public int[] Departments { set; get; }
        public int[] Statuses { set; get; }
    }
}
