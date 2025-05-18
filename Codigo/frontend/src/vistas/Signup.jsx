import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Signup() {
    const { t: tAuth } = useTranslation('auth');
    const { t: tCommon } = useTranslation('common');
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        first_name: '',
        last_name: '',
        password: '',
        password2: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Validación de contraseñas
        if (formData.password !== formData.password2) {
            setError("Las contraseñas no coinciden");
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post(
                'http://localhost:8000/api/auth/register/', 
                formData
            );
            
            // Guarda el token y redirige
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            navigate('/');
            
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
                <div className="col-md-6 col-lg-5">
                    <div className="card auth-card shadow">
                        <div className="card-body p-4">
                            <h2 className="text-center mb-4">{tCommon('register')}</h2>
                            
                            {error && (
                                <div className="alert alert-danger" role="alert">
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="first_name" className="form-label">
                                        {tCommon('name')}
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
                                        {tCommon('lastname')}
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
                                    {tCommon('user')}
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
                                    {tCommon('email')}
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

                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">
                                    {tCommon('password')}
                                    </label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="password2" className="form-label">
                                    {tAuth('confirm-password')}
                                    </label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password2"
                                        name="password2"
                                        value={formData.password2}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <button 
                                    type="submit" 
                                    className="btn btn-primary w-100 py-2 mb-3"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                            Registrando...
                                        </>
                                    ) : tCommon('register')}
                                </button>

                                <div className="text-center">
                                    <p className="mb-0">
                                    {tAuth('login-text')}{' '}
                                        <Link to="/login" className="text-primary">
                                        {tAuth('login-link')}
                                        </Link>
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}