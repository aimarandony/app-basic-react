import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useFormik } from "formik";
import {
  getStudentById,
  createStudent,
  updateStudent,
} from "../services/StudentService";
import { getCities } from "../services/CityService";

export default function StudentForm() {
  const history = useHistory();
  let { id } = useParams();

  const [cities, setCities] = useState([]);
  const [alertSuccess, setAlertSuccess] = useState(false);
  const [alertError, setAlertError] = useState(false);

  const validate = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = "Nombre requerido.";
    } else if (values.name.length <= 2) {
      errors.name = "El nombre debe ser mayor a 2 dígitos.";
    }

    if (!values.lastName) {
      errors.lastName = "Apellido requerido.";
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      id: "",
      name: "",
      lastName: "",
      sex: "M",
      city: {
        id: "1",
      },
    },
    validate,
    onSubmit: (values) => {
      if (values.id === "") {
        console.log("insert", values);
        createStudent(values)
          .then(() => {
            setAlertSuccess(true);
            formik.resetForm();
            setTimeout(() => {
              setAlertSuccess(false);
            }, 3000);
          })
          .catch(() => {
            setAlertError(true);
            setTimeout(() => {
              setAlertError(false);
            }, 3000);
          });
      } else {
        console.log("update", values);
        updateStudent(values, values.id)
          .then(() => {
            setAlertSuccess(true);
            formik.resetForm();
            setTimeout(() => {
              setAlertSuccess(false);
            }, 3000);
          })
          .catch(() => {
            setAlertError(true);
            setTimeout(() => {
              setAlertError(false);
            }, 3000);
          });
      }
    },
  });

  const toStudent = () => {
    history.push("/student");
  };

  useEffect(() => {
    getCities().then((resp) => setCities(resp));

    if (id) {
      getStudentById(id).then((resp) => {
        console.log(resp);
        formik.setValues({
          id: resp.id,
          name: resp.name,
          lastName: resp.lastName,
          sex: resp.sex,
          city: {
            id: resp.city.id,
          },
        });
      });
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <h3>
        ESTUDIANTE
        <button className="btn btn-primary float-right" onClick={toStudent}>
          CANCELAR
        </button>
      </h3>
      <hr />
      <div className="container">
        <div className="card col-md-6 mx-auto">
          <div className="card-body">
            <form onSubmit={formik.handleSubmit}>
              <div className="form-group">
                <label>Nombre:</label>
                <input
                  type="text"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  className="form-control"
                />
                {formik.errors.name && formik.touched.name ? (
                  <div className="error-field">{formik.errors.name}</div>
                ) : null}
              </div>
              <div className="form-group">
                <label>Apellido:</label>
                <input
                  type="text"
                  name="lastName"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  className="form-control"
                />
                {formik.errors.lastName && formik.touched.lastName ? (
                  <div className="error-field">{formik.errors.lastName}</div>
                ) : null}
              </div>
              <div className="form-group">
                <div className="form-group">
                  <div className="custom-control custom-radio">
                    <input
                      type="radio"
                      id="M"
                      name="sex"
                      value="M"
                      onChange={formik.handleChange}
                      checked={formik.values.sex === "M" ? true : false}
                      className="custom-control-input"
                    />
                    <label className="custom-control-label" htmlFor="M">
                      Masculino
                    </label>
                  </div>
                  <div className="custom-control custom-radio">
                    <input
                      type="radio"
                      id="F"
                      name="sex"
                      value="F"
                      onChange={formik.handleChange}
                      checked={formik.values.sex === "F" ? true : false}
                      className="custom-control-input"
                    />
                    <label className="custom-control-label" htmlFor="F">
                      Femenino
                    </label>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <select
                  className="custom-select"
                  name="city.id"
                  value={formik.values.city.id}
                  onChange={formik.handleChange}
                >
                  {cities.map((data) => (
                    <option key={data.id} value={data.id}>
                      {data.name}
                    </option>
                  ))}
                </select>
              </div>
              <button type="submit" className="btn btn-success btn-block">
                GUARDAR
              </button>
            </form>
            {alertSuccess ? (
              <div className="alert alert-success mt-3 mb-0">
                <span>Guardado correctamente.</span>
              </div>
            ) : null}

            {alertError ? (
              <div className="alert alert-danger mt-3 mb-0">
                <span>Ocurrío un error al guardar.</span>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
