import axios from "axios";
import { getAPI } from "./env";

const api = `${getAPI()}`;

export const reset = async () => {
  if (window.confirm("Reset database. All data will be deleted.\n이 작업은 되돌릴 수 없습니다.")) {
    try {
      await axios.get(`${api}/restart`);
      alert("Database successfully reset");
    } catch (error) {
      // TODO
    }
  }
}
