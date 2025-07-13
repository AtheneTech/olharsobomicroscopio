import React, { useState } from "react";
import emailjs from "emailjs-com";
import AnimatedPopup from "./AnimatedPopup";
import '../styles/VisitForm.css';


export default function VisitForm() {
  const [success, setSuccess] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [popup, setPopup] = useState({ show: false, type: "", message: "" });

  const validateForm = (formData) => {
    const errors = {};
    if (!formData.get("nome")) errors.nome = "Nome é obrigatório.";
    if (!formData.get("email")) errors.email = "E-mail é obrigatório.";
    if (!formData.get("escola")) errors.escola = "Escola / Instituição é obrigatória.";
    if (!formData.get("nivel_ensino")) errors.nivel_ensino = "Nível de ensino é obrigatório.";
    if (!formData.get("cidade_estado")) errors.cidade_estado = "Cidade / Estado é obrigatório.";
    if (!formData.get("data_desejada")) errors.data_desejada = "Data desejada é obrigatória.";
    if (!formData.get("objetivo")) errors.objetivo = "Objetivo/Motivo da visita é obrigatório.";
    return errors;
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

    const templateParams = {
      nome: formData.get("nome"),
      email: formData.get("email"),
      escola: formData.get("escola"),
      nivel_ensino: formData.get("nivel_ensino"),
      cidade_estado: formData.get("cidade_estado"),
      data_desejada: formData.get("data_desejada"),
      objetivo: formData.get("objetivo"),
    };

    try {
  await emailjs.send("athene_mic25",        
        "template_hfiwpnm",  
        templateParams,
        "RcLK9pCLZ0QoIz_3m");
  setPopup({ show: true, type: "success", message: "Formulário enviado com sucesso!" });
  e.target.reset();
} catch (error) {
  setPopup({ show: true, type: "error", message: "Erro ao enviar: " + error.message });
}
  };

  return (
   <div className="visit-container">
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
          <input type="text" name="nome" />
          {formErrors.nome && <p className="error-msg">{formErrors.nome}</p>}
        </div>
        <div>
          <label>E-mail</label>
          <input type="email" name="email" />
          {formErrors.email && <p className="error-msg">{formErrors.email}</p>}
        </div>
      </div>

      <div className="grid-2">
        <div>
          <label>Escola / Instituição</label>
          <input type="text" name="escola" />
          {formErrors.escola && <p className="error-msg">{formErrors.escola}</p>}
        </div>
        <div>
          <label>Nível de ensino</label>
          <select name="nivel_ensino" defaultValue="">
            <option value="" disabled>Selecione o nível de ensino</option>
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
          <input type="text" name="cidade_estado" />
          {formErrors.cidade_estado && <p className="error-msg">{formErrors.cidade_estado}</p>}
        </div>
        <div>
          <label>Data desejada</label>
          <input type="date" name="data_desejada" />
          {formErrors.data_desejada && <p className="error-msg">{formErrors.data_desejada}</p>}
        </div>
      </div>
    </div>

    <div className="form-textarea">
      <label>Objetivo/Motivo da visita</label>
      <textarea
        name="objetivo"
        placeholder="Conte um pouco sobre o interesse da escola, horários ideais, quantidade de estudantes e outros detalhes"
      ></textarea>
      {formErrors.objetivo && <p className="error-msg">{formErrors.objetivo}</p>}
    </div>
  </div>

  <button type="submit">QUERO VISITAR</button>
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
