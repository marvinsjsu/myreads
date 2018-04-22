import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'

class BookSearch extends Component {

    state = {
      query: '',
    }

    updateQuery = (query) => {
      this.props.onSearch(query)
      this.setState(() => ({
         query: query.trim(),
      }))
    }

    render() {

      const { moveBook, query } = this.props

      return (
         <div className="search-books">
            <div className="search-books-bar">
              <Link className='close-search' to='/'>Close</Link>
              <div className="search-books-input-wrapper">
               <input
                  onChange={(event) => this.updateQuery(event.target.value)}
                  type="text"
                  value={this.state.query || query}
                  placeholder="Search by title or author"
               />
            </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
               {this.props.searchResults.map((book) => (
                  <li key={book.id}>
                     <Book
                        moveMe={moveBook}
                        shelf={book.shelf}
                        book={book}
                     />
                  </li>
               ))}
              </ol>
            </div>
         </div>
      )
    }
}

export default BookSearch