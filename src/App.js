import React from 'react'
import { Link, Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Bookshelf from './Bookshelf'
import BookSearch from './BookSearch'
import './App.css'

class BooksApp extends React.Component {

  state = {
    currentlyReading: [],
    wantToRead: [],
    read: [],
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
        console.log("LOAD BOOK SHELF: ", books)
        this.setState((currentState) => ({
          currentlyReading: books.filter((b) => (b.shelf === 'currentlyReading')),
          wantToRead: books.filter((b) => (b.shelf === 'wantToRead')),
          read: books.filter((b) => (b.shelf === 'read')),
        }))
      })    
  }

  resetSearchDisplay = (book) => {
    this.setState((currentState) => ({
      searchResults: currentState.searchResults.filter((b) => {
        return b.id !== book.id
      })
    }))    
  }

  moveBook = (book, fromShelf, toShelf) => {
    if(book && toShelf) {
      BooksAPI.update(book, toShelf)
        .then((res) => {
          this.resetSearchDisplay(book) 
          this.resetShelvesDisplay()
        })
    }
  }

  searchBooks = (query) => {
    if (query === '') {
      this.setState(() => ({
        searchResults: []
      }))
    } else {
      BooksAPI.search(query)
        .then((books) => {
          console.log("SEARCH BOOKS: ", books)
          this.setState((currentState) => ({
            searchResults: (books.error && []) || books.filter((b) => {
              return b.shelf === undefined || b.shelf === 'none'
            })
          }))
        })
    }
  }

  render() {
    return (
      <div className="app">
        <Route path='/search' render={() => (
            <BookSearch
              onSearch={(query) => this.searchBooks(query)}
              searchResults={this.state.searchResults}
              moveBook={this.moveBook}
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
                <Bookshelf
                  title="Currently Reading"
                  books={this.state.currentlyReading}
                  moveBook={this.moveBook}
                />
                <Bookshelf
                  title="Want to Read"
                  books={this.state.wantToRead}
                  moveBook={this.moveBook}
                />
                <Bookshelf
                  title="Read"
                  books={this.state.read}
                  moveBook={this.moveBook}
                />
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
