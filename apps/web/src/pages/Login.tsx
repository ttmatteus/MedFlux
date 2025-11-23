import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000/api';

    //estilos
   const COLORS = {
    primary: '#98dada',
    background: '#F4F5F5',
    button: '#1FB2C9',
    title: '#020202',
    link: '#262626',
  };

  const SIZES = {
    fieldWidth: '320px',
    fieldHeight: '68px',
    buttonHeight: '40px',
  };

  const SPACING = {
    iconBottom: '12px',
    titleBottom: '24px',
    emailBottom: '20px',
    passwordBottom: '36px',
    linkTop: '24px',
  };

  // classes reutilizaveis
  const inputBaseClasses = [
    'w-full px-4 py-3',
    'border border-gray-300 rounded-lg',
    'focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent',
    'bg-white text-gray-800',
    'placeholder-muted-foreground',
    'text-sm leading-5 font-normal',
  ].join(' ');

  const labelClasses = 'block text-sm font-medium text-gray-700 mb-2';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/sessions/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username.trim(),
          password: password.trim(),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const detail = errorData.detail || 'Não foi possível fazer login.';
        throw new Error(detail);
      }

      const data = await response.json();
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('authUser', JSON.stringify(data.user));

      navigate('/dashboard');
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Erro inesperado ao fazer login.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
        {/* container principal */}
        <div className="flex flex-1">
            <div className="hidden md:flex md:w-[50%] bg-[#98dada]"
            />

            {/* Lado ireito - form */}
            <div className="w-full md:w-[50%] bg-[#F4F5F5] flex items-center justify-center p-8">
                <div className="flex flex-col items-center">
                    {/* icone de coração */}
                    <div
                        className="flex justify-center"
                        style={{ marginBottom: SPACING.iconBottom }}
                    >
                        <img
                            src="/coracao.png"
                            className="w-12 h-12 object-contain"
                        />
                    </div>

                    {/* titulo */}
                    <h1
                        className="text-[20px] font-semibold text-[#020202] mb-[24px]"
                        style={{
                            width: SIZES.fieldWidth,
                            textAlign: 'center'
                        }}
                    >
                        Bem vindo a MedFlux
                    </h1>

                    {/* form */}
                    <form onSubmit={handleSubmit} className="flex flex-col items-center">
                        {/* campo usuário */}
                        <div
                            className="mb-[20px]"
                            style={{
                                width: SIZES.fieldWidth,
                                height: SIZES.fieldHeight
                            }}
                        >
                            <label htmlFor="username" className={labelClasses}>
                                Usuário
                            </label>
                            <input 
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Digite seu usuário"
                            className={inputBaseClasses}
                            required 
                            disabled={isLoading}
                            />
                        </div>

                        {/* campo senha */}
                        <div
                            className="mb-[36px]"
                            style={{
                                width: SIZES.fieldWidth,
                                height: SIZES.fieldHeight
                            }}
                        >
                            <label htmlFor="password" className={labelClasses}>
                                Senha
                            </label>
                            <input 
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Senha"
                            className={inputBaseClasses}
                            required 
                            disabled={isLoading}
                            />
                        </div>

                        {/* botão login */}
                        <button
                            type="submit"
                            className={[
                                'bg-[1FB2C9#] hover:opacity-90',
                                'text-white font-semibold',
                                'rounded-lg',
                                'transition-opacity duration-200',
                                'flex items-center justify-center',
                            ].join(' ')}
                            style={{
                                backgroundColor: COLORS.button,
                                width: SIZES.fieldWidth,
                                height: SIZES.buttonHeight,
                                fontSize: '14px',
                                lineHeight: '25px',
                                color: '#ffffff',
                            }}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Entrando...' : 'Login'}
                        </button>
                    </form>

                    {errorMessage && (
                      <p className="mt-4 text-sm text-red-600 text-center" style={{ width: SIZES.fieldWidth }}>
                        {errorMessage}
                      </p>
                    )}

                    {/* esqueci minha senha */}
                    <div
                        className="mt-[24px] text-center"
                        style={{ width: SIZES.fieldWidth }}
                    >
                        <a 
                        href="#"
                        className={[
                            'text-[14px] font-light',
                            'text-[#262626]',
                            'hover:opacity-80 transition-opacity',
                            'leading-[24px]'
                        ].join(' ')}
                        >
                            Esqueci minha senha
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login;