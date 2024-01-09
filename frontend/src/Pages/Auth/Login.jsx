// React
import React from 'react'

// Components
import { Link } from 'react-router-dom';
import Message from '../../Components/Message/Message';
import Logo from '../../Components/Logo/Logo';

// Hooks
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Redux


// CSS
import './Auth.css';


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault()
  }


  return (

    <div id = "login">
      <h2><Logo height = "70" width = "200"/></h2>
      <p className = 'subtitle'>Faça o login para ver o que há de novo.</p>
      <form onSubmit = {handleSubmit}>
      <input type = "text" placeholder = 'email' onChange = {(e) => setEmail(e.target.value)} value = {email || ""}></input>
      <input type = "password" placeholder = 'Senha' onChange = {(e) => setPassword(e.target.value)} value = {password || ""}></input>
      <input type = "submit" value = "Entrar"></input>
      </form>
      <p>Não tem uma conta ainda? <Link to = "/register">Clique aqui.</Link></p>
    </div>
  )
}

export default Login