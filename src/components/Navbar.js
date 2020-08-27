import React from "react";
import { Link } from "react-router-dom";

export default function Navbar({ auth, setAuth }) {
  const logout = () => {
    localStorage.removeItem("user");
    setAuth(false);
  };

  return (
    <div className="navbar bg-primary" style={display(auth)}>
      <ul>
        <li></li>
        <li>
          <Link to="/home">INICIO</Link>
        </li>
        <li>
          <Link to="/student">ESTUDIANTE</Link>
        </li>
      </ul>
      <button className="btn btn-secondary btn-block" onClick={logout}>
        CERRAR SESIÖN
      </button>
    </div>
  );
}

function display(auth) {
  return {
    display: auth ? "block" : "none",
  };
}
