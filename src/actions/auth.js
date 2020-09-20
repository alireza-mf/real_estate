import axios from 'axios';
import { setAlert } from './alert';
import {
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT
} from './types';

export const loadUser = () => (dispatch, getState) => {

  axios
    .get('/api/current_user/', tokenConfig(getState))
    .then((res) => {
      dispatch({
        payload: res.data,
      });
    })
    .catch((err) => {
    });
};

export const login = (username, password) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
      "Accept": "application/json",
    },
  };

  // Request Body
  const body = JSON.stringify({ username, password });

  axios
    .post(`${process.env.REACT_APP_API_URL}/api/token-auth/`, body, config)
    .then((res) => {
      let data = res.data
      localStorage.setItem("token", data.token)
      dispatch({
        type: LOGIN_SUCCESS,
        payload: data.user,
      });
      dispatch(setAlert('Login successfully', 'success'));
    })
    .catch((err) => {
      dispatch(setAlert('Error Authenticating', 'error'));
      dispatch({
        type: LOGIN_FAIL,
      });
    });
};


export const signup = ({ username, password, email, firstName, lastName }) => (dispatch) => {
    // Headers
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
  
    // Request Body
    const body = JSON.stringify({ username, password, email, firstName, lastName });
    axios
      .post(`${process.env.REACT_APP_API_URL}/api/accounts/`, body, config)
      .then((res) => {
        dispatch({
          type: SIGNUP_SUCCESS,
          payload: res.data,
        });
        dispatch(setAlert("You have Signed up successfully", "success"))
      })
      .catch((err) => {
        dispatch(setAlert('Error Authenticating', 'error'));
        dispatch({
          type: SIGNUP_FAIL,
        });
      });
};

export const editprofile = ({ username, password, email, firstName, lastName }) => (dispatch) => {
    // Headers
    const config = {
      headers: {
        'Content-Type': 'application/json',
        "Accept": "application/json",
        "Authorization": `JWT ${localStorage.getItem("token")}`
      },
    };
  
    // Request Body
    const body = JSON.stringify({ username, password, email, firstName, lastName });
    axios
      .post(`${process.env.REACT_APP_API_URL}/api/accounts/current_user/`, body, config)

      .then((res) => {
        dispatch({
          payload: res.data,
        });
        dispatch(setAlert("User Profile Updated", "success"))
      })

      .catch((err) => {
        dispatch(setAlert('Error in Update', 'error'));
      });
};

export const uploadImage = ({image}) => dispatch => {
    let formData = new FormData()
    formData.append("image", image)
    axios.put(`${process.env.REACT_APP_API_URL}/api/accounts/upload_picture/`, formData,{
        headers: {
            "Content-Type": "multipart/form-data",
            "Accept": "application/json",
            "Authorization": `JWT ${localStorage.getItem("token")}`         
        },
    })
    .then(res => {
        dispatch(setAlert("Profile Picture Updated", "success"))

    })
    .catch((error)=>{
        dispatch(setAlert("Error in Profile Picture Update", "error"))
        console.error(error)
    })
}

export const logout = () => dispatch => {
    dispatch(setAlert('Logout successful.', 'success'));
    dispatch({ type: LOGOUT });
}

export const tokenConfig = (getState) => {
  // Get token from state
  const token = getState().auth.token;

  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // If token, add to headers config
  if (token) {
    config.headers['Authorization'] = `Token ${token}`;
  }

  return config;
};