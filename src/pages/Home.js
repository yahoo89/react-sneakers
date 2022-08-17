import React from 'react'

import Card from "../components/Card"


const Home = (props) => {
  const {
    items,
    searchValue,
    setSearchValue,
    onChangeSearchInput,
    onAddToFavorite,
    onAddToCart,
    //isLoading
  } = props
  return (
    <div className="content p-40">
      <div className="mb-40 d-flex align-center justify-between">
        <h1>{searchValue ? `Search by: "${searchValue}"` : 'All Sneakers'}</h1>
        <div className="search-block">
          <img src="/img/search.svg" alt="Search" />
          {searchValue && <img onClick={() => setSearchValue('')} className="clear cu-p" src="/img/btn-remove.svg" alt="Close" />}
          <input
            type="text"
            placeholder="Search..."
            value={searchValue}
            onChange={onChangeSearchInput}
          />
        </div>
      </div>
      <div className="d-flex flex-wrap">
        {
          items
            .filter(item => item.title.toLowerCase().includes(searchValue))
            .map((item, idx) => (
              <Card
                key={idx}
                onFavorite={(obj) => onAddToFavorite(obj)}
                onPlus={(obj) => onAddToCart(obj)}
                {...item}
              />
            ))
        }
      </div>
    </div>
  )
}

export default Home