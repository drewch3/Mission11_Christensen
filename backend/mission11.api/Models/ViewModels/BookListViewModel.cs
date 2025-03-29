using System.Collections.Generic;
using mission11.API.Models;

namespace mission11.API.Models.ViewModels
{
    public class BookListViewModel
    {
        public IEnumerable<Book> Books { get; set; } = new List<Book>();
        public string CurrentCategory { get; set; } = string.Empty;
    }
}
