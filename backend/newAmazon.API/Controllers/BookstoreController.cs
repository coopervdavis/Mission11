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
[HttpPost("AddBook")]
    public IActionResult AddBook([FromBody] Book book)
    {
        _context.Books.Add(book);
        _context.SaveChanges();
        return Ok(book);
    }
    [HttpPut("UpdateBook/{bookId}")]
    public IActionResult UpdateBook([FromBody] Book book, int bookId)
    {
        var existingBook = _context.Books.Find(bookId);
        existingBook.Title = book.Title;
        existingBook.Category = book.Category;
        existingBook.Price = book.Price;
        existingBook.Author = book.Author;
        existingBook.Publisher = book.Publisher;
        existingBook.ISBN = book.ISBN;
        existingBook.Classification = book.Classification;
        existingBook.Category = book.Category;
        existingBook.PageCount = book.PageCount;
        existingBook.Price = book.Price;
        _context.Books.Update(existingBook);
        _context.SaveChanges();
        return Ok(existingBook);
    }
    [HttpDelete("DeleteBook/{bookId}")]
    public IActionResult DeleteBook(int bookId)
    {
        var book = _context.Books.Find(bookId);
        if (book == null)
        {
            return NotFound(new { message = "Book not found" });
        }
        _context.Books.Remove(book);
        _context.SaveChanges();
        return NoContent();
    }
}