// React
import React from 'react'

// Icons
import { FaRegEdit } from "react-icons/fa";;

// Config
import { uploads } from '../../utils/config';

// Hooks
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Redux
import {profile, resetMessage} from '../../slices/userSlice';

//Components
import Message from '../../Components/Message/Message';

//  CSS
import './EditProfile.css';

const EditProfile = () => {

    const dispatch = useDispatch();

    const {user, message, error, loading} = useSelector((state) => state.user)


    // States
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [profileImage, setImagePorfile] = useState("");
    const [bio, setBio] = useState("");
    const [previewImage, setPreviewImage] = useState("");

    // Load user data
    useEffect(() => {
        dispatch(profile());
    }, [dispatch]);

    // Fill form with user data
    useEffect(() => {

        if(user) {
            setName(user.name);
            setEmail(user.email);
            setBio(user.bio);
        }
    }, [user])


    const handleSubmit = (e) => {
        e.preventDefault()
    };

  return (
    <div id = "edit-profile">
        <h2>Edite seus dados <FaRegEdit /></h2>
        <p className="subtitle">Adicione uma imagem de perfil e conte mais sobre você...</p>
        {/* Preview da imagem */}
        <form onSubmit = {handleSubmit}>
        <input type = "text" placeholder = "Nome" onChange = {(e) => setName(e.target.value)} value = {name || ""}></input>
        <input type = "email" placeholder = "Email" disabled value = {email || ""}></input>
        <label>
            <span>Imagem do Perfil:</span>
            <input type = "file"></input>
        </label>
        <label>
            <span>Bio:</span>
            <input type = "text" placeholder = 'Descrição do perfil' onChange = {(e) => setBio(e.target.value)} value = {bio || ""}></input>
        </label>
        <label>
            <span>Quer alterar sua senha?</span>
            <input type = "password" placeholder = 'Digite sua nova senha' onChange = {(e) => setPassword(e.target.value)} value = {password || ""}></input>
        </label>
        <input type = "submit" value = "Atualizar"></input>
        </form>
    </div>
  )
}

export default EditProfile