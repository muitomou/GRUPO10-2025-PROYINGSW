import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import fiaLogo from "../images/channels-501_logo_fia_gob.svg";
import axios from "axios";
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { useTranslation } from 'react-i18next';
import LanguageIcon from '@mui/icons-material/Language';

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { t: tNavbar } = useTranslation('navbar');
  const { t: tCommon } = useTranslation('common');
  const { i18n } = useTranslation();

  // Función para verificar autenticación y obtener datos del usuario
  const checkAuth = async () => {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    
    if (!token || !userStr) {
      setIsAuthenticated(false);
      setUser(null);
      return;
    }
  
    try {
      // Verificar token con el backend
      const response = await axios.get('http://localhost:8000/api/auth/user/me/', {
        headers: { Authorization: `Token ${token}` },
      });
  
      // Actualizar datos del usuario
      const userData = {
        ...JSON.parse(userStr),
        ...response.data,
        token // Incluir el token
      };
  
      setIsAuthenticated(true);
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
    } catch (error) {
      handleLogout();
    }
  };

  useEffect(() => {
    checkAuth();
    
    const authListener = () => checkAuth();
    window.addEventListener('authChange', authListener);
    
    return () => {
      window.removeEventListener('authChange', authListener);
    };
  }, []);

  const handleLogout = () => {
    axios.post("http://localhost:8000/api/auth/logout/", {}, {
      headers: { Authorization: `Token ${localStorage.getItem("token")}` },
    })
    .finally(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setIsAuthenticated(false);
      setUser(null);
      window.dispatchEvent(new Event('authChange'));
      navigate("/login");
    });
  };

  // Función para mostrar el nombre del rol de forma legible
  const getRoleName = (role) => {
    const roles = {
      admin: tNavbar("admin"),
      editor: tNavbar("editor"),
      viewer: tNavbar("viewer")
    };
    return roles[role] || role;
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary shadow-sm">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img src={fiaLogo} alt="fia logo" width="120" height="60" />
        </Link>
        
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarContent">
          <div className="navbar-nav me-auto">
            <Link className="nav-link" to="/">{tNavbar('home')}</Link>
            <Link className="nav-link" to="/boletines">{tNavbar('boletines')}</Link>
            
            {/* Mostrar enlace a Admin solo para usuarios con rol admin */}
            {isAuthenticated && user?.role === 'admin' && (
              <Link className="nav-link" to="/admin">{tNavbar('admin-panel')}</Link>
            )}
            {/* Mostrar enlace a Editor solo para usuarios con rol editor */}
            {isAuthenticated && user?.role === 'editor' && (
              <Link className="nav-link" to="/editar">{tNavbar('editor-panel')}</Link>
            )}
          </div>
          
          
          <div className="d-flex align-items-center">
            {isAuthenticated ? (
              <div className="dropdown">
                <button 
                  className="btn btn-link nav-link dropdown-toggle d-flex align-items-center"
                  id="userDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <div className="text-end me-2">
                    <div className="fw-semibold">{user?.first_name || user?.username || "Mi cuenta"}</div>
                    <div className="small text-muted">{getRoleName(user?.role)}</div>
                  </div>
                </button>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                  <li>
                    <Link className="dropdown-item" to="/perfil">
                      <i className="bi bi-person me-2"></i>{tNavbar('profile')}
                    </Link>
                  </li>
                  
                  {/* Mostrar opción de administración solo para admin */}
                  {user?.role === 'admin' && (
                    <li>
                      <Link className="dropdown-item" to="/admin">
                        <i className="bi bi-gear me-2"></i>{tNavbar('admin-panel')}
                      </Link>
                    </li>
                  )}
                  {/* Mostrar opción de edicion solo para editores */}
                  {user?.role === 'editor' && (
                    <li>
                      <Link className="dropdown-item" to="/editar">
                        <i className="bi bi-gear me-2"></i>{tNavbar('editor-panel')}
                      </Link>
                    </li>
                  )}
                  
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <button 
                      className="dropdown-item text-danger" 
                      onClick={handleLogout}
                    >
                      <i className="bi bi-box-arrow-right me-2"></i>{tCommon('logout')}
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <div className="d-flex">
                <Link className="btn btn-outline-primary me-2" to="/login">
                {tCommon('login')}
                </Link>
                <Link className="btn btn-primary" to="/signup">
                {tCommon('register')}
                </Link>
              </div>
            )}
          </div>
        </div>
        <div className="dropdown ms-5">
              <button 
                className="btn btn-link nav-link dropdown-toggle d-flex align-items-center"
                id="userDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <LanguageIcon />
              </button>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                <li>
                  <button className="dropdown-item" onClick={() => i18n.changeLanguage('en')}>
                    🇺🇸 {tCommon('english')}
                  </button>
                </li>
                <li>
                  <button className="dropdown-item" onClick={() => i18n.changeLanguage('es')}>
                    🇪🇸 {tCommon('spanish')}
                  </button>
                </li>
              </ul>
            </div>
      </div>
      
    </nav>
  );
};

export default Navbar;