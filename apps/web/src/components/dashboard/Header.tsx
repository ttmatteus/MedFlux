import React from "react";

interface HeaderProps {
    showSearch?: boolean;
}

const Header: React.FC<HeaderProps> = ({ showSearch = false }) => {
    return (
        <>
            {/* header barra azul */}
            <div 
            className="w-full bg-[#98dada]"
            style={{ height: '12px' }}
            />

            {/* header */ }
            <header className="bg-white relative w-full" style={{ height: '68px' }}>
                <div style={{ maxWidth: '1440px', margin: '0 auto', height: '100%', paddingLeft: '135px', paddingRight: '135px'}} className="flex items-center justify-between">
                    {/* logo medflux*/}
                    <div className="flex items-center gap-2">
                        <img 
                        src="/coracao.png"
                        className="object-contain"
                        style={{ width: '46px', height: '39px'}} 
                        alt="" 
                        />
                        <span style={{ fontFamily: 'Inter', fontWeight: 500, fontSize: '20px', color: '#000000'}}>MedFlux</span>
                    </div>

                    {/* barra de pesquisa - centralizada */}
                    {showSearch && (
                        <div className="flex-1 flex justify-center px-4">
                            <div className="relative" style={{ width: '499px', height: '36px' }}>
                                <input
                                    type="text"
                                    placeholder="Pesquisar pacientes, salas..."
                                    className="w-full h-full px-4 pl-10 text-sm leading-5 font-normal text-muted-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
                                    style={{
                                        fontFamily: 'Inter',
                                        backgroundColor: 'rgba(244, 244, 245, 0.8)',
                                        borderColor: '#ebebeb',
                                        borderWidth: '1px',
                                        height: '36px',
                                    }}
                                />
                                <svg
                                    className="absolute left-3 top-1/2 transform -translate-y-1/2"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M7.33333 12.6667C10.2789 12.6667 12.6667 10.2789 12.6667 7.33333C12.6667 4.38781 10.2789 2 7.33333 2C4.38781 2 2 4.38781 2 7.33333C2 10.2789 4.38781 12.6667 7.33333 12.6667Z"
                                        stroke="#666"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M14 14L11.1 11.1"
                                        stroke="#666"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </div>
                        </div>
                    )}

                    {/* username foto de perfil */}
                    <div className="flex items-center" style={{ gap: '18px' }}>
                        <span style={{ fontFamily: 'Inter', fontWeight: 400, fontSize: '12px', color: '#000000'}}>Username Sobrenome</span>
                        <div className="relative">
                            <img 
                            src="/pessoa.png"
                            style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #000000'}} 
                            alt="" 
                            />
                        </div>
                    </div>
                </div>
            </header>
        
        </>
    )
  
};

export default Header;

