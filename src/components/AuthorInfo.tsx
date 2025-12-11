import { useEffect, useState } from 'react'
import axios from 'axios'

interface Author {
  name: string;
  key?: string;
  birth_date?: string;
  death_date?: string;
  work_count?: number;
  top_work?: string;
}

function AuthorInfo() {
  const [author, setAuthor] = useState<Author | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  useEffect(() => {
    const getAuthors = async () => {
      try {
        setLoading(true)
        const response = await axios.get("https://openlibrary.org/search/authors.json?q=albert+camus")
        console.log("Author response:", response.data)
        setAuthor(response.data.docs[0])
        console.log("Author info:", response.data.docs[0])
      } catch (err) {
        console.error("Error fetching author:", err)
        setError("Failed to fetch author information")
      } finally {
        setLoading(false)
      }
    }
    getAuthors()
  }, [])

  if (loading) {
    return <div className="loading">Loading author information...</div>
  }

  if (error) {
    return <div className="error">Error: {error}</div>
  }

  if (!author) {
    return <div className="error">No author information found</div>
  }

  return (
    <div className="author-info">
      <div className="author-header">
        <h1>I love {author.name}</h1>
        <p className="author-subtitle">French-Algerian philosopher, author, and journalist</p>
      </div>
      
      <div className="author-details">
        <div className="detail-card">
          <h3>Biography</h3>
          <p><strong>Born:</strong> {author.birth_date || 'November 7, 1913'}</p>
          <p><strong>Died:</strong> {author.death_date || 'January 4, 1960'}</p>
          <p><strong>Works:</strong> {author.work_count || 'Multiple'} published works</p>
          {author.top_work && (
            <p><strong>Notable Work:</strong> {author.top_work}</p>
          )}
        </div>

        <div className="detail-card">
          <h3>Legacy</h3>
          <p>Albert Camus was a French-Algerian philosopher, author, and journalist who won the Nobel Prize in Literature in 1957.</p>
          <p>Known for his contributions to absurdist philosophy and works like "The Stranger" and "The Myth of Sisyphus".</p>
        </div>

        <div className="detail-card">
          <h3>Explore His Works</h3>
          <p>Discover Albert Camus' complete collection of books and his most celebrated works using the navigation above.</p>
          <ul>
            <li>📚 <strong>All Books</strong> - Complete bibliography</li>
            <li>⭐ <strong>Featured Books</strong> - Most popular works</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default AuthorInfo