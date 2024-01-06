// React Router
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'

// CSS
import './App.css'

//Components
import Navbar from './Components/Navbar/Navbar'
import Footer from './Components/Footer/Footer'

//Pages
import Home from './Pages/Home/Home'
import Login from './Pages/Auth/Login'
import Register from './Pages/Auth/Register'



function App() {

  return (
    <>
    
      <div className = 'App'>

        <BrowserRouter>
        <Navbar />

        <div className = 'container'>
        <Routes>

        <Route path = "/" element = {<Home />}></Route>
        <Route path = "/login" element = {<Login />}></Route>
        <Route path = "/register" element = {<Register />}></Route>

        </Routes>
        </div>

        <Footer />
        </BrowserRouter>

      </div>

    </>
  )
}

export default App
