//Drew Christensen Seciton 3

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

       [HttpGet]
public async Task<IActionResult> GetBooks(
    [FromQuery] int pageNumber = 1,
    [FromQuery] int pageSize = 5,
    [FromQuery] string? sortBy = "Title",
    [FromQuery] string sortOrder = "asc")
{
    if (pageNumber < 1) pageNumber = 1;
    if (pageSize < 1) pageSize = 1;

    IQueryable<Book> query = _context.Books.AsQueryable();

    // Sorting logic
    if (!string.IsNullOrEmpty(sortBy) && sortBy.Equals("Title", StringComparison.OrdinalIgnoreCase))
    {
        query = sortOrder == "desc" ? query.OrderByDescending(b => b.Title) : query.OrderBy(b => b.Title);
    }
    else
    {
        query = query.OrderBy(b => b.BookID);
    }

    var totalRecords = await query.CountAsync();
    var books = await query
        .Skip((pageNumber - 1) * pageSize)  // ✅ Apply correct pagination
        .Take(pageSize)
        .ToListAsync();

    return Ok(new
    {
        totalRecords,
        pageNumber,
        pageSize,
        books
        });}

    }}