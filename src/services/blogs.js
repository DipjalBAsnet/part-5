import axios from "axios";
const baseUrl = "http://localhost:3003/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => {
    console.log("get req", response.data);
    return response.data;
  });
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const updateLikes = async (id, updatedData) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.put(`${baseUrl}/${id}`, updatedData, config);
  return response.data;
};

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  };

  await axios.delete(`${baseUrl}/${id}`, config);
};

export default { getAll, create, setToken, updateLikes, remove };
