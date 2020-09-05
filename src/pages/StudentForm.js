import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useFormik } from "formik";
import {
  getStudentById,
  createStudent,
  updateStudent,
} from "../services/StudentService";
import { getCities } from "../services/CityService";

import { Input, Radio, Select, Button, Tooltip } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import * as Yup from "yup";

export default function StudentForm() {
  const history = useHistory();
  let { id } = useParams();

  const [cities, setCities] = useState([]);
  const [alertSuccess, setAlertSuccess] = useState(false);
  const [alertError, setAlertError] = useState(false);

  const validationSchema = Yup.object().shape({
    name: Yup.string().trim().required("Nombre requerido"),
    lastName: Yup.string().trim().required("Apellido requerido"),
    city: Yup.object().shape({
      id: Yup.number().nullable().required("Ciudad requerida"),
    }),
  });

  const formik = useFormik({
    initialValues: {
      id: "",
      name: "",
      lastName: "",
      sex: "M",
      city: {
        id: null,
      },
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
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
    console.log("use effect here");
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
        <Tooltip title="Regresar">
          <Button
            className="float-right d-flex"
            onClick={toStudent}
            shape="round"
            icon={<ArrowLeftOutlined />}
          />
        </Tooltip>
      </h3>
      <hr />
      <div className="container">
        <div className="card col-md-6 mx-auto">
          <div className="card-body">
            <form onSubmit={formik.handleSubmit}>
              <div className="form-group">
                <label>Nombre:</label>
                <Input
                  type="text"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                />
                {formik.errors.name && formik.touched.name ? (
                  <div className="error-field">{formik.errors.name}</div>
                ) : null}
              </div>
              <div className="form-group">
                <label>Apellido:</label>
                <Input
                  type="text"
                  name="lastName"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                />
                {formik.errors.lastName && formik.touched.lastName ? (
                  <div className="error-field">{formik.errors.lastName}</div>
                ) : null}
              </div>
              <div className="form-group">
                <label>Género:</label>
                <Radio.Group
                  name="sex"
                  value={formik.values.sex}
                  onChange={formik.handleChange}
                  className="w-100"
                >
                  <Radio.Button value="M">Masculino</Radio.Button>
                  <Radio.Button value="F">Femenino</Radio.Button>
                </Radio.Group>
              </div>
              <div className="form-group">
                <label>Ciudad:</label>

                <Select
                  showSearch
                  name="city.id"
                  placeholder="Selecciona una ciudad"
                  optionFilterProp="children"
                  style={{ width: "100%" }}
                  value={formik.values.city.id}
                  onChange={(text) => formik.setFieldValue("city.id", text)}
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {cities.map((data) => (
                    <Select.Option key={data.id} value={data.id}>
                      {data.name}
                    </Select.Option>
                  ))}
                </Select>
                {formik.errors.city && formik.touched.city ? (
                  <div className="error-field">{formik.errors.city.id}</div>
                ) : null}
              </div>
              <Button type="primary" htmlType="submit" block>
                GUARDAR
              </Button>
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

            <br />
            <div>{JSON.stringify(formik.values)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
