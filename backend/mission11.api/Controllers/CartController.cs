//drew section 3

using Microsoft.AspNetCore.Mvc;
using mission11.API.Models;
using mission11.API.Models.ViewModels;
using mission11.API.Data;
using mission11.API.Helpers;
using System.Linq;

namespace mission11.API.Controllers
{
    public class CartController : Controller
    {
        private BookstoreContext context;
        private const string SessionKey = "Cart";

        public CartController(BookstoreContext ctx)
        {
            context = ctx;
        }

        public IActionResult Index()
        {
            var cart = HttpContext.Session.GetObjectFromJson<List<CartItem>>(SessionKey) ?? new List<CartItem>();
            foreach (var item in cart)
            {
                item.Book = context.Books.FirstOrDefault(b => b.BookID == item.BookId) ?? new Book();
            }
            return View(new CartViewModel { Items = cart });
        }

        public IActionResult AddToCart(int id, string returnUrl)
        {
            var cart = HttpContext.Session.GetObjectFromJson<List<CartItem>>(SessionKey) ?? new List<CartItem>();
            var item = cart.FirstOrDefault(i => i.BookId == id);

            if (item == null)
            {
                cart.Add(new CartItem { BookId = id, Quantity = 1 });
            }
            else
            {
                item.Quantity++;
            }

            HttpContext.Session.SetObjectAsJson(SessionKey, cart);
            return RedirectToAction("Index", new { returnUrl });
        }
    }
}
