// React
import React from 'react'
import { Link, useResolvedPath } from 'react-router-dom';
import { useState, useEffect } from 'react';

// Redux
import {register, reset} from '../../slices/authSlice';
import { useSelector, useDispatch } from 'react-redux';

// CSS
import './Auth.css';

// Components
import Logo from '../../Components/Logo/Logo';
import Message from '../../Components/Message/Message';


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
    <div id = "register">
        <h2> <Logo height = "70" width = "200"/> </h2>
        <p className = 'subtitle'>Cadastre-se compartilhar momentos e ver as fotos de seus amigos.</p>
        <form onSubmit={handleSubmit}>
        <input type='text' placeholder='Nome' onChange = {(e) => setName(e.target.value)} value = {name || ''}></input>
        <input type='email' placeholder='E-mail' onChange = {(e) => setEmail(e.target.value)} value = {email || ''}></input>
        <input type='password' placeholder='Senha' onChange = {(e) => setPassword(e.target.value)} value = {password || ''}></input>
        <input type='password' placeholder='Confirme a Senha' onChange = {(e) => setConfirmPassword(e.target.value)} value = {confirmPassword || ''}></input>
        {!loading && <input type = "submit" value = "Cadastrar"></input>}
        {loading && <input type = "submit" value = "Aguarde..." disabled></input>}
        {error && <Message msg = {error} type = "error"/>}
        </form>

        <p>Já tem conta? <Link to = "/login">Clique aqui.</Link></p>
    </div>
  )
}

export default Register