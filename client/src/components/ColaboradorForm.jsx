import React, { useState } from "react";
import emailjs from "emailjs-com";
import AnimatedPopup from "./AnimatedPopup";
import '../styles/ColaboradorForm.css'

export default function ColaboradorForm() {
  const [success, setSuccess] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [formErrors, setFormErrors] = useState({});
    const [popup, setPopup] = useState({ show: false, type: "", message: "" });

  const validateForm = (formData) => {
    const errors = {};
    if (!formData.get("nome")) errors.nome = "Nome é obrigatório.";
    if (!formData.get("email")) errors.email = "E-mail é obrigatório.";
    if (!formData.get("instituicao")) errors.instituicao = "Instituição é obrigatória.";
    if (!formData.get("cargo")) errors.cargo = "Cargo é obrigatório.";
    if (!formData.get("descricao")) errors.descricao = "Descrição é obrigatória.";
    if (!imageFile) errors.image = "Imagem é obrigatória.";
    if (!formData.get("consent")) errors.consent = "É necessário autorizar o uso da imagem.";
    return errors;
  };

  const uploadImageToCloudinary = async (file) => {
    const url = `https://api.cloudinary.com/v1_1/dkqkuehmq/upload`;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "preset_abc123");

    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (response.ok) {
      return data.secure_url;
    } else {
      throw new Error(data.error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const errors = validateForm(formData);

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    let imageUrl = null;


    try {
      if (imageFile) {
        imageUrl = await uploadImageToCloudinary(imageFile);
      }

      const templateParams = {
        nome: formData.get("nome"),
        email: formData.get("email"),
        instituicao: formData.get("instituicao"),
        cargo: formData.get("cargo"),
        descricao: formData.get("descricao"),
        consent: formData.get("consent") ? "Sim" : "Não",
        image_url: imageUrl,
      };

      await emailjs.send(
        "athene_mic25",
        "template_g7mx8eu",
        templateParams,
        "RcLK9pCLZ0QoIz_3m"
      );

      setPopup({ show: true, type: "success", message: "Formulário enviado com sucesso!" });
      setImagePreview(null);
      setImageFile(null);
      e.target.reset();

    } catch (error) {
       setPopup({ show: true, type: "error", message: "Erro ao enviar: " + error.message });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("A imagem deve ter no máximo 5MB.");
        e.target.value = null;
        setImageFile(null);
        setImagePreview(null);
        return;
      }
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <h1 className="form-title">Colaborador</h1>
        <p className="form-subtitle">Contribua com imagens para nossa exposição</p>
       <div className="divider2"></div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-grid">
            <div className="form-fields-left">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="nome">Nome</label>
                  <input type="text" id="nome" name="nome" />
                  {formErrors.nome && <p className="error-message">{formErrors.nome}</p>}
                </div>
                <div className="form-group">
                  <label htmlFor="email">E-mail</label>
                  <input type="email" id="email" name="email" />
                  {formErrors.email && <p className="error-message">{formErrors.email}</p>}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="instituicao">Instituição/Universidade</label>
                  <input type="text" id="instituicao" name="instituicao" />
                  {formErrors.instituicao && <p className="error-message">{formErrors.instituicao}</p>}
                </div>
                <div className="form-group">
                  <label htmlFor="cargo">Cargo ou área de atuação</label>
                  <input type="text" id="cargo" name="cargo" />
                  {formErrors.cargo && <p className="error-message">{formErrors.cargo}</p>}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="descricao">Descrição da imagem enviada</label>
                <textarea id="descricao" name="descricao" rows="4" placeholder="Descreva brevemente o que é a imagem, técnica usada, contexto, etc"></textarea>
                {formErrors.descricao && <p className="error-message">{formErrors.descricao}</p>}
              </div>

              <div className="form-consent">
                <input type="checkbox" id="consent" name="consent" />
                <label htmlFor="consent">Autorizo o uso da imagem enviada para fins da exposição</label>
              </div>
              {formErrors.consent && <p className="error-message">{formErrors.consent}</p>}
              
              <button type="submit" className="submit-button">ENVIAR</button>
            </div>

            <div className="upload-area-right">
              <label htmlFor="image-upload" className="upload-label">Upload de imagem</label>
              <div className="upload-box">
                <input type="file" id="image-upload" name="image" accept="image/*" onChange={handleImageChange} className="upload-input" />
                <label htmlFor="image-upload" className="upload-box-label">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Prévia da imagem" className="image-preview" />
                  ) : (
                    <>
                      <svg className="upload-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                      <p>Solte o arquivo ou faça <span className="upload-link">upload</span></p>
                      <p className="upload-size-limit">Tamanho máximo: 5GB</p>
                    </>
                  )}
                </label>
              </div>
              {formErrors.image && <p className="error-message">{formErrors.image}</p>}
            </div>
          </div>
        </form>

       <AnimatedPopup
         type={popup.type}
         message={popup.message}
         show={popup.show}
         onClose={() => setPopup({ ...popup, show: false })}
       />
      </div>
    </div>
  );
}
