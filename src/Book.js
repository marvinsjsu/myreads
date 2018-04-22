import React, { Component} from 'react'
import PropTypes from 'prop-types'

class Book extends Component {

    static propTypes = {
      book: PropTypes.object.isRequired,
    }

   render() {

      const { shelf, book, moveMe } = this.props
      const defaultShelf = shelf || 'none'
      const shelfOptions = [
        {
          value: 'currentlyReading',
          label: 'Currently Reading',
        },
        {
          value: 'wantToRead',
          label: 'Want To Read',
        },
        {
          value: 'read',
          label: 'Read',
        },
        {
          value: 'none',
          label: 'None',
        },
      ]
      const style = {
         width: 128,
         height: 188,
         backgroundImage: `url(${(book.imageLinks && book.imageLinks.thumbnail) || ''})`
      }

      return (
         <div className="book">
           <div className="book-top">
             <div className="book-cover" style={style}></div>
             <div className="book-shelf-changer">
               <select onChange={(evt) => (moveMe(book, shelf, evt.target.value))} value={defaultShelf}>
                 <option value="none" disabled>Move to...</option>
                  {shelfOptions.map((shelf) => (
                    <option key={shelf.value} value={shelf.value}>{shelf.label}</option>
                  ))}
               </select>
             </div>
           </div>
           <div className="book-title">{book.title}</div>
           <div className="book-authors">{book.authors && book.authors.join(', ')}</div>
         </div>
      )
   }
}

export default Book