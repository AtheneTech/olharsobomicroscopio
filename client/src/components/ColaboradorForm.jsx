import React, { useState, useEffect } from "react";
import emailjs from "emailjs-com";
import AnimatedPopup from "./AnimatedPopup";
import '../styles/ColaboradorForm.css'

export default function ColaboradorForm() {
  const [success, setSuccess] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [popup, setPopup] = useState({ show: false, type: "", message: "" });
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [formDataToSubmit, setFormDataToSubmit] = useState(null);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    instituicao: '',
    cargo: '',
    descricao: '',
    consent: false
  });

  // Chave para identificar os dados no localStorage
  const STORAGE_KEY = 'colaboradorFormData';
  const IMAGE_PREVIEW_KEY = 'colaboradorImagePreview';
  const IMAGE_FILE_KEY = 'colaboradorImageFile';

  // Função para salvar dados no localStorage
  const saveToLocalStorage = (key, data) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error('Erro ao salvar no localStorage:', error);
    }
  };

  // Função para carregar dados do localStorage
  const loadFromLocalStorage = (key) => {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Erro ao carregar do localStorage:', error);
      return null;
    }
  };

  // Função para limpar dados do localStorage
  const clearLocalStorage = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(IMAGE_PREVIEW_KEY);
      localStorage.removeItem(IMAGE_FILE_KEY);
    } catch (error) {
      console.error('Erro ao limpar localStorage:', error);
    }
  };

  // Converte arquivo para base64 para salvar no localStorage
  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  };

  // Converte base64 para arquivo
  const base64ToFile = (base64String, filename) => {
    const arr = base64String.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  // Carrega dados salvos ao montar o componente
  useEffect(() => {
    const loadSavedData = async () => {
      // Carrega dados do formulário
      const savedFormData = loadFromLocalStorage(STORAGE_KEY);
      if (savedFormData) {
        setFormData(savedFormData);
      }

      // Carrega preview da imagem
      const savedImagePreview = loadFromLocalStorage(IMAGE_PREVIEW_KEY);
      if (savedImagePreview) {
        setImagePreview(savedImagePreview);
      }

      // Carrega arquivo de imagem (se existir)
      const savedImageFile = loadFromLocalStorage(IMAGE_FILE_KEY);
      if (savedImageFile && savedImageFile.data && savedImageFile.filename) {
        try {
          const file = base64ToFile(savedImageFile.data, savedImageFile.filename);
          setImageFile(file);
        } catch (error) {
          console.error('Erro ao restaurar arquivo de imagem:', error);
        }
      }
    };

    loadSavedData();
  }, []);

  // Salva dados do formulário no localStorage sempre que formData muda
  useEffect(() => {
    if (formData.nome || formData.email || formData.instituicao || formData.cargo || formData.descricao || formData.consent) {
      saveToLocalStorage(STORAGE_KEY, formData);
    }
  }, [formData]);

  // Salva preview da imagem no localStorage
  useEffect(() => {
    if (imagePreview) {
      saveToLocalStorage(IMAGE_PREVIEW_KEY, imagePreview);
    }
  }, [imagePreview]);

  // Salva arquivo de imagem no localStorage
  useEffect(() => {
    const saveImageFile = async () => {
      if (imageFile) {
        try {
          const base64Data = await fileToBase64(imageFile);
          const fileData = {
            data: base64Data,
            filename: imageFile.name,
            size: imageFile.size,
            type: imageFile.type
          };
          saveToLocalStorage(IMAGE_FILE_KEY, fileData);
        } catch (error) {
          console.error('Erro ao salvar arquivo de imagem:', error);
        }
      }
    };

    saveImageFile();
  }, [imageFile]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.nome) errors.nome = "Nome é obrigatório.";
    if (!formData.email) errors.email = "E-mail é obrigatório.";
    if (!formData.instituicao) errors.instituicao = "Instituição é obrigatória.";
    if (!formData.cargo) errors.cargo = "Cargo é obrigatório.";
    if (!formData.descricao) errors.descricao = "Descrição é obrigatória.";
    if (!imageFile && !imagePreview) errors.image = "Imagem é obrigatória.";
    if (!formData.consent) errors.consent = "É necessário autorizar o uso da imagem.";
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
    const errors = validateForm();

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setShowConfirmation(true);
  };

  const handleConfirmSubmit = async () => {
    setShowConfirmation(false);
    
    let imageUrl = null;

    try {
      if (imageFile) {
        imageUrl = await uploadImageToCloudinary(imageFile);
      }

      const templateParams = {
        nome: formData.nome,
        email: formData.email,
        instituicao: formData.instituicao,
        cargo: formData.cargo,
        descricao: formData.descricao,
        consent: formData.consent ? "Sim" : "Não",
        image_url: imageUrl,
      };

      await emailjs.send(
        "athene_mic25",
        "template_g7mx8eu",
        templateParams,
        "RcLK9pCLZ0QoIz_3m"
      );

      setPopup({ show: true, type: "success", message: "Formulário enviado com sucesso!" });
      
      // Limpa os dados salvos após envio bem-sucedido
      setImagePreview(null);
      setImageFile(null);
      setFormData({
        nome: '',
        email: '',
        instituicao: '',
        cargo: '',
        descricao: '',
        consent: false
      });
      
      // Limpa o localStorage
      clearLocalStorage();

    } catch (error) {
      setPopup({ show: true, type: "error", message: "Erro ao enviar: " + error.message });
    }
  };

  const handleCancelSubmit = () => {
    setShowConfirmation(false);
  };

  const handleGoBack = () => {
    window.history.back();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("A imagem deve ter no máximo 5MB.");
        e.target.value = null;
        setImageFile(null);
        setImagePreview(null);
        // Remove dados da imagem do localStorage
        localStorage.removeItem(IMAGE_PREVIEW_KEY);
        localStorage.removeItem(IMAGE_FILE_KEY);
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

  // Função para limpar manualmente o formulário (opcional)
  const clearForm = () => {
    setFormData({
      nome: '',
      email: '',
      instituicao: '',
      cargo: '',
      descricao: '',
      consent: false
    });
    setImageFile(null);
    setImagePreview(null);
    setFormErrors({});
    clearLocalStorage();
  };

  return (
    <div className="form-container">
      <button onClick={handleGoBack} className="back-button-outside">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5"></path>
          <path d="M12 19l-7-7 7-7"></path>
        </svg>
      </button>

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
                  <input 
                    type="text" 
                    id="nome" 
                    name="nome" 
                    value={formData.nome}
                    onChange={handleInputChange}
                  />
                  {formErrors.nome && <p className="error-message">{formErrors.nome}</p>}
                </div>
                <div className="form-group">
                  <label htmlFor="email">E-mail</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                  {formErrors.email && <p className="error-message">{formErrors.email}</p>}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="instituicao">Instituição/Universidade</label>
                  <input 
                    type="text" 
                    id="instituicao" 
                    name="instituicao" 
                    value={formData.instituicao}
                    onChange={handleInputChange}
                  />
                  {formErrors.instituicao && <p className="error-message">{formErrors.instituicao}</p>}
                </div>
                <div className="form-group">
                  <label htmlFor="cargo">Cargo ou área de atuação</label>
                  <input 
                    type="text" 
                    id="cargo" 
                    name="cargo" 
                    value={formData.cargo}
                    onChange={handleInputChange}
                  />
                  {formErrors.cargo && <p className="error-message">{formErrors.cargo}</p>}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="descricao">Descrição da imagem enviada</label>
                <textarea 
                  id="descricao" 
                  name="descricao" 
                  rows="4" 
                  placeholder="Descreva brevemente o que é a imagem, técnica usada, contexto, etc"
                  value={formData.descricao}
                  onChange={handleInputChange}
                ></textarea>
                {formErrors.descricao && <p className="error-message">{formErrors.descricao}</p>}
              </div>

              <div className="form-consent">
                <input 
                  type="checkbox" 
                  id="consent" 
                  name="consent" 
                  checked={formData.consent}
                  onChange={handleInputChange}
                />
                <label htmlFor="consent">Autorizo o uso da imagem enviada para fins da exposição</label>
              </div>
              {formErrors.consent && <p className="error-message">{formErrors.consent}</p>}
              
              <div className="form-buttons">
                <button type="submit" className="submit-button">ENVIAR</button>
                <button type="button" onClick={clearForm} className="clear-button" style={{marginLeft: '10px', background: '#6b7280c9', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', fontSize: '15px'}}>
                  LIMPAR FORMULÁRIO
                </button>
              </div>
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

        {/* Popup de Confirmação */}
        {showConfirmation && (
          <div className="confirmation-popup-container">
            <div className="confirmation-popup">
              <div className="confirmation-header">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M9 12l2 2 4-4"></path>
                </svg>
                <h3>Confirmar envio</h3>
              </div>
              <p>Você tem certeza que deseja enviar o formulário? Verifique se todos os dados estão corretos.</p>
              <div className="confirmation-buttons">
                <button onClick={handleCancelSubmit} className="cancel-button">
                  Cancelar
                </button>
                <button onClick={handleConfirmSubmit} className="confirm-button">
                  Sim, enviar
                </button>
              </div>
            </div>
          </div>
        )}

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