import { useEffect, useState } from 'react'
import axios from 'axios'

interface Book {
  title: string;
  key: string;
  first_publish_year?: number;
  author_name?: string[];
  isbn?: string[];
  cover_i?: number;
}

function BookList() {
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCamusBooks = async () => {
      try {
        setLoading(true)
        const response = await axios.get("https://openlibrary.org/authors/OL124171A/works.json")
        console.log("Camus books:", response.data)
        setBooks(response.data.entries)

      } catch (err) {
        console.error("Error fetching books:", err)
        setError("Failed to fetch books")
      } finally {
        setLoading(false)
      }
    }
    
    fetchCamusBooks()
  }, [])

  if (loading) {
    return <div className="loading">Loading Albert Camus books...</div>
  }

  if (error) {
    return <div className="error">Error: {error}</div>
  }

  return (
    <div className="book-list">
      <h1>Albert Camus Books</h1>
      <p>Found {books.length} books by Albert Camus</p>
      
      <div className="books-grid">
        {books.map((book) => (
          <div key={book.key} className="book-card">
            <h3>{book.title}</h3>
            {book.first_publish_year && (
              <p>First Published: {book.first_publish_year}</p>
            )}
            {/* {book.cover_i && (
              <img 
                src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                alt={`Cover of ${book.title}`}
                className="book-cover"
              />
            )}
            {book.isbn && book.isbn.length > 0 && (
              <p>ISBN: {book.isbn[0]}</p>
            )} */}
          </div>
        ))}
      </div>
    </div>
  )
}

export default BookList