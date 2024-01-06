// React
import React from 'react'
import { NavLink, Link } from 'react-router-dom';
import { BsSearch, BsHouseDoorFill, BsFillPersonFill, BsFillCameraFill } from 'react-icons/bs';

// CSS
import './Navbar.css';

// Logo
import Logo from '../Logo/Logo';

const Navbar = () => {

  return (
    <nav id="nav">
        <Link className = 'logo' to = "/"> <Logo height = "50" width = "100%"/> </Link>
        <form id = "search-form">
            <BsSearch />
            <input type = 'text' placeholder = 'Pesquisar'></input>
        </form>
        <ul id = "nav-links">
            <li>
            <NavLink to = "">
                <BsHouseDoorFill />
            </NavLink>
            </li>

            <li>
            <NavLink to = '/login'>Entrar</NavLink>
            </li>

            <li>
            <NavLink to = '/register'>Cadastrar</NavLink>
            </li>
        </ul>
    </nav>
  )
}

export default Navbar