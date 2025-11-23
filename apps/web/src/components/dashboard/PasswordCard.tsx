import React from "react";
import { Info } from "lucide-react";
import { PasswordCard as PasswordCardType } from "../../types/dashboard";

interface PasswordCardProps {
  card: PasswordCardType;
}

const PasswordCard: React.FC<PasswordCardProps> = ({ card }) => {
  const label = card.type === 'próxima' ? "Próxima Senha" : "Última Senha:";
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm relative hover:bg-gray-100 cursor-pointer"
      style={{ width: '237px', height: '168px' }}
    >
      <div className="flex items-center mb-2">
        <span style={{ fontFamily: 'Inter', fontWeight: 400, fontSize: '14px', color: '#D2CCCC'}}>{label}</span>
        <Info className="absolute" style={{ width: '16px', height: '16px', color: '#D2CCCC', right: '20px', top: '20px'}} strokeWidth={2.5} />
      </div>
        <div className="absolute" style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '24px', color: '#1D1D1D', top: '70px', right: '87px' }}> 
          {card.password}
        </div>
          <div className="absolute" style={{ fontFamily: 'Inter', fontWeight: 400, fontSize: '14px', color: '#999999', top: '132px', left: '26px', bottom: '19px' }}>
            {card.patientName}
          </div>
    </div>
  );
};

export default PasswordCard;

