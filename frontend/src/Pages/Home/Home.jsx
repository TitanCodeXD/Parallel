// React
import React from 'react'

// Components
import LikeContainer from '../../Components/LikeContainer/LikeContainer';
import PhotoItem from '../../Components/PhotoItem/PhotoItem';
import { Link } from 'react-router-dom';
import Loading from '../../Components/Loading/Loading';
import Message from '../../Components/Message/Message';

// Hooks
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useResetComponentMessage } from '../../hooks/useResetComponentMessage';

// Redux
import { getPhotos, like } from '../../slices/photoSlice';

// CSS
import './Home.css';


const Home = () => {

  const dispatch = useDispatch();

  const resetMessage = useResetComponentMessage(dispatch);

  const {user} = useSelector((state) => state.auth);
  const {photos, loading, error, message} = useSelector((state) => state.photo);

  const [visiblePhotos, setVisiblePhotos] = useState(5); // Número inicial de fotos visíveis
  const [showLoading, setShowLoading] = useState(false);

  // Load all photos
  useEffect(() => {

    dispatch(getPhotos());

  }, [dispatch])

  // Like a photo
  const handleLike = (photo) => {

    dispatch(like(photo._id));

    resetMessage();
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      setShowLoading(true);
  
      // Adiando o aumento da variável visiblePhotos por 2 segundos
      setTimeout(() => {
        setVisiblePhotos((prevVisiblePhotos) => prevVisiblePhotos + 5);
        setShowLoading(false);
      }, 900);
    }
  };
  
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if(loading) {
    return <Loading />
  }

  return (


    <div id = "home">
      {photos && photos.slice(0, visiblePhotos).map((photo, index) => (
        <div key = {photo._id}>
          <PhotoItem photo = {photo}/>
          <LikeContainer photo = {photo} user = {user} handleLike = {handleLike}/>
          <div className = 'message-container'>
        {error && <Message msg = {error} type = "error"/>}
        {message && <Message msg = {message} type = "success"/>}
        </div>
          <Link className = 'btn' to = {`/photos/${photo._id}`}>Ver mais</Link>
          {(showLoading && index === visiblePhotos - 1) && <Loading />} {/* Exibe o componente Loading após cada 5 fotos */}
        </div>
      ))}
      {photos && photos.length === 0 && (
        <h2 className="no-photos">
          Ainda não há fotos publicadas, <Link to = {`/users/${user._Id}`}>Clique Aqui</Link>
        </h2>
      )}
    </div>
  )
}

export default Home