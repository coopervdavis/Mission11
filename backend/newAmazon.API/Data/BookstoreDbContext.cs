using Microsoft.EntityFrameworkCore;

namespace newAmazon.API.Data;

public class BookstoreDbContext : DbContext
{
    public BookstoreDbContext(DbContextOptions<BookstoreDbContext> options) : base(options)
    {
        
    }
    
    public DbSet<Book> Books { get; set; }
}