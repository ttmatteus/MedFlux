import React from "react";
import { useNavigate } from "react-router-dom";
import { Header, PasswordCard, CallsPanel, RoomStatusCard } from "../components/dashboard";
import { MOCK_CALLS, MOCK_ROOM_STATUS } from "../constants/dashboard";
import { PasswordCard as PasswordCardType } from "../types/dashboard";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  // Dados dos cards de senha
  const passwordCards: PasswordCardType[] = [
    { type: "próxima", password: "XC25", patientName: "Nome do Paciente" },
    { type: "última", password: "XC25", patientName: "Nome do Paciente" },
    { type: "próxima", password: "XC25", patientName: "Nome do Paciente" },
  ];

  return (
    <div className="min-h-screen bg-[#F4F5F5] overflow-x-hidden w-full">
      <Header showSearch={true} />

      {/* Conteúdo principal */}
      <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
        <div className="w-full" style={{ paddingLeft: '135px', paddingRight: '135px', paddingBottom: '181px' }}>
          <div className="flex gap-4" style={{ marginTop: '126px' }}>
            {/* Coluna esquerda: 3 cards + Painel de Chamadas */}
            <div className="flex flex-col" style={{ gap: '15px' }}>
              {/* Cards juntinhos */}
              <div className="flex" style={{ gap: '16px' }}>
                {passwordCards.map((card, index) => (
                  <PasswordCard key={index} card={card} />
                ))}
              </div>

              {/* Painel de Chamadas */}
              <CallsPanel calls={MOCK_CALLS} />
            </div>

            {/* Coluna direita: Status de Salas e Card em branco */}
            <div className="flex flex-col" style={{ gap: '16px' }}>
              {/* Status de Salas com botão acima */}
              <div className="relative">
                <button
                  onClick={() => navigate('/triagem')}
                  style={{
                    position: 'absolute',
                    top: '-56px',
                    right: '0px',
                    width: '116px',
                    height: '40px',
                    backgroundColor: '#20CAD5',
                    color: '#ffffff',
                    fontFamily: 'Inter',
                    fontWeight: 500,
                    fontSize: '14px',
                    lineHeight: '24px',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    zIndex: 10
                  }}
                  className="hover:opacity-90 transition-opacity"
                >
                  Gerar Senha
                </button>
                <RoomStatusCard roomStatus={MOCK_ROOM_STATUS} />
              </div>

              {/* Card de Notas */}
              <div className="bg-white rounded-lg p-4 shadow-sm flex flex-col" style={{ width: '411px', height: '290px' }}>
                <h2 style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '16px', color: '#000000', marginBottom: '12px' }}>
                  Notas
                </h2>
                <textarea
                  placeholder="Escreva suas ideias..."
                  className="flex-1 resize-none border-none outline-none focus:outline-none"
                  style={{
                    fontFamily: 'Inter',
                    fontWeight: 400,
                    fontSize: '14px',
                    color: '#999999',
                    backgroundColor: 'transparent'
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
