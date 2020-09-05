import React, { useState, useEffect } from "react";
import { getStudents } from "../services/StudentService";
import { useHistory } from "react-router-dom";

import { Table, Button, Tooltip, Input } from "antd";
import {
  UserAddOutlined,
  FilePdfTwoTone,
  FileExcelTwoTone,
  EditOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";

export default function Student() {
  const history = useHistory();
  const [students, setStudents] = useState([]);

  const listar = () => {
    getStudents().then((resp) => {
      resp.forEach((data) => {
        data.sex = data.sex === "M" ? "Masculino" : "Femenino";
        data.key = data.id;
        data.nameCity = data.city.name;
      });
      console.log(resp);
      setStudents(resp);
    });
  };

  useEffect(() => {
    listar();
  }, []);

  const columns = [
    {
      title: "#",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Apellido",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Sexo",
      dataIndex: "sex",
      key: "sex",
      filters: [
        {
          text: "Masculino",
          value: "Masculino",
        },
        {
          text: "Femenino",
          value: "Femenino",
        },
      ],
      filterMultiple: false,
      onFilter: (value, record) => {
        return record.sex.indexOf(value) === 0;
      },
      sorter: (a, b) => a.sex.length - b.sex.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Ciudad",
      dataIndex: "nameCity",
      key: "nameCity",
    },
    {
      title: "Acciones",
      key: "action",
      render: (record) => (
        <div>
          <Tooltip title="Editar">
            <Button
              type="link"
              size="small"
              onClick={() => studentFormById(record.id)}
            >
              <EditOutlined />
            </Button>
          </Tooltip>
          <Tooltip title="Información">
            <Button
              type="link"
              size="small"
              onClick={() => console.log(filterTable)}
            >
              <InfoCircleOutlined />
            </Button>
          </Tooltip>
        </div>
      ),
    },
  ];

  const toStudentForm = () => {
    history.push("/student/form");
  };
  const studentFormById = (id) => {
    history.push(`/student/form/${id}`);
  };

  const [filterTable, setFilterTable] = useState(null);

  const searchTable = (value) => {
    console.log("PASS", { value });

    setFilterTable(
      students.filter((o) =>
        Object.keys(o).some((k) =>
          String(o[k]).toLowerCase().includes(value.toLowerCase())
        )
      )
    );
  };

  return (
    <div>
      <h3>
        ESTUDIANTE
        <Tooltip title="Nuevo Estudiante">
          <Button
            className="float-right d-flex"
            onClick={toStudentForm}
            shape="round"
            icon={<UserAddOutlined />}
          />
        </Tooltip>
      </h3>
      <hr />
      <div className="container">
        <div className="buttons-export d-flex mb-3">
          <a href="https://basic-apirest-spring.herokuapp.com/api/students/pdf">
            <Tooltip title="Exportar a PDF">
              <Button
                className="d-flex justify-content-center align-items-center"
                type="dashed"
                icon={<FilePdfTwoTone twoToneColor="#ff0039" />}
              />
            </Tooltip>
          </a>
          <a href="https://basic-apirest-spring.herokuapp.com/api/students/excel">
            <Tooltip title="Exportar a Excel">
              <Button
                className="d-flex justify-content-center align-items-center"
                type="dashed"
                icon={<FileExcelTwoTone twoToneColor="#3fb618" />}
              />
            </Tooltip>
          </a>
        </div>
        <Input.Search
          className="mb-2"
          placeholder="Buscar por ..."
          onSearch={searchTable}
        />
        <Table
          dataSource={filterTable === null ? students : filterTable}
          columns={columns}
          pagination={{ pageSize: 4 }}
        />
      </div>
    </div>
  );
}
