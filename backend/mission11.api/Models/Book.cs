﻿//Drew Christensen Section 3

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace mission11.API.Models
{
    [Table("Books")]
    public class Book
    {
        [Key]
        [Column("BookID")]
        public int BookID { get; set; }

        [Required]
        [Column("Title")]
        public string Title { get; set; } = string.Empty;

        [Required]
        [Column("Author")]
        public string Author { get; set; } = string.Empty;

        [Required]
        [Column("Publisher")]
        public string Publisher { get; set; } = string.Empty;

        [Required]
        [Column("ISBN")]
        public string ISBN { get; set; } = string.Empty;

        [Column("Classification")]
        public string Classification { get; set; } = string.Empty;

        [Column("Category")]
        public string Category { get; set; } = string.Empty;

        [Required]
        [Column("PageCount")]
        public int PageCount { get; set; }

        [Required]
        [Column("Price")]
        public decimal Price { get; set; }
    }
}
