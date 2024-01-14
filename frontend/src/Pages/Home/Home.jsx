// React
import React from 'react'

// Components
import LikeContainer from '../../Components/LikeContainer/LikeContainer';
import PhotoItem from '../../Components/PhotoItem/PhotoItem';
import { Link } from 'react-router-dom';
import Loading from '../../Components/Loading/Loading';

// Hooks
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useResetComponentMessage } from '../../hooks/useResetComponentMessage';

// Redux
import { getPhotos, like } from '../../slices/photoSlice';

// CSS
import './Home.css';


const Home = () => {

  const dispatch = useDispatch();

  const resetMessage = useResetComponentMessage();

  const {user} = useSelector((state) => state.auth);
  const {photos, loading} = useSelector((state) => state.photo);

  // Load all photos
  useEffect(() => {

    dispatch(getPhotos());

  }, [dispatch])

  // Like a photo
  const handleLike = (photo) => {

    dispatch(like(photo._id))

    resetMessage();
  }

  if(loading) {
    return <Loading />
  }

  return (


    <div>Home</div>
  )
}

export default Home