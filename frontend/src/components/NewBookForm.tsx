import { useState } from "react";
import { Book } from "../types/Book";
import { AddBook } from "../api/BooksApi";

interface NewBookFormProps {
    onSuccess: () => void;
    onCancel: () => void;
}

const NewBookForm = ({onCancel, onSuccess}: NewBookFormProps) => {
    const [bookData, setBookData] = useState<Book>({
           bookId: 0,
    title: '',
    author: '',
    publisher: '',
    isbn: '',
    classification: '',
    category: '',
    pageCount: 0,
    price: 0
    })
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBookData({...bookData, [e.target.name]: e.target.value })
};
const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await AddBook(bookData); 
    onSuccess();
}
    
    return (
        <form>
            <h2>Add New Book</h2>
            <label>Title <input type='text' name="title" value={bookData.title} onChange={handleChange}/></label>
            <label>author <input type='text'name="author" value={bookData.author} onChange={handleChange}/></label>
            <label>publisher <input type='text'name="publisher" value={bookData.publisher} onChange={handleChange}/></label>
            <label>isbn <input type='text'name="isbn" value={bookData.isbn} onChange={handleChange}/></label>
            <label>classification <input type='text'name="classification" value={bookData.classification} onChange={handleChange}/></label>
            <label>category <input type='text'name="category" value={bookData.category} onChange={handleChange}/></label>
            <label>pageCount <input type='number'name="pageCount" value={bookData.pageCount} onChange={handleChange}/></label>
            <label>price <input type='number'name="price" value={bookData.price} onChange={handleChange}/></label>
            <button type="submit" onClick={handleSubmit}>SendForm</button>
            <button type="button" onClick={onCancel}>Cancel</button>
        </form>
    )
}


export default NewBookForm;