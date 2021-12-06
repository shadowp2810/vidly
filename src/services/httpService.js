/*

*/
import axios from "axios";
import logger from "./logService";
import { toast } from "react-toastify";

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  //We pass the error here
  if (!expectedError) {
    logger.log(error);
    toast.error("An unexpected error occured");
  }

  return Promise.reject(error);
});

const exportedObject = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};

export default exportedObject;
