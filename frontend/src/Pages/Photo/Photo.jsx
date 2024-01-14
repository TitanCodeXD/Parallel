// React
import React from 'react'

// Config
import { uploads } from "../../utils/config";

// Components
import Loading from '../../Components/Loading/Loading';
import Message from '../../Components/Message/Message';
import { Link } from 'react-router-dom';
import PhotoItem from '../../Components/PhotoItem/PhotoItem';

// Hooks
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

// Redux
import { getPhoto, like } from '../../slices/photoSlice';

// CSS
import './Photo.css';
import LikeContainer from '../../Components/LikeContainer/LikeContainer';

const Photo = () => {
    const {id} = useParams()

    const dispatch = useDispatch();

    const {user} = useSelector((state) => state.auth);
    const {photo, loading, error, message} = useSelector((state) => state.photo);

    // Comentários

    // Load photo data
    useEffect(() => {
        dispatch(getPhoto(id));
    }, [dispatch, id]);


    const handleLike = () => {
      dispatch(like(photo._id));
    };

    if(loading){
        return <Loading />
    };

  return (

    <div id = "photo">
        <PhotoItem photo = {photo}/>
        <LikeContainer photo = {photo} user = {user} handleLike = {handleLike}/>
    </div>
  )
}

export default Photo