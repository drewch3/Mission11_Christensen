using mission11.API.Models;

namespace mission11.API.Models
{
    public class CartItem
    {
        public int BookId { get; set; }
        public Book Book { get; set; } = new Book(); // ✅ Avoid null warnings
        public int Quantity { get; set; }
    }
}
