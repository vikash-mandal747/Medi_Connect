import { LOGIN_SUCCESS, LOGOUT } from "./actionType";

const initState = {
  token: localStorage.getItem("token") || "",
  role:  "",
};

export const reducer = (state = initState, { type, payload }) => {
  switch (type) {
    case LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      return { ...state, token: payload.token, role: payload.role };

    case LOGOUT:
      localStorage.removeItem("token");
      return { ...state, token: "", role: "" };

    default:
      return state;
  }
};
