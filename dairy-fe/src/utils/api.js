const API_URL = process.env.REACT_APP_API_URL || 'https://localhost:8080';

const request = async (endpoint, method = 'GET', body = null, headers = {}) => {
  try {
    const config = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    };

    if (body) {
      config.body = JSON.stringify(body);
    }

    const response = await fetch(`${API_URL}${endpoint}`, config);
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};

export const getData = (endpoint) => request(endpoint);
export const postData = (endpoint, data) => request(endpoint, 'POST', data);
export const putData = (endpoint, data) => request(endpoint, 'PUT', data);
export const deleteData = (endpoint) => request(endpoint, 'DELETE');
