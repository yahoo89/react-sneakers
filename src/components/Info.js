import React from 'react'
import AppContext from '../context'

const Info = ({ title, image, description }) => {
  const { setCartOpened } = React.useContext(AppContext)
  return (
    <div className="cartEmpty d-flex align-center justify-center flex-column flex">
      <img
        src={image}
        alt="Empty Cart Image"
        className="mb-20"
        width={120}
        height={120}
      />
      <h2>{title}</h2>
      <p className="opacity-6">{description}</p>
      <button
        className="greenButton"
        onClick={() => setCartOpened(false)}
      >
        <img src="/img/arrow.svg" alt="Arrow" />
        Return
      </button>
    </div>
  )
}

export default Info