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

// CSS e Animation e Icons
import './Auth.css';
import { MdAlternateEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import Lottie from 'lottie-react';
import animationData from '../../assets/Login animation.json';

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
    
    <div className = 'container-logo'>
      <div className = 'login-animation'>
      <Lottie 
      animationData = {animationData}
      loop = {false}
      speed = {0.5}
      style={{ width: 900, height: 700 }}/>
      </div>
      <div id = "login">
      <h2><Logo height = "70" width = "200"/></h2>
      <p className = 'subtitle'>Faça o login para ver o que há de novo.</p>
      <form onSubmit = {handleSubmit}>

      <div className = 'email-container'>
      <MdAlternateEmail />
      <input type = "text" placeholder = 'Email' onChange = {(e) => setEmail(e.target.value)} value = {email || ""}></input>
      </div>

      <div className = 'password-container'>
      <RiLockPasswordLine />
      <input type = "password" placeholder = 'Senha' onChange = {(e) => setPassword(e.target.value)} value = {password || ""}></input>
      </div>
 

      {!loading && <input type = "submit" value = "Entrar"></input>}
      {loading && <input type = "submit" value = "Aguarde..." disabled></input>}
      {error && <Message msg = {error} type = "error"/>}
      </form>
      <p>Não tem uma conta ainda? <Link to = "/register">Clique aqui.</Link></p>
    </div>
    </div>
  )
}

export default Login