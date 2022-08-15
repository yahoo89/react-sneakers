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

  const onClickAlert = () => {
    alert(title)
  }

  return (
    <div className={styles.card}>
      <div className={styles.favorite}>
        <img src="/img/heart.svg" alt="Unliked" />
      </div>
      <img width={133} height={112} src={imageUrl} alt={title} />
      <h5>{title}</h5>
      <div className="d-flex justify-between align-center">
        <div className="d-flex flex-column">
          <span>Price:</span>
          <b>{price}$</b>
        </div>
        <button className="button" onClick={onClickAlert}>
          <img width={11} height={11} src="/img/plus.svg" alt="Plus" />
        </button>
      </div>
    </div>
  )
}

export default Card