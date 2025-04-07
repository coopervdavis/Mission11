import { Book } from "../types/Book";

interface FetchBooksResponse {
    books: Book[];
    totalNumBooks: number;
}

const APIURL = 'https://mission13backendcooper.azurewebsites.net/api/bookstore'

export const fetchBooks =async (
    pageSize: number,
    pageNum: number,
    selectedCategories: string[],
    sortDescending: boolean
): Promise<FetchBooksResponse> => {
    try {
            const categoryParams = selectedCategories.map((cat) => `category=${encodeURIComponent(cat)}`).join('&')

            const response = await fetch(`https://mission13backendcooper.azurewebsites.net/api/bookstore?pageSize=${pageSize}&pageNum=${pageNum}&sortDescending=${sortDescending}${selectedCategories.length ? `&${categoryParams}` : ''}`);
            return await response.json();
    }
    catch (error) {
        console.error('Error fetching books:', error);
        throw error;
    }
}
export const AddBook = async (newBook: Book): Promise<Book> => {
    try {
        const response = await fetch(`${APIURL}/AddBook`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newBook)
        });

        if (!response.ok) {
            throw new Error('failed to add project')
        }

        return await response.json();
    }
    catch (error) {
        console.error('Error adding project', error);
        throw error
    }
};

export const UpdateBook = async (bookId: number, updatedBook: Book) : Promise<Book> => {
    try {
        const response = await fetch(`${APIURL}/UpdateBook/${bookId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedBook)
        });

        return await response.json();
    } catch (error) {
        console.error('Error updating project', error);
        throw error
    }
};

export const DeleteBook = async (bookId: number) : Promise<void> => {
    await fetch(`${APIURL}/DeleteBook/${bookId}`,
    {method: 'DELETE'})
}