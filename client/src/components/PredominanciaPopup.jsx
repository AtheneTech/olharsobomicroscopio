import "../styles/PredominanciaPopup.css";

export default function PredominanciaPopup({ titulo, dados }) {
  return (
    <div className="doenca-popup">
      <div className="doenca-header">
        <div className="barra-laranja" />
        <h2 className="doenca-titulo">{titulo}</h2>
      </div>
      <ul className="doenca-lista">
        {dados.map((item, i) => (
          <li key={i}>
            <strong>{item.label}:</strong> {item.valor}
          </li>
        ))}
      </ul>
    </div>
  );
}
