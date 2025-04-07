using Microsoft.AspNetCore.Mvc;
using newAmazon.API.Data;

namespace newAmazon.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class BookstoreController : ControllerBase
{
    private BookstoreDbContext _context;

    public BookstoreController(BookstoreDbContext temp)
    {
        _context = temp;
    }

    public IActionResult Get(int pageSize = 10, int pageNum = 1, bool sortDescending = false, [FromQuery] List<string> category = null)
    {
        var booksQuery = _context.Books.AsQueryable();

        booksQuery = sortDescending
            ? booksQuery.OrderByDescending(b => b.Title)
            : booksQuery.OrderBy(b => b.Title);

        if (category != null && category.Any())
        {
            booksQuery = booksQuery.Where(b => category.Contains(b.Category));
        }

        var something = booksQuery
            .Skip((pageNum - 1) * pageSize)
            .Take(pageSize)
            .ToList();

        var totalNumBooks = booksQuery.Count();

        return Ok(new
        {
            Books = something,
            TotalNumBooks = totalNumBooks
        });
    }
[HttpGet("GetBookCategory")]
    public IActionResult GetBookCategory()
    {
        var booksQuery = _context.Books.Select(q => q.Category).Distinct().ToList();
        
        return Ok(booksQuery);
    }

}