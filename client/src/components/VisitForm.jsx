import React, { useState, useEffect } from "react";
import emailjs from "emailjs-com";
import AnimatedPopup from "./AnimatedPopup";
import '../styles/VisitForm.css';

export default function VisitForm() {
  const [success, setSuccess] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [showClearConfirmation, setShowClearConfirmation] = useState(false);
  const [popup, setPopup] = useState({ show: false, type: "", message: "" });
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    escola: '',
    nivel_ensino: '',
    cidade_estado: '',
    data_desejada: '',
    objetivo: ''
  });

  // Chave para identificar os dados no localStorage
  const STORAGE_KEY = 'visitFormData';

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
    } catch (error) {
      console.error('Erro ao limpar localStorage:', error);
    }
  };

  // Carrega dados salvos ao montar o componente
  useEffect(() => {
    const savedFormData = loadFromLocalStorage(STORAGE_KEY);
    if (savedFormData) {
      setFormData(savedFormData);
    }
  }, []);

  // Salva dados do formulário no localStorage sempre que formData muda
  useEffect(() => {
    if (formData.nome || formData.email || formData.escola || formData.nivel_ensino || formData.cidade_estado || formData.data_desejada || formData.objetivo) {
      saveToLocalStorage(STORAGE_KEY, formData);
    }
  }, [formData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.nome) errors.nome = "Nome é obrigatório.";
    if (!formData.email) errors.email = "E-mail é obrigatório.";
    if (!formData.escola) errors.escola = "Escola / Instituição é obrigatória.";
    if (!formData.nivel_ensino) errors.nivel_ensino = "Nível de ensino é obrigatório.";
    if (!formData.cidade_estado) errors.cidade_estado = "Cidade / Estado é obrigatório.";
    if (!formData.data_desejada) errors.data_desejada = "Data desejada é obrigatória.";
    if (!formData.objetivo) errors.objetivo = "Objetivo/Motivo da visita é obrigatório.";
    return errors;
  };

  const handleGoBack = () => {
    window.history.back();
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

    const templateParams = {
      nome: formData.nome,
      email: formData.email,
      escola: formData.escola,
      nivel_ensino: formData.nivel_ensino,
      cidade_estado: formData.cidade_estado,
      data_desejada: formData.data_desejada,
      objetivo: formData.objetivo,
    };

    try {
      await emailjs.send(
        "athene_mic25",        
        "template_hfiwpnm",  
        templateParams,
        "RcLK9pCLZ0QoIz_3m"
      );
      
      setPopup({ show: true, type: "success", message: "Formulário enviado com sucesso!" });
      
      // Limpa os dados após envio bem-sucedido
      setFormData({
        nome: '',
        email: '',
        escola: '',
        nivel_ensino: '',
        cidade_estado: '',
        data_desejada: '',
        objetivo: ''
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

  // Função para limpar manualmente o formulário
  const clearForm = () => {
    setFormData({
      nome: '',
      email: '',
      escola: '',
      nivel_ensino: '',
      cidade_estado: '',
      data_desejada: '',
      objetivo: ''
    });
    setFormErrors({});
    clearLocalStorage();
  };

  return (
    <div className="visit-container">
      {/* Botão Voltar - Canto esquerdo */}
      <button onClick={handleGoBack} className="back-button-outside" style={{
        position: 'absolute',
        top: '20px',
        left: '20px',
        background: 'rgba(255, 255, 255, 0.9)',
        border: 'none',
        borderRadius: '50%',
        width: '48px',
        height: '48px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.3s ease',
        zIndex: 1000
      }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5"></path>
          <path d="M12 19l-7-7 7-7"></path>
        </svg>
      </button>

      <div className="visit-box">
        <h1>Visitante</h1>
        <p>Leve sua escola para a exposição</p>

        <div className="divider"></div>
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-fields">
              <div className="grid-2">
                <div>
                  <label>Nome</label>
                  <input 
                    type="text" 
                    name="nome" 
                    value={formData.nome}
                    onChange={handleInputChange}
                  />
                  {formErrors.nome && <p className="error-msg">{formErrors.nome}</p>}
                </div>
                <div>
                  <label>E-mail</label>
                  <input 
                    type="email" 
                    name="email" 
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                  {formErrors.email && <p className="error-msg">{formErrors.email}</p>}
                </div>
              </div>

              <div className="grid-2">
                <div>
                  <label>Escola / Instituição</label>
                  <input 
                    type="text" 
                    name="escola" 
                    value={formData.escola}
                    onChange={handleInputChange}
                  />
                  {formErrors.escola && <p className="error-msg">{formErrors.escola}</p>}
                </div>
                <div>
                  <label>Nível de ensino</label>
                  <select 
                    name="nivel_ensino" 
                    value={formData.nivel_ensino}
                    onChange={handleInputChange}
                  >
                    <option value="">Selecione o nível de ensino</option>
                    <option value="Educação Infantil">Educação Infantil</option>
                    <option value="Ensino Fundamental">Ensino Fundamental</option>
                    <option value="Ensino Médio">Ensino Médio</option>
                    <option value="Ensino Superior">Ensino Superior</option>
                    <option value="Outro">Outro</option>
                  </select>
                  {formErrors.nivel_ensino && <p className="error-msg">{formErrors.nivel_ensino}</p>}
                </div>
              </div>

              <div className="grid-2">
                <div>
                  <label>Cidade / Estado</label>
                  <input 
                    type="text" 
                    name="cidade_estado" 
                    value={formData.cidade_estado}
                    onChange={handleInputChange}
                  />
                  {formErrors.cidade_estado && <p className="error-msg">{formErrors.cidade_estado}</p>}
                </div>
                <div>
                  <label>Data desejada</label>
                  <input 
                    type="date" 
                    name="data_desejada" 
                    value={formData.data_desejada}
                    onChange={handleInputChange}
                  />
                  {formErrors.data_desejada && <p className="error-msg">{formErrors.data_desejada}</p>}
                </div>
              </div>
            </div>

            <div className="form-textarea">
              <label>Objetivo/Motivo da visita</label>
              <textarea
                name="objetivo"
                placeholder="Conte um pouco sobre o interesse da escola, horários ideais, quantidade de estudantes e outros detalhes"
                value={formData.objetivo}
                onChange={handleInputChange}
              ></textarea>
              {formErrors.objetivo && <p className="error-msg">{formErrors.objetivo}</p>}
            </div>
          </div>

          <div className="form-buttons">
            <button type="submit">QUERO VISITAR</button>
             <button type="button" onClick={() => setShowClearConfirmation(true)} className="clear-button" style={{ marginLeft: '10px', background: '#6b7280c9', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', fontSize: '15px' }}>
                  LIMPAR FORMULÁRIO
                </button>
          </div>
        </form>

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

            {showClearConfirmation && (
      <div className="confirmation-popup-container">
        <div className="confirmation-popup">
          <div className="confirmation-header">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="15" y1="9" x2="9" y2="15"></line>
              <line x1="9" y1="9" x2="15" y2="15"></line>
            </svg>
            <h3>Limpar formulário?</h3>
          </div>
          <p>Todos os dados preenchidos serão apagados. Tem certeza que deseja continuar?</p>
          <div className="confirmation-buttons">
            <button onClick={() => setShowClearConfirmation(false)} className="cancel-button">
              Cancelar
            </button>
            <button onClick={() => {
              clearForm();
              setShowClearConfirmation(false);
            }} className="confirm-button">
              Sim, limpar
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