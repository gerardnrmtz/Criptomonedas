import React from "react";

const Cotizacion = ({ resultado }) => {
  if (Object.keys(resultado).length === 0) return null;

  return (
    <div className="resultado">
      <h2>Resultado</h2>
      <p className="precio">
        El precio es <span>{resultado.PRICE}</span>
      </p>
      <p className="precio">
        Precio mas alto del dia: <span>{resultado.HIGHDAY}</span>
      </p>
      <p className="precio">
        Precio mas bajo del dia: <span>{resultado.LOWDAY}</span>
      </p>
      <p className="precio">
        Variacion ultimas 24 horas: <span>{resultado.CHANGEPCT24HOUR}%</span>
      </p>
      <p className="precio">
        Ultima actualizacion: <span>{resultado.LASTUPDATE}</span>
      </p>
    </div>
  );
};
export default Cotizacion;
