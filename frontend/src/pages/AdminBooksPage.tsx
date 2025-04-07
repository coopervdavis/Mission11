import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DeleteBook, fetchBooks } from "../api/BooksApi";
import { Book } from "../types/Book";
import NewBookForm from "../components/NewBookForm";
import EditBookForm from "../components/EditProjectForm";

const AdminBooksPage = () => {
    const [books, setBooks] = useState<Book[]>([]);

    const [pageSize, setPageSize] = useState<number>(5);

    const [pageNum, setPageNum] = useState<number>(1);

    const [totalItems, setTotalItems] = useState<number>(0);

    const [totalPages, setTotalPages] = useState<number>(0);

    const [sortDescending, setSortDescending] = useState<boolean>(false);

    const [error, setError] = useState<string | null>(null);

    const [loading, setLoading] = useState(true)

    const [showForm, setShowForm] = useState(false)

    const [editingBook, setEditingBook] = useState<Book | null>(null);

    const navigate = useNavigate();

    useEffect(() => {
        const loadProjects = async () => {
        try {
                setLoading(true);
                const data = await fetchBooks(pageSize, pageNum, [], sortDescending)
            
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
    
    }, [pageSize, pageNum, sortDescending]); // add sortDescending to the dependency array
    if (loading) return <p>Loading....</p>
    if (error) return <p>Error: {error}</p>


    const handleDelete = async (bookId: number) => {
        const confirmDelete = window.confirm('Are you sure you want to delete');
        if (!confirmDelete) return;
        try {
            await DeleteBook(bookId)
            setBooks(books.filter((b) => b.bookId !== bookId))
        }
        catch(error)
        {throw error}
    }

    return (
<>
  <h1>Admin Page</h1>

        {!showForm && (
            <button className="btn btn-success" onClick={() => setShowForm(true)}>Add Project</button>
        )}




  {showForm && (
  <NewBookForm
    onSuccess={() => {
      setShowForm(false);
      fetchBooks(pageNum, pageSize, [], sortDescending)
        .then((data) => setBooks(data.books));
    }}
    onCancel={() => setShowForm(false)}
  />
)}


{editingBook && (
  <EditBookForm
    book={editingBook}
    onSuccess={() => {
      setEditingBook(null);
      fetchBooks(pageNum, pageSize, [], sortDescending)
        .then((data) => setBooks(data.books));
    }}
    onCancel={() => setEditingBook(null)}
  />
)}



  <table className="table table-striped">
    <thead>
      <tr>
        <th>Title</th>
        <th>Author</th>
        <th>Publisher</th>
        <th>ISBN</th>
        <th>Category</th>
        <th>Pages</th>
        <th>Price</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {books.map((b) => (
        <tr key={b.bookId}>
          <td>{b.title}</td>
          <td>{b.author}</td>
          <td>{b.publisher}</td>
          <td>{b.isbn}</td>
          <td>{b.category}</td>
          <td>{b.pageCount}</td>
          <td>${b.price.toFixed(2)}</td>
          <td>
            <button onClick={() => setEditingBook(b)}
            >
              Edit
            </button>
            <button onClick={() => handleDelete(b.bookId)}
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>

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
    );
}

export default AdminBooksPage