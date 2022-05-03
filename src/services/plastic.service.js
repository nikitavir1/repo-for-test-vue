import axios from "axios";
import authHeader from "./auth-header";
import { config } from "../services/config.js";

class PlasticService {
  goodsGet(pageNum, searchValue) {
    let res = new Promise(function(resolve, reject) {
      return axios({
        method: "GET",
        url: config.API_URL + "/goodsGet",
        params: { search: searchValue, count: 10, page: pageNum ? pageNum : 1 },
        headers: {
          ...authHeader(),
          "Content-Type": "application/json",
        },
      }).then((response) => {
        console.log("RESPONSE goodsGet", JSON.parse(response.data));
        resolve(JSON.parse(response.data));
      });
    });

    return res;
  }
}

export default new PlasticService();
