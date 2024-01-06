// React
import React from 'react'
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
// CSS
import './Auth.css';


const Register = () => {



const handleSubmit = (e) => {
    e.preventDefault();
}


  return (
    <div>
        <h2>Parallel</h2>
        <p className = 'subtitle'>Cadastre-se compartilhar momentos e ver as fotos de seus amigos.</p>
        <form onSubmit={handleSubmit}>
        <input type='text' placeholder='Nome'></input>
        <input type='email' placeholder='E-mail'></input>
        <input type='password' placeholder='Senha'></input>
        <input type='password' placeholder='Confirme a Senha'></input>
        <input type = "submit" value = "Cadastrar"></input>
        </form>

        <p>Já tem conta? <Link to = "/login">Clique aqui.</Link></p>
    </div>
  )
}

export default Register