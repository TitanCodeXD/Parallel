// React
import React from 'react'

//  CSS
import './EditProfile.css';

const EditProfile = () => {


    const handleSubmit = (e) => {
        e.preventDefault()
    };

  return (
    <div id = "edit-profile">
        <h2>Edite seus dados</h2>
        <p className="subtitle">Adicione uma imagem de perfil e conte mais sobre você...</p>
        {/* Preview da imagem */}
        <form onSubmit = {handleSubmit}>
        <input type = "text" placeholder = "Nome"></input>
        <input type = "email" placeholder = "Email" disabled></input>
        <label>
            <span>Imagem do Perfil:</span>
            <input type = "file"></input>
        </label>
        <label>
            <span>Bio:</span>
            <input type = "text" placeholder = 'Descrição do perfil'></input>
        </label>
        <label>
            <span>Quer alterar sua senha?</span>
            <input type = "password" placeholder = 'Digite sua nova senha'></input>
        </label>
        <input type = "submit" value = "Atualizar"></input>
        </form>
    </div>
  )
}

export default EditProfile