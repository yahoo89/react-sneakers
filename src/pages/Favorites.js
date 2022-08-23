import React from 'react'
import Card from '../components/Card'
import AppContext from '../context'


function Favorites({ onAddToFavorite }) {
  //const { favorites, onAddToFavorite } = React.useState([]);

  const state = React.useContext(AppContext)


  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>Favorites</h1>
      </div>
      <div className="d-flex flex-wrap">
        {
          []
            .map((item, idx) => (
              <Card
                key={idx}
                favorited={true}
                onFavorite={onAddToFavorite}
                {...item}
              // onPlus={(obj) => onAddToCart(obj)}
              />
            ))
        }
      </div>
    </div>
  )
}

export default Favorites