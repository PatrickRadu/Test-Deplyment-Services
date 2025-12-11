import { useEffect, useState } from 'react'
import axios from 'axios'

interface Book {
  title: string;
  key: string;
  first_publish_year?: number;
  author_name?: string[];
  isbn?: string[];
  cover_i?: number;
  subject?: string[];
}

function FeaturedBooks() {
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchFeaturedCamusBooks = async () => {
      try {
        setLoading(true)
        // Fetch popular/featured Camus books with higher rating/popularity
        const response = await axios.get("https://openlibrary.org/authors/OL124171A/works.json?limit=10&sort=rating")
        setBooks(response.data.entries)
        console.log("Featured Camus books:", response.data.entries)
      } catch (err) {
        console.error("Error fetching featured books:", err)
        setError("Failed to fetch featured books")
      } finally {
        setLoading(false)
      }
    }
    
    fetchFeaturedCamusBooks()
  }, [])

  if (loading) {
    return <div className="loading">Loading featured Albert Camus books...</div>
  }

  if (error) {
    return <div className="error">Error: {error}</div>
  }

  return (
    <div className="featured-books">
      <h1>Featured Albert Camus Books</h1>
      <p>Top {books.length} most popular books by Albert Camus</p>
      
      <div className="featured-grid">
        {books.map((book) => (
          <div key={book.key} className="featured-card">
            <div className="book-info">
              <h2>{book.title}</h2>
              {book.first_publish_year && (
                <p className="publish-year">First Published: {book.first_publish_year}</p>
              )}
              {book.subject && book.subject.length > 0 && (
                <div className="subjects">
                  <strong>Subjects: </strong>
                  <span>{book.subject.slice(0, 3).join(', ')}</span>
                  {book.subject.length > 3 && <span>...</span>}
                </div>
              )}
              {book.isbn && book.isbn.length > 0 && (
                <p className="isbn">ISBN: {book.isbn[0]}</p>
              )}
            </div>
            {book.cover_i && (
              <div className="cover-container">
                <img 
                  src={`https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`}
                  alt={`Cover of ${book.title}`}
                  className="featured-cover"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default FeaturedBooks