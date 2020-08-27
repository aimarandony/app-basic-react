import React, { useState, useEffect } from "react";
import { getStudents } from "../services/StudentService";
import { useHistory } from "react-router-dom";

export default function Student() {
  const history = useHistory();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const listar = () => {
    getStudents().then((resp) => {
      setStudents(resp);
      setLoading(false);
    });
  };

  useEffect(() => {
    listar();
  }, []);

  const toStudentForm = () => {
    history.push("/student/form");
  };
  const studentFormById = (id) => {
    history.push(`/student/form/${id}`);
  };

  return (
    <div>
      <h3>
        ESTUDIANTE
        <button className="btn btn-primary float-right" onClick={toStudentForm}>
          + NUEVO
        </button>
      </h3>
      <hr />
      <div className="container">
        <div className="buttons-export mb-3">
        <a className="btn btn-danger" href="https://basic-apirest-spring.herokuapp.com/api/students/pdf">
          EXPORTAR A PDF
        </a>
        <a className="btn btn-success ml-3" href="https://basic-apirest-spring.herokuapp.com/api/students/excel">
          EXPORTAR A EXCEL
        </a>
        </div>
        <div className="table-responsive">
          <table className="table table-hover table-striped">
            <thead className="thead-dark text-center">
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Sexo</th>
                <th>Ciudad</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {loading || students === null ? (
                <tr>
                  <td colSpan="6">
                    <h2>Cargando....</h2>
                  </td>
                </tr>
              ) : students.length > 0 ? (
                students.map((data) => (
                  <tr key={data.id}>
                    <td>{data.id}</td>
                    <td>{data.name}</td>
                    <td>{data.lastName}</td>
                    <td>{data.sex === "M" ? "Masculino" : "Femenino"}</td>
                    <td>{data.city.name}</td>
                    <td>
                      <button
                        className="btn btn-warning btn-sm"
                        onClick={() => studentFormById(data.id)}
                      >
                        <i className="fas fa-pen"></i>
                      </button>
                      <button className="btn btn-info btn-sm">
                        <i className="fas fa-info"></i>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">
                    <h2>No hay estudiantes registrados</h2>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
