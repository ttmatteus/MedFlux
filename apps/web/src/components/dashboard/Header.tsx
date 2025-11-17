import React from "react";

const Header: React.FC = () => {
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

