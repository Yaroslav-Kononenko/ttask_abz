/* eslint-disable @typescript-eslint/no-explicit-any */
import { getPostUsersUrl, tokenUrl } from "./base";

export const getUsersList = async (apiUrl: string) => {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`${response.status} -- ${response.statusText}`);
    }
    return await response.json();
  } catch (error: any) {
    console.error(`Error ${error.name} - ${error.message}`);
    throw error;
  }
};

export const getToken = async () => {
  try {
    const response = await fetch(tokenUrl);
    if (!response.ok) {
      throw new Error(`${response.status} -- ${response.statusText}`);
    }
    return await response.json();
  } catch (error: any) {
    console.error(`Error ${error.name} - ${error.message}`);
    throw error;
  }
};

export const postUser = async (data: any, token: string) => {
  try {
    const response = await fetch(getPostUsersUrl, {
      method: 'POST',
      body: data,
      headers: {
        'Token': token,
      }
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(`${response.status} -- ${responseData.message}`);
    }

    return responseData;
  } catch (error: any) {
    console.error(`Error ${error.name} - ${error.message}`);
    throw error;
  }
};
