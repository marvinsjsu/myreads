import React, { Component} from 'react'
import PropTypes from 'prop-types'

class Book extends Component {

    static propTypes = {
      title: PropTypes.string.isRequired,
      authors: PropTypes.array.isRequired,
      image: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      shelf: PropTypes.string.isRequired,
    }


   render() {

      const { title, authors, image, moveMe, id, shelf } = this.props
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
 
      this.id = id
      console.log("THIS ID: ", this.id)
      const style = {
         width: 128,
         height: 188,
         backgroundImage: `url(${image})`
      }

      return (
         <div className="book">
           <div className="book-top">
             <div className="book-cover" style={style}></div>
             <div className="book-shelf-changer">
               <select onChange={(evt) => (moveMe(evt, this))} value={shelf}>
                 <option value="none" disabled>Move to...</option>
                  {shelfOptions.map((shelf) => (
                    <option key={shelf.value} value={shelf.value}>{shelf.label}</option>
                  ))}
               </select>
             </div>
           </div>
           <div className="book-title">{title}</div>
           <div className="book-authors">{authors && authors.join(', ')}</div>
         </div>
      )
   }
}

export default Book