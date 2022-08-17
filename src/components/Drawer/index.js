import React from "react"

import styles from './Drawer.module.scss'

function Drawer({ onClose, items = [], onRemove }) {


  return (
    <div className={styles.overlay}>
      <div className={styles.drawer}>
        <h2 className="mb-30 d-flex justify-between">
          Cart
          <img
            className="removeBtn cu-p"
            src="/img/btn-remove.svg"
            alt="Remove"
            onClick={onClose}
          />
        </h2>

        {
          items.length > 0 ? (
            <>
              <div className={styles.items}>
                {
                  items.map(item => (
                    <div className="cartItem d-flex align-center mb-20" >
                      <div
                        className="cartItemImg"
                        style={{ backgroundImage: `url(${item.imageUrl})` }}
                      ></div>
                      <div className="mr-20 flex">
                        <p className="mb-5">{item.title}</p>
                        <b>{item.price}$</b>
                      </div>
                      <img
                        className="removeBtn"
                        src="/img/btn-remove.svg"
                        alt="Remove"
                        onClick={() => onRemove(item.id)}
                      />
                    </div>
                  ))
                }
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
            </>
          ) : (
            <div className="cartEmpty d-flex align-center justify-center flex-column flex">
              <img
                src="/img/empty-cart.jpg"
                alt="Empty Cart Image"
                className="mb-20"
                width={120}
                height={120}
              />
              <h2>The Cart is empty</h2>
              <p className="opacity-6">Please, add sneakers</p>
              <button
                className="greenButton"
                onClick={onClose}
              >
                <img src="/img/arrow.svg" alt="Arrow" />
                Return
              </button>
            </div>
          )
        }


      </div>
    </div >
  )
}

export default Drawer