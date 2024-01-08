// React
import React from 'react'
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
// CSS
import './Auth.css';
import Logo from '../../Components/Logo/Logo';


const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");


const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      name,
      email,
      password,
      confirmPassword
    };

    console.log(user);
};

  return (
    <div id = "register">
        <h2> <Logo height = "70" width = "200"/> </h2>
        <p className = 'subtitle'>Cadastre-se compartilhar momentos e ver as fotos de seus amigos.</p>
        <form onSubmit={handleSubmit}>
        <input type='text' placeholder='Nome' onChange = {(e) => setName(e.target.value)} value = {name || ''}></input>
        <input type='email' placeholder='E-mail' onChange = {(e) => setEmail(e.target.value)} value = {email || ''}></input>
        <input type='password' placeholder='Senha' onChange = {(e) => setPassword(e.target.value)} value = {password || ''}></input>
        <input type='password' placeholder='Confirme a Senha' onChange = {(e) => setConfirmPassword(e.target.value)} value = {confirmPassword || ''}></input>
        <input type = "submit" value = "Cadastrar"></input>
        </form>

        <p>Já tem conta? <Link to = "/login">Clique aqui.</Link></p>
    </div>
  )
}

export default Register