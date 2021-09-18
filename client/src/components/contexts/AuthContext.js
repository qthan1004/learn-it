//QUẢN LÝ TOÀN BỘ TRẠNG THÁI LIÊN QUAN ĐẾN NGƯỜI DÙNG
import { createContext, useReducer, useEffect } from "react";
import { authReducer } from "../reducers/authReducer";
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from "./constains.js";
import setAuthToken from "../utils/setAuthToken";
import axios from "axios";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [authState, dispacth] = useReducer(authReducer, {
    //TRẠNG THÁI BAN ĐẦU
    authLoading: true,
    isAuthenticated: false, //CHƯA XÁC THỰC USER
    user: null, // CHƯA CÓ THÔNG TIN NG DÙNG
  });

  //AUTHENCIATED USER
  const loadUser = async () => {
    if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
      setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME]);
    }

    try {
      const response = await axios.get(`${apiUrl}auth`);

      if (response.data.success) {
        dispacth({
          type: "SET_AUTH",
          payload: {
            isAuthenticated: true,
            user: response.data.user,
          },
        });
      }
    } catch (error) {
      localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
      setAuthToken(null);
      dispacth({
        type: "SET_AUTH",
        payload: {
          isAuthenticated: false,
          user: null,
        },
      });
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  //LOGIN
  const loginUser = async (userForm) => {
    try {
      const response = await axios.post(`${apiUrl}auth/login`, userForm);
      if (response.data.success) {
        localStorage.setItem(
          LOCAL_STORAGE_TOKEN_NAME,
          response.data.accessToken
        );
        await loadUser();
        return response.data;
      }
    } catch (error) {
      if (error.response.data) {
        return error.response.data;
      } else return { success: false, messeage: error.messeage };
    }
  };

  //LOGOUT USER
  const logoutUser = () => {
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
    dispacth({
      type: "SET_AUTH",
      payload: {
        isAuthenticated: false,
        user: null,
      },
    });
  };

  //REGISTER USER
  const registerUser = async (userForm) => {
    try {
      const response = await axios.post(`${apiUrl}auth/register`, userForm);
      if (response.data.success) {
        localStorage.setItem(
          LOCAL_STORAGE_TOKEN_NAME,
          response.data.accessToken
        );
        await loadUser();
        return response.data;
      }
    } catch (error) {
      if (error.response.data) {
        return error.response.data;
      } else return { success: false, messeage: error.messeage };
    }
  };

  //CONTEXT DATA

  const AuthContextData = { loginUser, authState, registerUser, logoutUser };

  //RETURN PROVIDER

  return (
    <AuthContext.Provider value={AuthContextData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
