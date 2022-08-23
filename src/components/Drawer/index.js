import React from "react"
import axios from 'axios'

import Info from "../Info"
import { useCart } from '../../hooks/useCart'
import AppContext from "../../context"
import { _API_URL } from "../../api"

import styles from './Drawer.module.scss'

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function Drawer({ onClose, onRemove, items = [], opened }) {
  const { cartItems, setCartItems, totalPrice } = useCart()
  const [orderId, setOrderId] = React.useState(null)
  const [isOrderComplete, setIsOrderComplete] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)

  const onClickOrder = async () => {
    try {
      setIsLoading(true)
      const { data } = await axios.post('/orders', {
        items: cartItems,
      })
      setOrderId(data.id)
      setIsOrderComplete(true)
      setCartItems([])

      // for (let i = 0; i < cartItems.length; i++) {
      //   const item = cartItems[i];
      //   await axios.delete('/cart/' + item.id);
      //   await delay(1000);
      // }
      for (const item of cartItems) {
        console.log('cartItems ID:', cartItems)
        await axios.delete(`${_API_URL}cart/` + item.id)
        await delay(1000)
      }
    } catch (error) {
      alert('The order is not success :(')
    }
    setIsLoading(false)
  }
  return (

    <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ''}`}>
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
                    <div
                      key={item.id}
                      className="cartItem d-flex align-center mb-20"
                    >
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
                    <b>{totalPrice}$</b>
                  </li>
                  <li>
                    <span>Tax 5%:</span>
                    <div></div>
                    <b>{(totalPrice / 100) * 5} $</b>
                  </li>
                </ul>
                <button
                  className="greenButton"
                  onClick={onClickOrder}
                  disabled={isLoading}
                >
                  Сheckout
                  <img src="/img/arrow.svg" alt="Arrow" />
                </button>
              </div>
            </>
          ) : (
            <Info
              title={isOrderComplete ? "The order is processed" : "The cart is empty"}
              description={
                isOrderComplete
                  ? `The order #${orderId} on the way`
                  : "Please, add any sneakers"
              }
              image={
                isOrderComplete
                  ? "/img/complete-order.jpg"
                  : "/img/empty-cart.jpg"
              }
            />
          )
        }
      </div>
    </div >
  )
}

export default Drawer