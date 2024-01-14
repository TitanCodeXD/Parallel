// React
import React from 'react'



// CSS
import './LikeContainer.css';
import {BsHeart, BsHeartFill, BsFillHeartPulseFill} from 'react-icons/bs'
import photoService from '../../services/photoService';

const LikeContainer = ({photo, user, handleLike}) => {



  return (
    <div className = 'like'>
        {photo.likes && user && (
            <>
                {photo.likes.includes(user._id) ? (
                    <BsHeartFill />
                ) : (
                    <BsHeart onClick = {() => handleLike(photo)}/>
                )}
                <p>{photo.likes.length} likes(s)</p>
            </>
        )}
    </div>
  )
}

export default LikeContainer