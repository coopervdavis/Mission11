import { useEffect, useState } from "react"
import {Book} from "./types/Book"

function BookList({selectedCategories}: {selectedCategories: string[]}) {

    const [books, setBooks] = useState<Book[]>([]);

    const [pageSize, setPageSize] = useState<number>(5);

    const [pageNum, setPageNum] = useState<number>(1);

    const [totalItems, setTotalItems] = useState<number>(0);

    const [totalPages, setTotalPages] = useState<number>(0);

    const [sortDescending, setSortDescending] = useState<boolean>(false);

    useEffect(() => {
        const fetchBooks = async () => {

            const categoryParams = selectedCategories.map((cat) => `category=${encodeURIComponent(cat)}`).join('&')

            const response = await fetch(`https://localhost:5000/api/bookstore?pageSize=${pageSize}&pageNum=${pageNum}&sortDescending=${sortDescending}${selectedCategories.length ? `&${categoryParams}` : ''}`);
            const data = await response.json();
            setBooks(data.books);
            setTotalItems(data.totalNumBooks);
            setTotalPages(Math.ceil(data.totalNumBooks / pageSize)); // Fix here
        };
        fetchBooks();
    
    }, [pageSize, pageNum, sortDescending, selectedCategories]); // add sortDescending to the dependency array
    
    

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
            <div id="bookCard" className="card" key={b.bookId}>
                <h3 className="card-title">{b.title}</h3>
                <div className="card-body">
                <ul className="list-unstyled">
                    <li><strong>Author:</strong> {b.author}</li>
                    <li><strong>Publisher:</strong> {b.publisher}</li>
                    <li><strong>ISBN:</strong> {b.isbn}</li>
                    <li><strong>Classification/Category:</strong> {b.category}</li>
                    <li><strong>Number of Pages:</strong> {b.pageCount}</li>
                    <li><strong>Price:</strong> {b.price}</li>
                </ul>
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