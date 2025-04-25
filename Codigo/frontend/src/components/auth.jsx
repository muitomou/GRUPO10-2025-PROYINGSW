// auth.js
import axios from 'axios';

const API_URL = 'http://localhost:8000/api-token-auth/';

export const login = async (username, password) => {
  try {
    const response = await axios.post(API_URL, {
      username,
      password
    });
    
    const { token, user_id, username: responseUsername, role } = response.data;
    
    // Guardar datos en localStorage
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify({
      id: user_id,
      username: responseUsername,
      role: role.toLowerCase() // Asegurar minúsculas
    }));
    
    return { success: true, role: role.toLowerCase() };
  } catch (error) {
    let errorMessage = 'Error de autenticación';
    if (error.response) {
      if (error.response.status === 400) {
        errorMessage = 'Usuario o contraseña incorrectos';
      } else if (error.response.data?.non_field_errors) {
        errorMessage = error.response.data.non_field_errors[0];
      }
    }
    return { success: false, error: errorMessage };
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.dispatchEvent(new Event('authChange'));
};

export const getCurrentUser = () => {
  const token = localStorage.getItem('token');
  const userStr = localStorage.getItem('user');
  
  if (!token || !userStr) return null;
  
  try {
    const user = JSON.parse(userStr);
    return {
      ...user,
      token // Incluir el token en el objeto usuario
    };
  } catch (e) {
    console.error("Error parsing user data", e);
    return null;
  }
};

// Función para verificar el token con el backend
export const verifyToken = async () => {
  const token = localStorage.getItem('token');
  if (!token) return false;
  
  try {
    await axios.get('http://localhost:8000/api/auth/user/me/', {
      headers: { Authorization: `Token ${token}` }
    });
    return true;
  } catch (error) {
    logout();
    return false;
  }
};