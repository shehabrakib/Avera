import {BrowserRouter, Route, Routes} from 'react-router-dom'
import UserLayout from '../components/layout/UserLayout'
import Home from '../pages/Home'
import {Toaster} from "sonner"
import Login from '../pages/login'
import Register from '../pages/Register'
import Profile from '../pages/Profile'
import CollectionPage from '../pages/CollectionPage'
import ProductDetails from '../components/products/ProductDetails'

const App = () => {
  return (
    <BrowserRouter>
    <Toaster position='top-right' />
      <Routes>
        <Route path='/' element={<UserLayout/>}>
          <Route index element={<Home/>}/>
          <Route path='login' element={<Login/>}/>
          <Route path='register' element={<Register/>}/>
          <Route path='profile' element={<Profile/>}/>
          <Route path='collections/:collection' element={ <CollectionPage/>}/>
          <Route path='product/:id' element={<ProductDetails/>}/>
        </Route>
        <Route></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
