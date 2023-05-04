import axios, { AxiosError } from 'axios';
import Cookies from 'js-cookie';

/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-alert */
/* eslint-disable no-console */

type ErrorResponse = {
  details: string;
}

/**
 * Method to handle error when making requests to the server
 * @param error
 * @returns call to R-N alert with error message
 */
export const handleError = (error: AxiosError) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.error(error.response.data);
    console.error(error.response.status);

    if ((error.response.data as ErrorResponse).details === 'jwt expired') {
      return null;
    }

    if ((error.response.data as ErrorResponse).details) {
      return alert(`${(error.response.data as ErrorResponse).details} ${error.response.status}`);
    }

    return alert(`Status code: ${error.response.status}`);
  } if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.error(error.request);
    return alert('No response from the server');
  }

  // Something happened in setting up the request that triggered an Error
  console.error('Error', error.message);
  console.error(error.config);
  return alert(error.message);
};

// Interceptor to handle authorized calls
export const axiosAuthInstance = axios.create();

// Request interceptor for API calls
axiosAuthInstance.interceptors.request.use(
  async (config) => {
    const accessToken = Cookies.get('jid');
    const refreshToken = Cookies.get('rtjid');
    if (accessToken && refreshToken) {
      // @ts-ignore
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      };
      return config;
    }
    throw new Error('Unauthorized request');
  },
  (error) => { Promise.reject(error); },
);

// Response interceptor for API calls
axiosAuthInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const refreshToken = Cookies.get('rtjid');
    if (refreshToken) {
      const originalRequest = error.config;

      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        await axios.patch(`${process.env.API_URL}/api/auth/refresh-tokens`);
        const accessToken = Cookies.get('jid');
        axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
        return axiosAuthInstance(originalRequest);
      }
    }
    return Promise.reject(error);
  },
);
