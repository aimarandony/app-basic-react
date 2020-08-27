import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";

export default function Login({ auth, setAuth }) {
  const history = useHistory();
  const [alertValidate, setAlertValidate] = useState(false);

  const validate = (values) => {
    const errors = {};
    if (!values.username) {
      errors.username = "Usuario requerido.";
    }

    if (!values.password) {
      errors.password = "Contraseña requerida.";
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validate,
    onSubmit: (values) => {
      if (
        values.username.trim() === "admin" &&
        values.password.trim() === "admin"
      ) {
        localStorage.setItem("user", JSON.stringify(values));
        setAuth(true);
        history.push("/student");
      } else {
        setAlertValidate(true);
        setTimeout(() => setAlertValidate(false), 2000);
      }
    },
  });

  useEffect(() => {
    if (localStorage.getItem("user") !== null) {
      history.push("/student");
    }
  });

  return (
    <div className="c c-login" style={display(!auth)}>
      <div className="card">
        <div className="card-header">
          <h3 className="font-weight-bold text-center m-0">INICIAR SESIÓN</h3>
        </div>
        <div className="card-body">
          <form onSubmit={formik.handleSubmit}>
            <div className="form-group">
              <label>Usuario</label>
              <input
                type="text"
                name="username"
                onChange={formik.handleChange}
                value={formik.values.username}
                className={`form-control ${
                  formik.errors.username && formik.touched.username
                    ? "is-invalid"
                    : ""
                }`}
                placeholder="Escribe su usuario"
              />
              {formik.errors.username && formik.touched.username ? (
                <div className="invalid-feedback">{formik.errors.username}</div>
              ) : null}
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                className={`form-control ${
                  formik.errors.password && formik.touched.password
                    ? "is-invalid"
                    : null
                }`}
                placeholder="Escriba su password"
              />
              {formik.errors.password && formik.touched.password ? (
                <div className="invalid-feedback">{formik.errors.password}</div>
              ) : null}
            </div>
            <button type="submit" className="btn btn-primary btn-block">
              INGRESAR
            </button>
            {alertValidate ? (
              <div className="alert alert-warning mt-3 mb-0">
                <span>Credenciales no validas.</span>
              </div>
            ) : null}
          </form>
        </div>
      </div>
    </div>
  );
}

function display(auth) {
  return {
    display: auth ? "block" : "none",
  };
}
