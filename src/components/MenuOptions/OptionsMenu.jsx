import React from "react";
import OpcionesMenu from "../../data/dataMenuOptions.js";

import "./OptionsMenu.css";

const OptionsMenu = () => {
  return (
    <section className="container--options">
      <div className="container--options--cards">
        {OpcionesMenu.map((opcion) => (
          <a key={opcion.id} href={opcion.path}>
            <div className="container--options--cards--item">{opcion.name}</div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default OptionsMenu;
