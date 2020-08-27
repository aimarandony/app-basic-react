const axios = require("axios").default;

async function getStudents() {
  const resp = await axios.get(
    `https://basic-apirest-spring.herokuapp.com/api/students`
  );
  return resp.data;
}

async function getStudentById(id) {
  const resp = await axios.get(
    `https://basic-apirest-spring.herokuapp.com/api/students/${id}`
  );
  return resp.data;
}

async function createStudent(data) {
  const resp = await axios.post(
    `https://basic-apirest-spring.herokuapp.com/api/students`,
    data
  );
  return resp.data;
}

async function updateStudent(data, id) {
  const resp = await axios.put(
    `https://basic-apirest-spring.herokuapp.com/api/students/${id}`,
    data
  );

  return resp.data;
}

export { getStudents, getStudentById, createStudent, updateStudent };
