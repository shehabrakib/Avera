import {BrowserRouter, Route, Routes} from 'react-router-dom'
import UserLayout from '../components/layout/UserLayout'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<UserLayout/>}></Route>
        <Route></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
