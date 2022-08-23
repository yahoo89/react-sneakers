import React from "react"
import { Routes, Route } from 'react-router-dom'
import axios from "axios"

import Header from "./components/Header"
import Drawer from "./components/Drawer"
import Home from "./pages/Home"
import Favorites from "./pages/Favorites"
import Orders from './pages/Orders'
import AppContext from "./context"
import { _API_URL } from "./api"



function App() {
  const [items, setItems] = React.useState([])
  const [cartItems, setCartItems] = React.useState([])
  const [favorites, setFavorites] = React.useState([])
  const [searchValue, setSearchValue] = React.useState('')
  const [cartOpened, setCartOpened] = React.useState(false)
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
      try {
        const [cartResponse, favoriteResponse, itemsResponse] = await Promise.all([
          axios.get(`${_API_URL}cart`),
          axios.get(`${_API_URL}favorites`),
          axios.get(`${_API_URL}items`)
        ])

        setIsLoading(false)

        setCartItems(cartResponse.data)
        setFavorites(favoriteResponse.data)
        setItems(itemsResponse.data)
      } catch (error) {
        alert('The request error ;(')
        console.error(error)
      }
    }

    fetchData()
  }, [])

  const onAddToCart = async (obj) => {
    try {
      const findItem = cartItems.find((item) => Number(item.parentId) === Number(obj.id))
      if (findItem) {
        setCartItems((prev) => prev.filter((item) => Number(item.parentId) !== Number(obj.id)))
        await axios.delete(`${_API_URL}cart/${findItem.id}`)
      } else {
        setCartItems((prev) => [...prev, obj])
        const { data } = await axios.post(`${_API_URL}cart`, obj)
        setCartItems((prev) =>
          prev.map((item) => {
            if (item.parentId === data.parentId) {
              return {
                ...item,
                id: data.id,
              };
            }
            return item
          }),
        )
      }
    } catch (error) {
      alert('Error adding to cart')
      console.error(error)
    }
  }

  const onRemoveItem = (id) => {
    try {
      axios.delete(`${_API_URL}cart/${id}`)
      setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(id)))
    } catch (error) {
      alert('Error when deleting from cart')
      console.error(error)
    }
  }

  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find((favObj) => Number(favObj.id) === Number(obj.id))) {
        axios.delete(`${_API_URL}favorites/${obj.id}`)
        setFavorites((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)));
      } else {
        const { data } = await axios.post(`${_API_URL}favorites`, obj)
        setFavorites((prev) => [...prev, data])
      }
    } catch (error) {
      alert('Can"t add to favorites')
      console.error(error)
    }
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value)
  }

  const isItemAdded = (id) => {
    return cartItems.some(obj => Number(obj.id) === Number(id))
  }

  return (
    <AppContext.Provider
      value={{
        items,
        cartItems,
        favorites,
        isItemAdded,
        onAddToFavorite,
        onAddToCart,
        setCartOpened,
        setCartItems,
      }}>
      <div className="wrapper clear">
        <Drawer
          items={cartItems}
          onClose={() => setCartOpened(false)}
          onRemove={onRemoveItem}
          opened={cartOpened}
        />
        <Header onClickCart={() => setCartOpened(true)} />

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
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </div>
    </AppContext.Provider>
  )
}

export default App
