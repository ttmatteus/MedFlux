import React from "react";
import { Header, PasswordCard, CallsPanel, RoomStatusCard } from "../components/dashboard";
import { MOCK_CALLS, MOCK_ROOM_STATUS } from "../constants/dashboard";
import { PasswordCard as PasswordCardType } from "../types/dashboard";

const Dashboard: React.FC = () => {
  // Dados dos cards de senha
  const passwordCards: PasswordCardType[] = [
    { type: "próxima", password: "XC25", patientName: "Nome do Paciente" },
    { type: "última", password: "XC25", patientName: "Nome do Paciente" },
    { type: "próxima", password: "XC25", patientName: "Nome do Paciente" },
  ];

  return (
    <div className="min-h-screen bg-[#F4F5F5] overflow-x-hidden w-full">
      <Header />

      {/* Conteúdo principal */}
      <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
        <div className="w-full" style={{ paddingLeft: '135px', paddingRight: '135px', paddingBottom: '181px' }}>
          <div className="flex gap-4" style={{ marginTop: '96px' }}>
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
              {/* Status de Salas */}
              <RoomStatusCard roomStatus={MOCK_ROOM_STATUS} />

              {/* Card vazio abaixo do Status de Salas */}
              <div className="bg-white rounded-lg p-4 shadow-sm" style={{ width: '411px', height: '290px' }}> </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
