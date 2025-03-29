// Drew Christensen Section 3

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using mission11.API.Data;
using mission11.API.Models;

namespace mission11.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private readonly BookstoreContext _context;

        public BooksController(BookstoreContext context)
        {
            _context = context;
        }

        // ✅ Get a paginated list of books with optional category and sorting
        [HttpGet]
        public async Task<IActionResult> GetBooks(
            [FromQuery] int pageNumber = 1,
            [FromQuery] int pageSize = 6,
            [FromQuery] string? sortBy = "Title",
            [FromQuery] string sortOrder = "asc",
            [FromQuery] string? category = null)
        {
            if (pageNumber < 1) pageNumber = 1;
            if (pageSize < 1) pageSize = 1;

            IQueryable<Book> query = _context.Books.AsQueryable();

            // ✅ Improved category filter
            if (!string.IsNullOrEmpty(category) && category != "All" && category != "undefined")
            {
                query = query.Where(b => b.Category == category);
            }

            // ✅ Apply sorting based on Title or BookID
            if (!string.IsNullOrEmpty(sortBy) && sortBy.Equals("Title", StringComparison.OrdinalIgnoreCase))
            {
                query = sortOrder == "desc"
                    ? query.OrderByDescending(b => b.Title)
                    : query.OrderBy(b => b.Title);
            }
            else
            {
                query = query.OrderBy(b => b.BookID);
            }

            // ✅ Get total record count before applying pagination
            var totalRecords = await query.CountAsync();

            // ✅ Apply pagination
            var books = await query
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return Ok(new
            {
                totalRecords,
                pageNumber,
                pageSize,
                books
            });
        }

        // ✅ Get distinct list of categories for filtering
        [HttpGet("categories")]
        public async Task<IActionResult> GetCategories()
        {
            var categories = await _context.Books
                .Select(b => b.Category)
                .Where(c => c != null)
                .Distinct()
                .OrderBy(c => c)
                .ToListAsync();

            return Ok(categories);
        }
    }
}
