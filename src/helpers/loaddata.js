import axios from "axios";

const base_url = "http://localhost:8000"

function loaddata() {
  const diseases = axios.request({
    method: 'get',
    url: `${base_url}/get-diseases/`,
  })
    .then((res) => res.data)
    .catch((err) => err);
  
  return diseases;
}

export default loaddata;