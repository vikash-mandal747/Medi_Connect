import api from "../api";
import { LOGIN_SUCCESS, LOGOUT } from "./actionType";

/* ----------  async actions with redux‑thunk ---------- */

// LOGIN
export const login = (credentials) => async (dispatch) => {
  const res = await api.post("/users/login", credentials);
  const token = res.data.token;
  const { role } = JSON.parse(atob(token.split(".")[1]));
  dispatch({ type: LOGIN_SUCCESS, payload: { token, role } });
};

// SIGNUP
export const signup = (data) => api.post("/users/signup", data);

// LOGOUT
export const logout = () => ({ type: LOGOUT });
