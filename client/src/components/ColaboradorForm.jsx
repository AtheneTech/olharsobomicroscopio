import React, { useState } from "react";
import emailjs from "emailjs-com";

export default function ColaboradorForm() {
  const [success, setSuccess] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [formErrors, setFormErrors] = useState({});

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const errors = validateForm(formData);

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});

    // Preparar os dados para o template EmailJS
    const templateParams = {
      nome: formData.get("nome"),
      email: formData.get("email"),
      instituicao: formData.get("instituicao"),
      cargo: formData.get("cargo"),
      descricao: formData.get("descricao"),
      consent: formData.get("consent") ? "Sim" : "Não",
    };

    emailjs
      .sendForm(
        "athene_mic25",      
        "SEU_TEMPLATE_ID",    
        e.target,
        "SEU_USER_ID"       
      )
      .then(
        (result) => {
          setSuccess(true);
          setImagePreview(null);
          e.target.reset(); // limpa o form
        },
        (error) => {
          alert("Erro ao enviar o formulário. Tente novamente mais tarde.");
        }
      );
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center p-4" style={{ backgroundImage: 'url("/background.jpg")' }}>
      <div className="bg-white rounded-xl shadow-lg p-10 w-full max-w-4xl relative">
        <h1 className="text-4xl font-black text-black mb-2">Colaborador</h1>
        <p className="text-lg text-black mb-6">Contribua com imagens para nossa exposição</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <input type="text" name="nome" placeholder="Nome" className="border p-2 rounded w-full" />
              {formErrors.nome && <p className="text-red-500 text-sm mt-1">{formErrors.nome}</p>}
            </div>
            <div>
              <input type="email" name="email" placeholder="E-mail" className="border p-2 rounded w-full" />
              {formErrors.email && <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>}
            </div>
            <div>
              <input type="text" name="instituicao" placeholder="Instituição/Universidade" className="border p-2 rounded w-full" />
              {formErrors.instituicao && <p className="text-red-500 text-sm mt-1">{formErrors.instituicao}</p>}
            </div>
            <div>
              <input type="text" name="cargo" placeholder="Cargo ou área de atuação" className="border p-2 rounded w-full" />
              {formErrors.cargo && <p className="text-red-500 text-sm mt-1">{formErrors.cargo}</p>}
            </div>
          </div>

          <div>
            <textarea
              name="descricao"
              placeholder="Descrição da imagem enviada (técnica usada, contexto, etc)"
              className="w-full border p-2 rounded"
              rows={4}
            ></textarea>
            {formErrors.descricao && <p className="text-red-500 text-sm mt-1">{formErrors.descricao}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Upload de imagem</label>
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-400 p-6 rounded-lg">
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                className="mb-2"
              />
              {imagePreview && (
                <img src={imagePreview} alt="Prévia da imagem" className="mb-2 max-w-xs max-h-48 object-contain border rounded" />
              )}
              {formErrors.image && <p className="text-red-500 text-sm mt-1">{formErrors.image}</p>}
              <p className="text-xs text-gray-500">Tamanho máximo: 5MB</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <input type="checkbox" id="consent" name="consent" className="w-4 h-4" />
            <label htmlFor="consent" className="text-sm text-gray-800">
              Autorizo o uso da imagem enviada para fins da exposição
            </label>
          </div>
          {formErrors.consent && <p className="text-red-500 text-sm mt-1">{formErrors.consent}</p>}

          <button type="submit" className="bg-black text-white py-2 px-6 rounded">ENVIAR</button>
        </form>

        {success && (
          <div className="absolute bottom-6 right-6 bg-white shadow-lg rounded-lg p-4 border-l-4 border-green-500">
            <p className="font-bold text-green-600 flex items-center mb-1">
              <span className="mr-2">✔️</span>
              Contribuição enviada com sucesso!
            </p>
            <p className="text-sm text-gray-800">
              Obrigada por colaborar com a exposição. Sua imagem foi recebida e será analisada pela curadoria. Entraremos em contato caso necessário!
            </p>
            <button onClick={() => setSuccess(false)} className="mt-2 px-4 py-1 bg-black text-white rounded text-sm">
              VOLTAR
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
