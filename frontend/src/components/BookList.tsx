import { useEffect, useState } from "react"
import {Book} from "../types/Book"
import { useNavigate } from "react-router-dom";
import { fetchBooks } from "../api/BooksApi";

function BookList({selectedCategories}: {selectedCategories: string[]}) {

    const [books, setBooks] = useState<Book[]>([]);

    const [pageSize, setPageSize] = useState<number>(5);

    const [pageNum, setPageNum] = useState<number>(1);

    const [, setTotalItems] = useState<number>(0);

    const [totalPages, setTotalPages] = useState<number>(0);

    const [sortDescending, setSortDescending] = useState<boolean>(false);

    const [error, setError] = useState<string | null>(null);

    const [loading, setLoading] = useState(true)

    const navigate = useNavigate();

    useEffect(() => {
        const loadProjects = async () => {
        try {
                setLoading(true);
                const data = await fetchBooks(pageSize, pageNum, selectedCategories, sortDescending)
            
            setBooks(data.books);
            setTotalItems(data.totalNumBooks);
            setTotalPages(Math.ceil(data.totalNumBooks / pageSize)); // Fix here
        }
        catch (error) {
            setError((error as Error).message)

        }
        finally {
            setLoading(false)
        }
        };
        loadProjects();
    
    }, [pageSize, pageNum, sortDescending, selectedCategories]); // add sortDescending to the dependency array
    
    if (loading) return <p>Loading....</p>
    if (error) return <p>Error: {error}</p>
    return (
        <>

        <label>
            Sort Title By: 
            <select 
                value={sortDescending ? "Descending" : "Ascending"} 
                onChange={(e) => {
                    const isDescending = e.target.value === "Descending";
                    setSortDescending(isDescending);  // Update sortDescending state
                    setPageNum(1);  // Reset to page 1
                }}
            >
                <option>Ascending</option>
                <option>Descending</option>
            </select>
        </label>
        <br />
        {books.map((b) =>
            <div
  id="bookCard"
  className="card mb-4 shadow-sm h-100"
  key={b.bookId}
  style={{ borderRadius: '1rem' }}
>
  <div className="card-body text-center d-flex flex-column justify-content-between">
    {/* Title */}
    <h4 className="card-title fw-bold mb-3">{b.title}</h4>

    {/* Book Info */}
    <ul className="list-unstyled text-start mb-4">
      <li><strong>Author:</strong> {b.author}</li>
      <li><strong>Publisher:</strong> {b.publisher}</li>
      <li><strong>ISBN:</strong> {b.isbn}</li>
      <li><strong>Classification/Category:</strong> {b.category}</li>
      <li><strong>Number of Pages:</strong> {b.pageCount}</li>
      <li><strong>Price:</strong> ${b.price.toFixed(2)}</li>
    </ul>

    {/* Buy Button */}
    <button
      className="btn btn-primary mt-auto"
      onClick={() => navigate(`/buy/${b.title}/${b.bookId}/${b.price}`)}
    >
      Buy
    </button>
  </div>
</div>

    
        )}

        <button disabled={pageNum===1} onClick={()=> setPageNum(pageNum-1)}>Previous</button>
            {/* this is how we add buttons dynamically */}
            {[...Array(totalPages)].map((_, index) => (
                <button key={index +1} onClick={()=> setPageNum(index+1)} disabled={pageNum === (index + 1)}>
                    {index + 1}
                </button>
            ))}
        <button disabled={pageNum===totalPages} onClick={()=> setPageNum(pageNum+1)}>Next</button>

        <br />
        <label>
            Results per page:
            <select value={pageSize} onChange={(b)=> {setPageSize(Number(b.target.value));
                setPageNum(1);
                }}>
                <option>5</option>
                <option>10</option>
                <option>15</option>
            </select>
        </label>
        </>
    )
}

export default BookList