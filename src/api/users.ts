/* eslint-disable @typescript-eslint/no-explicit-any */
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

export const getToken = async (apiUrl: string) => {
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

export const postUser = async (apiUrl: string, data: any, token: string) => {
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      body: data,
      headers: {
        'Token': token,
      }
    });
    if (!response.ok) {
      throw new Error(`${response.status} -- ${await response.json()}`);
    }
    return await response.json();
  } catch (error: any) {
    console.error(`This ONE Error ${error.name} - ${error.message}`);
    throw error;
  }
};
