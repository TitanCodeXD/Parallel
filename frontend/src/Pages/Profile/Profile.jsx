// React
import React from 'react';

// Config
import { uploads } from '../../utils/config';

//Components
import Message from '../../Components/Message/Message';
import {Link} from "react-router-dom";
import { BsFillEyeFill, BsPencilFill, BsXLg } from 'react-icons/bs';
import Loading from '../../Components/Loading/Loading';

// Hooks
import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

// Redux
import { getUserDetails } from '../../slices/userSlice';

// CSS
import './Profile.css';


const Profile = () => {

  const {id} = useParams();

  const dispatch = useDispatch();

  const {user, loading} = useSelector((state) => state.user) 
  const {user: userAuth} = useSelector((state) => state.auth)

  // New form and edit forms refs
    const newPhotoForm = useRef();
    const editPhotoForm = useRef();



  // Load user data
  useEffect(() => {
    dispatch(getUserDetails(id));
  }, [dispatch, id])

  const submitHandle = (e) => {
    e.preventDefault();
  };

  if(loading) {
    return <Loading />
  }


  return (
    <div id = "profile">
        <div className = 'profile-header'>
          {user.profileImage && (
            <img src = {`${uploads}/users/${user.profileImage}`} alt = {user.name}/>
          )}
          <div className = 'profile-description'>
            <h2>{user.name}</h2>
            <p>{user.bio}</p>
          </div>
        </div>
        {id === userAuth._id && (
          <>
          <div className = 'new-photo' ref = {newPhotoForm}></div>
          <h3>Compartilhe algum momento seu:</h3>
          <form onSubmit = {submitHandle}>
            <label>
              <span>Título para a foto:</span>
              <input type = "text" placeholder = 'Insira um título'></input>
            </label>
            <label>
              <span>imagem:</span>
              <input type = "file"></input>
            </label>
            <input type = "submit" value = "Postar!"></input>
          </form>
          </>
        )}
    </div>
  )
}

export default Profile