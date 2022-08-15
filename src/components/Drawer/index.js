import React from "react"

import styles from './Drawer.module.scss'

function Drawer() {
  return (
    <div className={styles.overlay}>
      <div className={styles.drawer}>
        <h2 className="mb-30 d-flex justify-between">
          Cart
          <img className="removeBtn cu-p" src="/img/btn-remove.svg" alt="Remove" />
        </h2>
        <div className={styles.items}>
          <div className="cartItem d-flex align-center mb-20">
            <div
              className="cartItemImg"
              style={{ backgroundImage: 'url(/img/sneakers/1.jpg)' }}
            ></div>
            <div className="mr-20">
              <p className="mb-5">Nike Blazer Mid Suede</p>
              <b>1000$</b>
            </div>
            <img className="removeBtn" src="/img/btn-remove.svg" alt="Remove" />
          </div>
          <div className="cartItem d-flex align-center mb-20">
            <div
              className="cartItemImg"
              style={{ backgroundImage: 'url(/img/sneakers/2.jpg)' }}
            ></div>
            <div className="mr-20">
              <p className="mb-5">Nike Blazer Mid Suede</p>
              <b>1000$</b>
            </div>
            <img className="removeBtn" src="/img/btn-remove.svg" alt="Remove" />
          </div>
        </div>
        <div className="cartTotalBlock">
          <ul >
            <li>
              <span>Total:</span>
              <div></div>
              <b>2000$</b>
            </li>
            <li>
              <span>Tax 5%:</span>
              <div></div>
              <b>5$</b>
            </li>
          </ul>
          <button className="greenButton">
            Сheckout
            <img src="/img/arrow.svg" alt="Arrow" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Drawer