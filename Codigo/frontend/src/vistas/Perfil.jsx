import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Perfil = () => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Obtener datos del usuario al cargar el componente
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const response = await axios.get("http://localhost:8000/api/auth/user/me/", {
          headers: {
            Authorization: `Token ${token}`,
          },
        });

        setUser(response.data);
        setFormData({
          first_name: response.data.first_name || "",
          last_name: response.data.last_name || "",
          email: response.data.email || "",
        });
        setLoading(false);
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Error al cargar los datos del usuario");
        setLoading(false);
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:8000/api/auth/user/${user.id}/`,
        formData,
        {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setUser(response.data);
      setEditMode(false);
      const updatedUser = { ...user, ...response.data };
      localStorage.setItem("user", JSON.stringify(updatedUser));
    } catch (err) {
      console.error("Error updating user:", err);
      setError("Error al actualizar el perfil");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (loading) {
    return <div className="container">Cargando...</div>;
  }

  if (!user) {
    return <div className="container">{error || "Usuario no encontrado"}</div>;
  }

  return (
    <div className="container mt-4">
      <div className="panel-body inf-content">
        <div className="row">
          <div className="col-md-8 mx-auto card p-4">
            <h3 className="mb-4">Información de Usuario</h3>
            <div className="table-responsive">
              <table className="table table-user-information">
                <tbody>
                  <tr>
                    <td width="30%"><strong>Nombre</strong></td>
                    <td>{user.first_name}</td>
                  </tr>
                  <tr>
                    <td><strong>Apellido</strong></td>
                    <td>{user.last_name}</td>
                  </tr>
                  <tr>
                    <td><strong>Usuario</strong></td>
                    <td>{user.username}</td>
                  </tr>
                  <tr>
                    <td><strong>Email</strong></td>
                    <td>{user.email}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {error && <div className="alert alert-danger">{error}</div>}

            {editMode ? (
              <>
                <h4 className="mt-4">Editar Perfil</h4>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="first_name" className="form-label">
                      Nombre
                    </label>
                    <input
                      type="text"
                      id="first_name"
                      name="first_name"
                      className="form-control"
                      value={formData.first_name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="last_name" className="form-label">
                      Apellido
                    </label>
                    <input
                      type="text"
                      id="last_name"
                      name="last_name"
                      className="form-control"
                      value={formData.last_name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="form-control"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      disabled  // Normalmente el email no se debería modificar
                    />
                  </div>
                  <div className="d-flex gap-2 mt-3">
                    <button type="submit" className="btn btn-primary flex-grow-1">
                      Guardar Cambios
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-secondary flex-grow-1"
                      onClick={() => setEditMode(false)}
                    >
                      Cancelar
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div className="d-flex gap-2 mt-3">
                <button
                  onClick={() => setEditMode(true)}
                  className="btn btn-primary flex-grow-1"
                >
                  Editar Perfil
                </button>
                <button
                  onClick={handleLogout}
                  className="btn btn-outline-danger flex-grow-1"
                >
                  Cerrar Sesión
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Perfil;