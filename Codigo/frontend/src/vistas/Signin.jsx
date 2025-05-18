import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../components/auth'; // Importamos la función de login centralizada
import { useTranslation } from 'react-i18next';

export default function Signin() {
    const { t: tAuth } = useTranslation('auth');
    const { t: tCommon } = useTranslation('common');
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        
        const result = await login(formData.username, formData.password);
        
        if (result.success) {
            // Redirección basada en el rol
            const redirectPath = result.role === 'admin' ? '/admin' : 
                              result.role === 'editor' ? '/editor' : '/dashboard';
            navigate('/');
            
            // Actualiza el estado de autenticación en la app
            window.dispatchEvent(new Event('authChange'));
        } else {
            setError(result.error);
        }
        
        setLoading(false);
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
                <div className="col-md-6 col-lg-4">
                    <div className="card shadow">
                        <div className="card-body p-4">
                            <h2 className="text-center mb-4">{tCommon('login')}</h2>
                            
                            {error && (
                                <div className="alert alert-danger" role="alert">
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="username" className="form-label">
                                    {tCommon('user')}
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="username"
                                        name="username"
                                        placeholder={tAuth('enter-username')}
                                        value={formData.username}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="password" className="form-label">
                                    {tCommon('password')}
                                    </label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        name="password"
                                        placeholder={tAuth('enter-password')}
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <button 
                                    type="submit" 
                                    className="btn btn-primary w-100 py-2"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                            Iniciando sesión...
                                        </>
                                    ) : tCommon('login')}
                                </button>
                            </form>

                            <div className="text-center mt-3">
                                <p className="mb-0">
                                {tAuth('register-text')}{' '}
                                    <Link to="/signup" className="text-primary">
                                    {tAuth('register-link')}
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}