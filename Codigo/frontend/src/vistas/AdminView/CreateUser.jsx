import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';


export default function CreateUser() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        first_name: '',
        last_name: '',
        password: '',
        password2: '',
        role: ''
    });
    const passLength = 12;
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const token = localStorage.getItem("token");

    // Función para mostrar el nombre del rol de forma legible
    const getRoleName = (role) => {
        const roles = {
        admin: "Administrador",
        editor: "Editor",
        viewer: "Visualizador"
        };
        return roles[role] || role;
    };

    function generateRandomPassword(length) {
        const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let newPassword = "";
        for (let i = 0; i < length; i++) {
          newPassword += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return newPassword;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await axios.post(
                'http://localhost:8000/api/auth/register/', 
                formData,
                {
                     headers: { Authorization: `Token ${token}` }
                }
            );
            
        } catch (error) {
            console.error("Error:", error.response?.data);
            setError(
                error.response?.data?.username?.[0] || 
                error.response?.data?.email?.[0] || 
                "Error en el registro. Por favor verifica tus datos."
            );
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card auth-card shadow">
                        <div className="card-body p-4">
                            <h2 className="text-center mb-4">Crear Cuenta</h2>
                            
                            {error && (
                                <div className="alert alert-danger" role="alert">
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="first_name" className="form-label">
                                            Nombre
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="first_name"
                                            name="first_name"
                                            value={formData.first_name}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="last_name" className="form-label">
                                            Apellido
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="last_name"
                                            name="last_name"
                                            value={formData.last_name}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="username" className="form-label">
                                        Nombre de usuario
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="username"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">
                                        Correo electrónico
                                    </label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                
                                <label htmlFor="password" className="form-label">
                                        Contraseña
                                    </label>
                                <div className="input-group mb-3">
                                <input
                                type={showPassword ? "text" : "password"}
                                className="form-control"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                />
                                <button className="btn btn-outline-secondary" type="button" id="button-addon2"
                                onClick={() => setShowPassword(prev => !prev)}
                                >
                                    {showPassword ? "Ocultar" : "Ver"}</button>

                                <button 
                                    type="button" 
                                    className="btn btn-outline-success"
                                    disabled={loading}
                                    onClick={() => {
                                        const password = generateRandomPassword(passLength);
                                        setFormData(prev => ({ ...prev, password: password, password2: password }));
                                    }}
                                >
                                    Generar Contraseña
                                </button>
                                </div>
                                <select
                                    className="form-select w-100 py-2 mb-3"
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="" disabled>Seleccione rol de usuario</option>
                                    <option value="viewer">Visualizador</option>
                                    <option value="editor">Editor</option>
                                    <option value="admin">Administrador</option>
                                </select>
                                <button 
                                    type="submit" 
                                    className="btn btn-primary w-100 py-2 mb-3"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                            Creando Cuenta...
                                        </>
                                    ) : 'Crear Cuenta'}
                                </button>
                                <button 
                                        type="button" 
                                        className="btn btn-outline-secondary w-100 py-2 mb-3"
                                        onClick={() => navigate('/admin')}
                                        disabled={loading}
                                    >
                                        Cancelar
                                    </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}