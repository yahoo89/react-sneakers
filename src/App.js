import React from "react"
import axios from "axios"
import { Routes, Route } from 'react-router-dom'


import Drawer from "./components/Drawer"
import Header from "./components/Header"
import Home from "./pages/Home"
import Favorites from "./pages/Favorites"

const _API_URL = 'https://62fb9453e4bcaf5351886bc7.mockapi.io/'

function App() {
  const [items, setItems] = React.useState([])
  const [cartItems, setCartItems] = React.useState([])
  const [favorites, setFavorites] = React.useState([])
  const [searchValue, setSearchValue] = React.useState('')
  const [cartOpened, setCartOpened] = React.useState(true)

  React.useEffect(() => {
    // fetch('https://62fb9453e4bcaf5351886bc7.mockapi.io/items')
    //   .then(res => {
    //     return res.json()
    //   })
    //   .then(json => {
    //     setItems(json)
    //   })
    axios.get(`${_API_URL}items`)
      .then(res => setItems(res.data))
    axios.get(`${_API_URL}cart`)
      .then(res => setCartItems(res.data))
    axios.get(`${_API_URL}favorites`)
      .then(res => setFavorites(res.data))
  }, [])

  const onAddToCart = (obj) => {
    axios.post(`${_API_URL}cart`, obj)
    setCartItems(prev => [...prev, obj])
  }

  const onRemoveItem = (id) => {
    axios.delete(`${_API_URL}cart/${id}`)
    setCartItems(prev => prev.filter(item => item.id !== id))
  }

  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find(el => el.id === obj.id)) {
        axios.delete(`${_API_URL}favorites/${obj.id}`)
        setFavorites(prev => prev.filter(item => item.id !== obj.id))
      } else {
        const { data } = await axios.post(`${_API_URL}favorites`, obj)
        setFavorites(prev => [...prev, data])
      }
    } catch (error) {
      console.dir('Can"t add to favorites:', error)
    }

  }

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value)
  }

  return (
    <div className="wrapper clear">
      <Header onClickCart={() => setCartOpened(true)} />
      {
        cartOpened && <Drawer
          items={cartItems}
          onClose={() => setCartOpened(false)}
          onRemove={onRemoveItem}
        />
      }
      <Routes>
        <Route path="/" element={
          <Home
            items={items}
            cartItems={cartItems}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            onChangeSearchInput={onChangeSearchInput}
            onAddToFavorite={onAddToFavorite}
            onAddToCart={onAddToCart}
          //isLoading={isLoading}
          />
        } />
        <Route path="/favorites" element={
          <Favorites
            items={favorites}
            onAddToFavorite={onAddToFavorite}
          />
        } />
      </Routes>


    </div>
  )
}

export default App
