﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models
{
    public class Department
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
}
