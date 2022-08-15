import React from "react"

import Card from "./components/Card"
import Drawer from "./components/Drawer"
import Header from "./components/Header"

const arr = [
  { id: 1, title: 'Nike Blazer Mid Suede', price: 12999, imageUrl: '/img/sneakers/1.jpg' },
  { id: 2, title: 'Nike Air Max', price: 15369, imageUrl: '/img/sneakers/2.jpg' },
  { id: 2, title: 'Nike Air Max 3', price: 5369, imageUrl: '/img/sneakers/3.jpg' },
  { id: 2, title: 'Nike Air Max 4', price: 1369, imageUrl: '/img/sneakers/4.jpg' },
]

function App() {
  return (
    <div className="wrapper clear">
      <Drawer />
      <Header />
      <div className="content p-40">
        <div className="mb-40 d-flex align-center justify-between">
          <h1>All Sneakers</h1>
          <div className="search-block">
            <img src="/img/search.svg" alt="Search" />
            <input type="text" placeholder="Search..." />
          </div>
        </div>
        <div className="d-flex">
          {
            arr.map(el => (
              <Card
                key={el.id}
                title={el.title}
                price={el.price}
                imageUrl={el.imageUrl}
              />
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default App
