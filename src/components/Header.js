import React from "react"

function Header() {
  return (
    <header className="d-flex justify-between align-center p-40">
      <div className="d-flex align-center">
        <img width={40} height={40} src="/img/logo.png" alt="logo" />
        <div className="headerInfo">
          <h3 className="text-uppercase">React Sneakers</h3>
          <p lassName="opacity-5">The best sneakers shop</p>
        </div>
      </div>
      <ul className="d-flex">
        <li className="mr-30 cu-p">
          <img width={18} height={18} src="img/cart.svg" alt="Cart" />
          <span>Total Price</span>
        </li>
        <li className="mr-20 cu-p">
          <img width={18} height={18} src="img/heart.svg" alt="Favorites" />
        </li>
        <li>
          <img width={18} height={18} src="img/user.svg" alt="User" />
        </li>
      </ul>
    </header>
  )
}

export default Header