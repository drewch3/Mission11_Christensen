using System.Collections.Generic;
using System.Linq;

namespace mission11.API.Models.ViewModels
{
    public class CartViewModel
    {
        public List<CartItem> Items { get; set; } = new();
        public decimal CartTotal => Items.Sum(i => i.Book.Price * i.Quantity);
    }
}
