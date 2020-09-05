import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import { Input, Button  } from "antd";
import { UserOutlined, LockOutlined } from '@ant-design/icons'

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
      console.log(values); 
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
      history.push("/student/form");
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
              <Input
                type="text"
                name="username"
                value={formik.values.username}
                onChange={formik.handleChange}
                placeholder="Escriba su usuario"
                prefix={<UserOutlined/>}
              />
              {formik.errors.username && formik.touched.username ? (
                <div className="error-valid">{formik.errors.username}</div>
              ) : null}
            </div>
            <div className="form-group">
              <label>Contraseña</label>
              <Input.Password
                type="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                placeholder="Escriba su contraseña"
                prefix={<LockOutlined/>}
              />
              {formik.errors.password && formik.touched.password ? (
                <div className="error-valid">{formik.errors.password}</div>
              ) : null}
            </div>
            <Button type="primary" htmlType="submit" block>INGRESAR</Button>
            {/* <button type="submit" className="btn btn-primary btn-block">
              INGRESAR
            </button> */}
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
