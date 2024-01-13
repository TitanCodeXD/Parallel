// React Router
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'

// CSS
import './App.css'

//Components
import Navbar from './Components/Navbar/Navbar'
import Footer from './Components/Footer/Footer'
import Loading from './Components/Loading/Loading';

//Hooks
import {useAuth} from './hooks/useAuth';

//Pages
import Home from './Pages/Home/Home'
import Login from './Pages/Auth/Login'
import Register from './Pages/Auth/Register'
import EditProfile from './Pages/EditProfile/EditProfile';
import Profile from './Pages/Profile/Profile';
import Photo from './Pages/Photo/Photo';



function App() {
  const {auth, loading} = useAuth();

  console.log(loading)

  if(loading) {
    return <Loading />
  }

  return (
    <>
    
      <div className = 'App'>

        <BrowserRouter>
        <Navbar />

        <div className = 'container'>
        <Routes>

        <Route path = "/" element = {auth ? <Home /> : <Navigate to = "/login"/>}></Route>
        <Route path = "/profile" element = {auth ? <EditProfile /> : <Navigate to = "/login"/>}></Route>
        <Route path = "/users/:id" element = {auth ? <Profile /> : <Navigate to = "/login"/>}></Route>
        <Route path = "/login" element = {!auth ? <Login /> : <Navigate to = "/"/>}></Route>
        <Route path = "/register" element = {!auth ? <Register /> : <Navigate to = "/"/>}></Route>
        <Route path = "/photos/:id" element = {auth ? <Photo /> : <Navigate to = "/login"/>}></Route>
        </Routes>
        </div>

        <Footer />
        </BrowserRouter>

      </div>

    </>
  )
}

export default App
