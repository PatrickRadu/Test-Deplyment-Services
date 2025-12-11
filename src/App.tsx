import { Routes, Route, Link } from 'react-router-dom'
import './App.css'
import BookList from './components/BookList'
import FeaturedBooks from './components/FeaturedBooks'
import AuthorInfo from './components/AuthorInfo'

function App() {
  return (
    <div className="app">
      <nav className="navigation">
        <div className="nav-brand">
          <h2>Camus Book Collection</h2>
        </div>
        <div className="nav-links">
          <Link to="/" className="nav-link">Author Info</Link>
          <Link to="/books" className="nav-link">All Books</Link>
          <Link to="/featured" className="nav-link">Featured Books</Link>
        </div>
      </nav>

      <main className="main-content">
        <Routes>
          <Route path="/" element={<AuthorInfo />} />
          <Route path="/books" element={<BookList />} />
          <Route path="/featured" element={<FeaturedBooks />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
