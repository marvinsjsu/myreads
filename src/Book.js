import React, { Component} from 'react'
import PropTypes from 'prop-types'

class Book extends Component {

   static propTypes = {
      title: PropTypes.string.isRequired,
      authors: PropTypes.array.isRequired,
      image: PropTypes.string.isRequired,
   }

   render() {

      const { title, authors, image } = this.props

      console.log("IMAGE: ", image)

      return (
         <div className="book">
           <div className="book-top">
             <div className="book-cover" style={{ width: 128, height: 188, backgroundImage: {image} }}></div>
             <div className="book-shelf-changer">
               <select>
                 <option value="none" disabled>Move to...</option>
                 <option value="currentlyReading">Currently Reading</option>
                 <option value="wantToRead">Want to Read</option>
                 <option value="read">Read</option>
                 <option value="none">None</option>
               </select>
             </div>
           </div>
           <div className="book-title">{title}</div>
           <div className="book-authors">{authors.toString()}</div>
         </div>
      )
   }
}

export default Book