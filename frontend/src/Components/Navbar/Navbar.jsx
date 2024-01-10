// React
import React from 'react'
import { NavLink, Link } from 'react-router-dom';
import { BsSearch, BsHouseDoorFill, BsFillPersonFill, BsFillCameraFill } from 'react-icons/bs';

// Hooks
import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// Redux
import {logout, reset} from '../../slices/authSlice';

// CSS
import './Navbar.css';

// Logo, Icons and Tooltip Library
import Logo from '../Logo/Logo';
import { IoIosLogOut } from "react-icons/io";
import { Tooltip } from 'react-tooltip'

const Navbar = () => {
  const {auth} = useAuth();
  const {user} = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout())
    dispatch(reset())

    navigate("/login")
  }

  return (
    <nav id="nav">
        <Link className = 'logo' to = "/"> <Logo height = "50" width = "100%"/> </Link>
        <form id = "search-form">
            <BsSearch />
            <input type = 'text' placeholder = 'Pesquisar'></input>
        </form>
        <ul id = "nav-links">
            {auth ? (
              <>
              <li data-tooltip-id="my-tooltip" data-tooltip-content="Home">
            <NavLink to = "">
                <BsHouseDoorFill />
            </NavLink>
            </li>
            {user && (
              <li data-tooltip-id="my-tooltip" data-tooltip-content="Perfil">
                <NavLink to = {`/users/${user._id}`}>
                  <BsFillCameraFill/>
                </NavLink>
              </li>
            )}

            <li data-tooltip-id="my-tooltip" data-tooltip-content="Informações">
              <NavLink to = "profile">
              <BsFillPersonFill />
              </NavLink>
            </li>

            <li>
              <span onClick = {handleLogout}>Sair  <IoIosLogOut /></span>
            </li>

              </>
            ) : (
              <>
              <li>
            <NavLink to = '/login'>Entrar</NavLink>
            </li>

            <li>
            <NavLink to = '/register'>Cadastrar</NavLink>
            </li>
              </>
            )}
            
        </ul>
        <Tooltip id="my-tooltip" />
    </nav>
  )
}

export default Navbar