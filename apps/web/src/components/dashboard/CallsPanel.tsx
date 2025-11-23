import React, { useState } from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { Call } from "../../types/dashboard";

interface CallsPanelProps {
  calls: Call[];
}

const CallsPanel: React.FC<CallsPanelProps> = ({ calls }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const renderPageButton = (page: number) => (
    <button
      key={page}
      className={`px-3 py-1 rounded-[6px] transition-colors ${
        currentPage === page ? "border border-gray-300" : "border border-transparent"
      } hover:bg-[#F4F5F5]`}
      style={{ fontSize: '14px', lineHeight: '24px', fontWeight: 500, color: '#000000' }}
      onClick={() => setCurrentPage(page)}
    >
      {page}
    </button>
  );

  return (
    <div className="bg-white rounded-lg shadow-sm" style={{ width: '743px', height: '483px', padding: '16px 0px 18px 0px'}}>
      <h2 style={{ fontFamily: 'Inter', fontWeight: 500, fontSize: '16px', lineHeight: '24px', color: '#000000', paddingLeft: '27px', paddingRight: '16px'}} className="mb-4">
        Painel de Chamadas
      </h2>
      <div className="overflow-x-auto" style={{ paddingLeft: "27px", paddingRight: '16px', width: '730px', height: '384px' }}>
        <table className="w-full">
          <thead>
            <tr style={{ borderBottom: '2px solid #F4F5F5', backgroundColor: '#F0F0F0'}}>
              <th className="text-left py-2" style={{ fontFamily: 'Inter', fontWeight: 500, fontSize: '13px', lineHeight: '24px', color: '#000000', paddingLeft: '27px', paddingRight: '32px'}}>
                Senha
              </th>
              <th className="text-left py-2" style={{ fontFamily: 'Inter', fontWeight: 500, fontSize: '13px', lineHeight: '24px', color: '#000000', paddingLeft: '27px', paddingRight: '32px'}}>
                Nome
              </th>
              <th className="text-left py-2" style={{ fontFamily: 'Inter', fontWeight: 500, fontSize: '13px', lineHeight: '24px', color: '#000000', paddingLeft: '0px', paddingRight: '32px'}}>
                Prioridade
              </th>
            </tr>
          </thead>
          <tbody>
            {calls.map((call, index) => (
              <tr
                key={index}
                className={`transition-colors duration-200 hover:bg-gray-50 cursor-pointer ${index < calls.length - 1 ? 'border-b border-gray-100': ''} `}
              >
                <td className="py-3" style={{ paddingLeft: '27px', paddingRight: '110px' }}>
                  <span className="text-sm font-medium text-gray-800">{call.id}</span>
                </td>
                <td className="py-3 text-left" style={{ fontFamily: 'Inter', fontWeight: 400, fontSize: '13px', lineHeight: '24px', color: '#000000', paddingLeft: '32px', paddingRight: '12px'}}>
                  {call.name}
                </td>
                <td className="py-3 text-left" style={{ paddingLeft: '0px', paddingRight: '16px' }}>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-medium text-white ${!call.priorityColorHex ? call.priorityColor : ''}`}
                    style={call.priorityColorHex ? { backgroundColor: call.priorityColorHex }: {}}
                  >
                    {call.priority}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* paginação */}
      <div className="flex items-center justify-center gap-3" style={{ transform: 'translateY(-10px'}}>
        <button 
          className="flex items-center gap-2 px-2 py-1"
          style={{ fontSize: '14px', lineHeight: '24px', fontWeight: 500, color: '#000000'}}
          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
        >
          <ChevronLeft size={16}/>
          <span>Previous</span>
        </button>
        {[1, 2, 3].map(renderPageButton)}
        <MoreHorizontal size={16} color="#000000" style={{ marginLeft: '8px', marginRight: '8px' }} />
        <button
          className="flex items-center gap-2 px-2 py-1"
          style={{ fontSize: '14px', lineHeight: '24px', fontWeight: 500, color: "#000000" }}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          <span>Next</span>
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  )
};

export default CallsPanel;

