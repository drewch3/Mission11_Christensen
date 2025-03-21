//Drew Christensen Seciton 3

using Microsoft.EntityFrameworkCore;
using mission11.API.Models;

namespace mission11.API.Data
{
    public class BookstoreContext : DbContext
    {
        public BookstoreContext(DbContextOptions<BookstoreContext> options)
            : base(options)
        {
        }

        public DbSet<Book> Books { get; set; }
    }
}
