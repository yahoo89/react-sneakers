import React from 'react'

import AppContext from '../../context'

import styles from './Card.module.scss'

function Card(props) {
  const {
    id,
    title,
    imageUrl,
    price,
    onFavorite,
    onPlus,
    favorited = false,
    loading = false,
  } = props

  const [isAdded, setIsAdded] = React.useState(false)
  const [isFavorite, setIsFavorite] = React.useState(favorited)

  const onClickPlus = () => {
    onPlus({ title, imageUrl, price })
    setIsAdded(!isAdded)
  }
  const onClickFavorite = () => {
    onFavorite({ id, title, imageUrl, price })
    setIsFavorite(!isFavorite)
  }


  return (
    <div className={styles.card}>
      <div className={styles.favorite} onClick={onFavorite}>
        <img
          src={isFavorite ? "/img/liked.svg" : "/img/unliked.svg"}
          alt="Unliked"
          onClick={onClickFavorite}
        />
      </div>
      <img width={133} height={112} src={imageUrl} alt={title} />
      <h5>{title}</h5>
      <div className="d-flex justify-between align-center">
        <div className="d-flex flex-column">
          <span>Price:</span>
          <b>{price}$</b>
        </div>
        <img
          className={styles.plus}
          onClick={onClickPlus}
          src={isAdded ? "/img/btn-checked.svg" : "/img/btn-plus.svg"}
          alt="Plus"
        />
      </div>
    </div>
  )
}

export default Card