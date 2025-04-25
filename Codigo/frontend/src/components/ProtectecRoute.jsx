import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { getCurrentUser, verifyToken } from './auth';

const ProtectedRoute = ({ children, roles }) => {
  const [isVerified, setIsVerified] = useState(null);
  const user = getCurrentUser();

  useEffect(() => {
    const checkAuth = async () => {
      const isValid = await verifyToken();
      setIsVerified(isValid);
    };

    checkAuth();
  }, []);

  // Esperar a verificar el token
  if (isVerified === null) {
    return <div className="d-flex justify-content-center my-5">Verificando autenticación...</div>;
  }

  // 1. Verificar autenticación
  if (!isVerified || !user) {
    return <Navigate to="/login" replace />;
  }

  // 2. Verificar roles (si se especifican)
  if (roles && user.role) {
    const userRole = user.role.toLowerCase();
    const allowedRoles = roles.map(role => role.toLowerCase());

    if (!allowedRoles.includes(userRole)) {
      return <Navigate to="/no-autorizado" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;