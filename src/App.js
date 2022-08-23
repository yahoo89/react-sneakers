import React from "react"
import axios from "axios"
import { Routes, Route } from 'react-router-dom'

import AppContext from "./context"
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
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    // fetch('https://62fb9453e4bcaf5351886bc7.mockapi.io/items')
    //   .then(res => {
    //     return res.json()
    //   })
    //   .then(json => {
    //     setItems(json)
    //   })
    async function fetchData() {
      const cartResponse = await axios.get(`${_API_URL}cart`)
      const favoriteResponse = axios.get(`${_API_URL}favorites`)
      const itemsResponse = await axios.get(`${_API_URL}items`)

      setIsLoading(false)

      setCartItems(cartResponse.data)
      setFavorites(favoriteResponse.data)
      setItems(itemsResponse.data)
    }
    fetchData()
  }, [])

  const onAddToCart = (obj) => {
    try {
      if (cartItems.find(item => Number(item.id) === Number(obj.id))) {
        axios.delete(`${_API_URL}cart/${Number(obj.id)}`)
        setCartItems(prev => prev.filter(item => Number(item.id) !== Number(obj.id)))
      } else {
        axios.post(`${_API_URL}cart`, obj)
        setCartItems(prev => [...prev, obj])
      }
    } catch (error) {
      console.log('Add to cart:', error)
    }
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

  const isItemAdded = (id) => {
    return cartItems.some(obj => Number(obj.id) === Number(id))
  }

  return (
    <AppContext.Provider
      value={{ items, cartItems, favorites, isItemAdded, onAddToFavorite, setCartOpened }}
    >
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
              isLoading={isLoading}
            />
          } />
          <Route path="/favorites" element={
            <Favorites onAddToFavorite={onAddToFavorite} />
          } />
        </Routes>


      </div>
    </AppContext.Provider>
  )
}

export default App
