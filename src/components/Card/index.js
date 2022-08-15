import React from 'react'

import styles from './Card.module.scss'

function Card() {
  return (
    <div className={styles.card}>
      <img width={133} height={112} src="/img/sneakers/1.jpg" alt="Sneakers 1" />
      <h5>Nike Blazer Mid Suede</h5>
      <div className="d-flex justify-between align-center">
        <div className="d-flex flex-column">
          <span>Price:</span>
          <b>1200$</b>
        </div>
        <button className="button">
          <img width={11} height={11} src="/img/plus.svg" alt="Plus" />
        </button>
      </div>
    </div>
  )
}

export default Card