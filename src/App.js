import React from 'react'
import { Link, Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Bookshelf from './Bookshelf'
import BookSearch from './BookSearch'
import './App.css'

class BooksApp extends React.Component {

  state = {
    query: '',
    searchResults: [],
    bookshelves: [
      {
        title: 'Currently Reading',
        shelf: 'currentlyReading',
        books: [],
      },
      {
        title: 'Want to Read',
        shelf: 'wantToRead',
        books: [],
      },
      {
        title: 'Read',
        shelf: 'read',
        books: [],
      }
    ]
  }

  componentDidMount() {
    this.resetShelvesDisplay()
  }

  resetShelvesDisplay = () => {
    BooksAPI.getAll()
      .then((books) => {
        this.setState((currentState) => ({
          bookshelves: currentState.bookshelves.map(shelf => ({
            title: shelf.title,
            shelf: shelf.shelf,
            books: books.filter(b => b.shelf === shelf.shelf),
          }))
        }))
      })
  }

  moveBook = (book, fromShelf, toShelf) => {
    if(book && toShelf) {
      BooksAPI.update(book, toShelf)
        .then((res) => {
          book.shelf = toShelf
          this.resetShelvesDisplay()
        })
    }
  }

  searchBooks = (query) => {
    if (query === '') {
      this.setState(() => ({
        searchResults: [],
        query: query,
      }))
    } else {
      BooksAPI.search(query)
        .then((books) => {
          this.setState((currentState) => ({
            searchResults: (books.error && []) || books.map(curBook => {
              curBook.shelf = this.getShelf(curBook)
              console.log("BOOK ID", curBook.id, curBook.shelf)
              return curBook
            }),
            query: query,
          }))
        })
    }
  }

  getShelf = (book) => {
    let shelfBooks = this.state.bookshelves.map(shelf => {
      return shelf.books
    }).reduce((arr, el) => arr.concat(el))

    let match = shelfBooks.find(b => b.id === book.id)
    return (match && match.shelf) ? match.shelf : 'None'
  }

  render() {
    return (
      <div className="app">
        <Route path='/search'
          to={{
            pathname: '/search',
            state: { fromDashboard: true }
          }}
          render={() => (
            <BookSearch
              onSearch={(query) => this.searchBooks(query)}
              searchResults={this.state.searchResults}
              moveBook={this.moveBook}
              query={this.state.query}
            />
          )}
        />

        <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                {this.state.bookshelves.map(shelf => (
                  <Bookshelf
                    key={shelf.shelf}
                    title={shelf.title}
                    books={shelf.books}
                    moveBook={this.moveBook}
                  />
                ))}
              </div>
            </div>
            <div className="open-search">
              <Link to='/search'>Add a book</Link>
            </div>
          </div>
          )}
        />
      </div>
    )
  }
}

export default BooksApp
