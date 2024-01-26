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
import { useResetComponentMessage } from '../../hooks/useResetComponentMessage';

// Redux
import { getPhoto, like, comment } from '../../slices/photoSlice';

// CSS
import './Photo.css';
import LikeContainer from '../../Components/LikeContainer/LikeContainer';

const Photo = () => {
    const {id} = useParams()

    const dispatch = useDispatch();

    const resetMessagee = useResetComponentMessage(dispatch);

    const {user} = useSelector((state) => state.auth);
    const {photo, loading, error, message} = useSelector((state) => state.photo);

    // Comentários
    const [commentText, setCommentText] = useState("");

    // Load photo data
    useEffect(() => {
        dispatch(getPhoto(id));
    }, [dispatch, id]);


    // Insert a like
    const handleLike = () => {
      dispatch(like(photo._id));

      resetMessagee();
    };

    // Insert a comment
    const handleComment = (e) => {
      e.preventDefault();

      const commentData = {
        comment: commentText,
        id: photo._id
      }

      dispatch(comment(commentData));

      setCommentText("");

      resetMessagee();
    };

    if(loading){
        return <Loading />
    };

  return (

    <div id = "photo">
        <PhotoItem photo = {photo}/>
        <LikeContainer photo = {photo} user = {user} handleLike = {handleLike}/>
        <div className = 'message-container'>
        {error && <Message msg = {error} type = "error"/>}
        {message && <Message msg = {message} type = "success"/>}
        </div>
        <div className = 'comments'>
            {photo.comments && (
              <>
                <h3>Comentários: ({photo.comments.length})</h3>
            <form onSubmit = {handleComment}>
              <input type = "text" placeholder = 'Insira um comentário' onChange = {(e) => setCommentText(e.target.value)} value = {commentText || ""}/>
              <input type = "submit" value = "Enviar" />
            </form>
            {photo.comments.length === 0 && <p>Não há comentários...</p>}
            {photo.comments.map((comment) => (
                <div className = 'comment' key = {comment.comment}> 
                    <div className="author">
                      
                      { 
                         <img src = {comment.userImage} alt = {comment.userName}/>

                        }

                      <Link to = {`/users/${comment.userId}`}>
                        <p>{comment.userName}</p>
                      </Link>
                    </div>
                    <p>{comment.comment}</p>
                </div>
            ))}
              </>
            )}
        </div>
    </div>
  )
}

export default Photo