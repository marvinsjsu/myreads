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

      return (
         <div className="search-books">
            <div className="search-books-bar">
              <Link className='close-search' to='/'>Close</Link>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
               <input
                  onChange={(event) => this.updateQuery(event.target.value)}
                  type="text"
                  value={this.state.query}
                  placeholder="Search by title or author"
               />

            </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
               {this.props.searchResults.map((book) => (
                  <li key={book.id}>
                     <Book
                        title={book.title}
                        authors={book.authors}
                        image={book.imageLinks.thumbnail}
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