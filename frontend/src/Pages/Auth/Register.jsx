// React
import React from 'react'
import { Link, useResolvedPath } from 'react-router-dom';
import { useState, useEffect } from 'react';

// Redux
import {register, reset} from '../../slices/authSlice';
import { useSelector, useDispatch } from 'react-redux';


// Components
import Logo from '../../Components/Logo/Logo';
import Message from '../../Components/Message/Message';

// CSS and Icons
import './Auth.css';
import { CiUser } from "react-icons/ci";
import { MdAlternateEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import Lottie from 'lottie-react';
import animationData from '../../assets/Register animation.json';

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");


  const dispatch = useDispatch()

  const {loading, error} = useSelector((state) => state.auth);


const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      name,
      email,
      password,
      confirmPassword
    };

    console.log(user);
    dispatch(register(user));
};

// Clean all auth states
useEffect(() => {

  dispatch(reset());

}, [dispatch]);


  return (

    <div className = 'container-logo'> 
    <div className = 'login-animation'>
      <Lottie 
      animationData = {animationData}
      loop = {true}
      speed = {0.5}
      style={{ width: 900, height: 700 }}/>
      </div>
    <div id = "register">
        <h2> <Logo height = "70" width = "200"/> </h2>
        <p className = 'subtitle'>Cadastre-se compartilhar momentos e ver as fotos de seus amigos.</p>
        <form onSubmit={handleSubmit}>

        <div className = 'name-container'>
        <CiUser />
        <input type='text' placeholder='Nome' onChange = {(e) => setName(e.target.value)} value = {name || ''}></input>
        </div>
       
        <div className = 'email-container'>
        <MdAlternateEmail />
        <input type='email' placeholder='E-mail' onChange = {(e) => setEmail(e.target.value)} value = {email || ''}></input>
        </div>
       
        <div className = 'password-container'>
        <RiLockPasswordLine />
        <input type='password' placeholder='Senha' onChange = {(e) => setPassword(e.target.value)} value = {password || ''}></input>
        </div>
        
        <div className = 'confirmPassword-container'>
        <RiLockPasswordLine />
        <input type='password' placeholder='Confirme a Senha' onChange = {(e) => setConfirmPassword(e.target.value)} value = {confirmPassword || ''}></input>
        </div>
        
        {!loading && <input type = "submit" value = "Cadastrar"></input>}
        {loading && <input type = "submit" value = "Aguarde..." disabled></input>}
        {error && <Message msg = {error} type = "error"/>}
        </form>

        <p>Já tem conta? <Link to = "/login">Clique aqui.</Link></p>
    </div>
    </div>
  )
}

export default Register