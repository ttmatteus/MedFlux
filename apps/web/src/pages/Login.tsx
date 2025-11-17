import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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
    headerHeight: '12px',
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: implementar lógica de login fazer dps 
    console.log('Login:', { email, password });
    // Redireciona para o dashboard após o login
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col">
        {/* Header */}
        <div 
            className="w-full bg-[#98dada]"
            style={{ height: SIZES.headerHeight }}
        />

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
                        {/* campo email */}
                        <div
                            className="mb-[20px]"
                            style={{
                                width: SIZES.fieldWidth,
                                height: SIZES.fieldHeight
                            }}
                        >
                            <label htmlFor="email" className={labelClasses}>
                                Email
                            </label>
                            <input 
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            className={inputBaseClasses}
                            required 
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
                        >
                            Login
                        </button>
                    </form>

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