import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
    showSearch?: boolean;
}

interface DropdownPosition {
    top: number;
    left: number;
}

const DROPDOWN_WIDTH = 177;

const Header: React.FC<HeaderProps> = ({ showSearch = false }) => {
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [dropdownPosition, setDropdownPosition] = useState<DropdownPosition>({ top: 93, left: 0 });
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };

        if (isDropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isDropdownOpen]);

    const updateDropdownPosition = () => {
        if (!dropdownRef.current) return;
        const rect = dropdownRef.current.getBoundingClientRect();
        const newTop = rect.bottom + 20; 
        const newLeft = rect.right - DROPDOWN_WIDTH;
        setDropdownPosition({
            top: newTop,
            left: newLeft < 24 ? 24 : newLeft, 
        });
    };

    useEffect(() => {
        if (!isDropdownOpen) return;

        updateDropdownPosition();

        window.addEventListener('resize', updateDropdownPosition);
        window.addEventListener('scroll', updateDropdownPosition, true);

        return () => {
            window.removeEventListener('resize', updateDropdownPosition);
            window.removeEventListener('scroll', updateDropdownPosition, true);
        };
    }, [isDropdownOpen]);
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
                    <div 
                        className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
                        onClick={() => navigate('/dashboard')}
                    >
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
                        <span style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '12px', color: '#000000'}}>Username Sobrenome</span>
                        <div className="relative" ref={dropdownRef}>
                            <img 
                                src="/pessoa.png"
                                style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover', cursor: 'pointer'}} 
                                alt="" 
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            />
                            {isDropdownOpen && (
                                <div 
                                    className="bg-white rounded-lg fixed"
                                    style={{ 
                                        width: `${DROPDOWN_WIDTH}px`,
                                        height: '89px',
                                        zIndex: 1000,
                                        top: `${dropdownPosition.top}px`,
                                        left: `${dropdownPosition.left}px`,
                                        boxShadow: '2px 6px 4px 0px rgba(0, 0, 0, 0.25)'
                                    }}
                                >
                                    <div 
                                        className="px-4 cursor-pointer transition-colors"
                                        style={{ fontFamily: 'Inter', fontWeight: 400, fontSize: '14px', color: '#000000', paddingTop: '12px', paddingBottom: '0px' }}
                                    >
                                        Nome do Usuário
                                    </div>
                                    <div 
                                        style={{ 
                                            width: '144px', 
                                            height: '0.72px', 
                                            backgroundColor: '#E5E5E5',
                                            margin: '10px auto'
                                        }}
                                    ></div>
                                    <div 
                                        className="px-4 cursor-pointer transition-colors text-[#5E5E5E] hover:text-[#F37F73]"
                                        style={{ fontFamily: 'Inter', fontWeight: 300, fontSize: '14px', paddingTop: '0px', paddingBottom: '12px' }}
                                        onClick={() => {
                                            // TODO: implementar lógica de logout
                                            navigate('/login');
                                        }}
                                    >
                                        Sair
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </header>
        
        </>
    )
  
};

export default Header;

