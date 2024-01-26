// React
import React from 'react'
import { Link } from 'react-router-dom';


// Config
import { uploads } from "../../utils/config";


// CSS
import './PhotoItem.css';


const PhotoItem = ({photo}) => {
  return (
    <div className = 'photo-item'>
        {photo.url && (
            <img src = {photo.url} alt = {photo.title}/>
        )}
        <h2>{photo.title}</h2>
        <p className = 'photo-author'>
            Publicada por: <Link to = {`/users/${photo.userId}`}> {photo.userName}</Link>
        </p>
    </div>
  )
}

export default PhotoItem