import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import { store } from "../redux/store";
import { updateAccessToken } from "../redux/authSlice";

// Set config defaults when creating the instance
const instance = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true,
});

instance.defaults.withCredentials = true;

//Gan access token vao header
// instance.interceptors.request.use(
//   (config) => {
//     const state = store.getState();
//     const token = state.auth.login?.currentUser?.token;
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

const refreshToken = async () => {
  try {
    const state = store.getState();
    const currentUser = state.auth.login?.currentUser;
    const token = currentUser?.token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const res = await axios.post("http://localhost:8080/api/v1/refresh", null, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

// Add a request interceptor
instance.interceptors.request.use(
  async function (config) {
    const state = store.getState();
    const currentUser = state.auth.login?.currentUser;
    if (currentUser && currentUser.token) {
      const decodedToken = jwtDecode(currentUser.token);
      // Check if the token is expired
      if (decodedToken.exp < Date.now() / 1000) {
        const data = await refreshToken();
        if (data && data.access_token) {
          store.dispatch(updateAccessToken(data.access_token));
          config.headers.Authorization = `Bearer ${data.access_token}`;
        }
      } else {
        config.headers.Authorization = `Bearer ${currentUser.token}`;
      }
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const status = (error && error.response && error.response.status) || 500;
    console.log(status);

    switch (status) {
      // authentication (token related issues)
      case 401: {
        toast.error("Unauthorized access. Please log in.");
        // window.location.href = "/login";
        return error.response.data;
      }

      // forbidden (permission related issues)
      case 403: {
        toast.error("You dont have the permission to access this resource...");
        return Promise.reject(error);
      }

      // bad request
      case 400: {
        return Promise.reject(error);
      }

      // not found
      case 404: {
        return Promise.reject(error);
      }

      // conflict
      case 409: {
        return Promise.reject(error);
      }

      // unprocessable
      case 422: {
        return Promise.reject(error);
      }

      // generic api error (server related) unexpected
      default: {
        return Promise.reject(error);
      }
    }
  }
);

export default instance;
