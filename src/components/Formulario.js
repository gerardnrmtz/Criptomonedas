import React, { useEffect, useState } from "react";
import axios from "axios";
import Criptomoneda from "./criptomoneda.js";
import Error from "./Error.js";

function Formulario({ guardarMoneda, guardarCriptomoneda }) {
  const [criptomonedas, guardarCriptomonedas] = useState([]);
  const [monedaCotizar, guardarMonedaCotizar] = useState("");
  const [criptoCotizar, guardarCriptoCotizar] = useState("");
  const [error, guardarError] = useState(false);

  useEffect(() => {
    const consultarAPI = async () => {
      const url =
        "https://min-api.cryptocompare.com/data/top/totaltoptiervolfull?limit=15&tsym=USD";
      const resultado = await axios.get(url);
      //colocar respuesta en el state
      guardarCriptomonedas(resultado.data.Data);
    };
    consultarAPI();
  }, []);
  //Validar que el usuario llene ambos campos
  const handleSubmit = e => {
    e.preventDefault();
    //Validar si ambos campos estan llenos
    if (monedaCotizar === "" || criptoCotizar === "") {
      guardarError(true);
      return;
    }

    //Pasar los datos al componente principal

    guardarError(false);
    guardarMoneda(monedaCotizar);
    guardarCriptomoneda(criptoCotizar);
    
  };
  const componente = error ? (
    <Error mensaje="Ambos campos son obligatorios" />
  ) : null;
  return (
    <form onSubmit={handleSubmit}>
      {componente}
      <div className="row">
        <label>Elige tu Moneda</label>
        <select
          className="u-full-width"
          onChange={e => guardarMonedaCotizar(e.target.value)}
        >
          <option value="">Elige Tu Moneda</option>
          <option value="USD">Dolar Estadounidense</option>
          <option value="MXN">Peso Mexicano</option>
          <option value="GBP">Libra</option>
          <option value="EUR">Euro</option>
        </select>
      </div>
      <div className="row">
        <label>Elige tu Criptomoneda</label>
        <select
          className="u-full-width"
          onChange={e => guardarCriptoCotizar(e.target.value)}
        >
          <option value="">Elige Tu Criptomoneda</option>
          {criptomonedas.map(criptomoneda => (
            <Criptomoneda
              key={criptomoneda.CoinInfo.Id}
              criptomoneda={criptomoneda}
            />
          ))}
        </select>
      </div>
      <input
        type="submit"
        className="button-primary u-full-width"
        value="Calcular"
      />
    </form>
  );
}
export default Formulario;
