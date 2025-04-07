import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import FirstPage from './pages/FirstPage'
import BuyPage from './pages/BuyPage'
import CartPage from './pages/CartPage'
import { CartProvider } from './context/CartContext'
import AdminBooksPage from './pages/AdminBooksPage'
function App() {


  return (    
  <>
  <CartProvider>
        <Router>
      <Routes>
        <Route path='/' element={<FirstPage />} />
        <Route path='/books' element={<FirstPage />} />
        <Route path='/buy/:title/:bookId/:bprice' element={<BuyPage />}/>
        <Route path='/cart' element={<CartPage />}/>
        <Route path='/admin' element={<AdminBooksPage />}/>
      </Routes>
    </Router>
  </CartProvider>


    </>
  )
}

export default App
