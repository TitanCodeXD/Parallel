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
import {login, reset} from '../../slices/authSlice';

// CSS
import './Auth.css';


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const {loading, error} = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault()

    const user = {
      email,
      password
    }

    dispatch(login(user));
  };

  // Clean all auth states
  useEffect(() => {
    dispatch(reset());
  }, [dispatch])


  return (

    <div id = "login">
      <h2><Logo height = "70" width = "200"/></h2>
      <p className = 'subtitle'>Faça o login para ver o que há de novo.</p>
      <form onSubmit = {handleSubmit}>
      <input type = "text" placeholder = 'Email' onChange = {(e) => setEmail(e.target.value)} value = {email || ""}></input>
      <input type = "password" placeholder = 'Senha' onChange = {(e) => setPassword(e.target.value)} value = {password || ""}></input>
      {!loading && <input type = "submit" value = "Entrar"></input>}
      {loading && <input type = "submit" value = "Aguarde..." disabled></input>}
      {error && <Message msg = {error} type = "error"/>}
      </form>
      <p>Não tem uma conta ainda? <Link to = "/register">Clique aqui.</Link></p>
    </div>
  )
}

export default Login