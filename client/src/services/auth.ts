import axios from 'axios';
import { axiosAuthInstance } from '.';
import { UserProps, CredentialsProps } from '../types';

import { handleError } from './index';

/**
 *  Method to get user data
 */
export const getUser = async (): Promise<UserProps | null> => {
  try {
    const { data }: { data: UserProps } = await axiosAuthInstance.get(
      `${process.env.REACT_APP_API_URL}/api/auth/user`,
    );
    return data;
  } catch (error: any) {
    if (error.message === 'Unauthorized request') return null;
    handleError(error);
    return null;
  }
};

/**
 * Login an existing user with provided credentials
 * @param { email, password }
 * @returns fetched data of an existing user
 */
export const login = async (
  { email, password }: CredentialsProps,
): Promise<UserProps | null> => {
  try {
    const { data: user }: { data: UserProps } = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/auth/login`,
      {
        email: email.toLowerCase(),
        password,
      },
      {
        withCredentials: true,
        headers: {
          'Content-type': 'application/json',
        },
      },
    );
    return user;
  } catch (error: any) {
    handleError(error);
    return null;
  }
};

/**
 * Register a new user with provided credentials
 * @param { email, password }
 * @returns fetched data of a new user
 */
export const register = async (
  { email, password, name }: CredentialsProps,
): Promise<UserProps | null> => {
  try {
    const { data: user }: { data: UserProps } = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/auth/register`,
      {
        email: email.toLowerCase(),
        password,
        name,
      },
      {
        withCredentials: true,
        headers: {
          'Content-type': 'application/json',
        },
      },
    );
    return user;
  } catch (error: any) {
    handleError(error);
    return null;
  }
};

/**
 * Logout a user
 */
export const logout = async () => {
  try {
    await axiosAuthInstance.post(
      `${process.env.REACT_APP_API_URL}/api/auth/logout`,
      {},
      { withCredentials: true },
    );
  } catch (error: any) {
    handleError(error);
  }
};
