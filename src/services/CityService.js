const axios = require("axios").default;

async function getCities() {
  const resp = await axios.get(
    "https://basic-apirest-spring.herokuapp.com/api/cities"
  );
  return resp.data;
}

export { getCities };
