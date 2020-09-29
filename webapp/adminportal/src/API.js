// utils/API.js

import axios from "axios";

export default axios.create({
  baseURL: "http://qaapifivebees.iassureit.com/",
  responseType: "json"
  

});
