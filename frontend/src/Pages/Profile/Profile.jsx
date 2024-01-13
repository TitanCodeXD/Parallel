// React
import React from 'react';

// Config
import { uploads } from '../../utils/config';

//Components
import Message from '../../Components/Message/Message';
import {Link} from "react-router-dom";
import Loading from '../../Components/Loading/Loading';

// Hooks
import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

// Redux
import { getUserDetails } from '../../slices/userSlice';
import { publishPhoto, resetMessage, getUserPhotos, deletePhoto, updatePhoto } from '../../slices/photoSlice';

// CSS, Icons and Tooltip
import './Profile.css';
import { Tooltip } from 'react-tooltip'
import { BsFillEyeFill, BsPencilFill, BsXLg, BsFillPersonFill  } from 'react-icons/bs';


const Profile = () => {

  const {id} = useParams();

  const dispatch = useDispatch();

  const {user, loading} = useSelector((state) => state.user) 
  const {user: userAuth} = useSelector((state) => state.auth)
  const {photos, loading: loadingPhoto, message: messagePhoto, error: errorPhoto} = useSelector((state) => state.photo);

  //States Inclusão
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");

  //States para edição
  const [editId, setEditId] = useState("");
  const [editImage, setEditImage] = useState("");
  const [editTitle, setEditTitle] = useState("");

  // New form and edit forms refs
    const newPhotoForm = useRef();
    const editPhotoForm = useRef();



  // Load user data
  useEffect(() => {
    dispatch(getUserDetails(id));
    dispatch(getUserPhotos(id));
  }, [dispatch, id])

  const handleFile = (e) => {
    const image = e.target.files[0]

    setImage(image)
    };

  const resetComponentMessage = () => {
    setTimeout(() => {
      dispatch(resetMessage())
  }, 5000);
  }

  const submitHandle = (e) => {
    e.preventDefault();

    const photoData = {
      title,
      image
    };

    // Build form data
    const formData = new FormData();

const photoFormData = Object.keys(photoData).forEach((key) => 
formData.append(key, photoData[key])
);

  formData.append("photo", photoFormData)

dispatch(publishPhoto(formData))

    setTitle("");

    resetComponentMessage();
  };

  // Delete a photo
  const handleDelete = (id) => {
    var confirmacao = window.confirm("Você tem certeza que deseja excluir esta foto?");
    if(confirmacao) {
      dispatch(deletePhoto(id));
      resetComponentMessage();
    }
  };

  // Show or hide forms
  const hideOrShowForms = () => {
    newPhotoForm.current.classList.toggle("hide")
    editPhotoForm.current.classList.toggle("hide")
  };


  // Update a photo
  const handleUpdate = (e) => {
    e.preventDefault();

    const photoData = {
      title: editTitle,
      id: editId
    }

    dispatch(updatePhoto(photoData))

    resetComponentMessage();

  };


  // Open edit form
  const handleEdit = (photo) => {

    if(editPhotoForm.current.classList.contains("hide")) {
      hideOrShowForms();
    }

    setEditId(photo._id);
    setEditTitle(photo.title);
    setEditImage(photo.image);


    const imagem = document.getElementById('imagem-edit');

    
        window.scrollTo({
            top: imagem,
            behavior: 'smooth'
  });
  };

  const handleCancelEdit = () => {
    hideOrShowForms();
  };


  if(loading) {
    return <Loading />
  }


  return (
    <div id = "profile">
        <div className = 'profile-header'>
          {user.profileImage && (
            <img 
            src = {`${uploads}/users/${user.profileImage}`} 
            alt = {user.name}
            /> 
          )}
          <div className = 'profile-description'>
            <h2>{user.name}  {id === userAuth._id && <Link to = "/profile">Editar Informações <BsFillPersonFill /></Link>}</h2> 
            <p>{user.bio}</p>
          </div>
        </div>
        {id === userAuth._id && (
          <>
          <div className = 'new-photo' ref = {newPhotoForm}>
          <h3>Compartilhe algum momento seu:</h3>
          <form onSubmit = {submitHandle}>
            <label>
              <span>Título para a foto:</span>
              <input type = "text" placeholder = 'Insira um título' onChange = {(e) => setTitle(e.target.value)} value = {title || ""}></input>
            </label>
            <label>
              <span>imagem:</span>
              <input type = "file" onChange = {handleFile}></input>
            </label>
            {!loading && <input type = "submit" value = "Postar!"></input>}
            {loadingPhoto && <input type = "submit" value = "Aguarde..." disabled></input>}
          </form>
          </div>




          <div className = 'edit-photo hide' ref ={editPhotoForm} id = "imagem-edit">
            <p>Editando:</p>
            {editImage && (
              <img 
              src = {`${uploads}/photos/${editImage}`} 
              alt = {editTitle}
              />
            )}
            <form onSubmit = {handleUpdate}>
            
              <input 
              type = "text" 
              placeholder = 'Insira o novo título'
              onChange = {(e) => setEditTitle(e.target.value)} 
              value = {editTitle || ""}></input>
          
              <input type = "submit" value = "Atualizar" />
              <button className = 'cancel-btn' onClick = {handleCancelEdit}>
                Cancelar edição
              </button>
            </form>
          </div>





          <div> 
          {errorPhoto && <Message msg = {errorPhoto} type = "error" />}
          {messagePhoto && <Message msg = {messagePhoto} type = "success" />}
          </div>
          </>
        )}
        <div className = 'user-photos'>
          <h2>Fotos publicadas:</h2>
          <div className = 'photos-container'>
          {photos && photos.map((photo) => (
            <div className="photo" key = {photo._id}>
              {photo.image && (<img 
              src = {`${uploads}/photos/${photo.image}`} 
              alt = {photo.title}
              />
              )}
              {id === userAuth._id ? (
                <div className = 'actions'> 
                  <Link to = {`/photos/${photo._id}`}>
                    <BsFillEyeFill data-tooltip-id="my-tooltip" data-tooltip-content="Vizualizar"/>
                  </Link>
                  <BsPencilFill data-tooltip-id="my-tooltip" data-tooltip-content="Editar" onClick = {() => handleEdit(photo)}/>  
                  <BsXLg onClick = {() => handleDelete(photo._id)} data-tooltip-id="my-tooltip" data-tooltip-content="Excluir"/>
                </div>
              ) : (<Link className = "btn" to = {`/photos/${photo._id}`}>
                Ver
                </Link>
                )}
            </div>
          ))}
          {photos.length === 0 && <p>Ainda não há fotos publicadas.</p>}
          </div>
        </div>
        <Tooltip id="my-tooltip" />
    </div>
  )
}

export default Profile