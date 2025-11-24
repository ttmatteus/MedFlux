import React, { useEffect } from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { getPriorityBadge } from "../../constants/priority";
import type { Call } from "../../types/dashboard";

interface CallsPanelProps {
  calls: Call[];
  currentPage: number;
  onPageChange: (page: number) => void;
  highlightCode?: string;
}

export const CALLS_PAGE_SIZE = 6;

const CallsPanel: React.FC<CallsPanelProps> = ({
  calls,
  currentPage,
  onPageChange,
  highlightCode,
}) => {
  const totalPages = Math.max(1, Math.ceil(calls.length / CALLS_PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);
  const pagedCalls = calls.slice(
    (safePage - 1) * CALLS_PAGE_SIZE,
    safePage * CALLS_PAGE_SIZE,
  );

  useEffect(() => {
    if (currentPage !== safePage) {
      onPageChange(safePage);
    }
  }, [currentPage, safePage, onPageChange]);

  const renderPageButton = (page: number) => (
    <button
      key={page}
      className={`px-3 py-1 rounded-[6px] transition-colors border ${
        safePage === page
          ? "bg-[#F4F5F5] border-[#E5E5E5]"
          : "border-transparent hover:bg-[#F4F5F5] hover:border-[#E5E5E5]"
      }`}
      style={{
        fontSize: "14px",
        lineHeight: "24px",
        fontWeight: 500,
        color: "#000000",
      }}
      onClick={() => onPageChange(page)}
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
            {pagedCalls.map((call, index) => {
              const badge = getPriorityBadge(call.priority);
              const isHighlighted = highlightCode === call.code;
              return (
              <tr
                key={call.code}
                className={`transition-colors duration-200 cursor-pointer ${
                  isHighlighted ? "bg-[#E0FBFD]" : "hover:bg-gray-50"
                } ${index < pagedCalls.length - 1 ? 'border-b border-gray-100': ''} `}
              >
                <td className="py-3" style={{ paddingLeft: '27px', paddingRight: '110px' }}>
                  <span className="text-sm font-medium text-gray-800">{call.code}</span>
                </td>
                <td className="py-3 text-left" style={{ fontFamily: 'Inter', fontWeight: 400, fontSize: '13px', lineHeight: '24px', color: '#000000', paddingLeft: '27px', paddingRight: '12px'}}>
                  {call.patientName}
                </td>
                <td className="py-3 text-left" style={{ paddingLeft: '0px', paddingRight: '16px' }}>
                  <span
                    className="inline-block px-3 py-1 rounded-full text-xs font-medium text-white"
                    style={{ backgroundColor: badge.hex }}
                  >
                    {call.priority}
                  </span>
                </td>
              </tr>
            )})}
          </tbody>
        </table>
      </div>

      {/* paginação */}
      <div className="flex items-center justify-center gap-3" style={{ transform: 'translateY(-10px'}}>
        <button 
          className="flex items-center gap-2 px-2 py-1"
          style={{ fontSize: '14px', lineHeight: '24px', fontWeight: 500, color: '#000000'}}
          onClick={() => onPageChange(Math.max(1, safePage - 1))}
          disabled={safePage === 1}
        >
          <ChevronLeft size={16}/>
          <span>Previous</span>
        </button>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(renderPageButton)}
        {totalPages > 1 && <MoreHorizontal size={16} color="#000000" style={{ marginLeft: '8px', marginRight: '8px' }} />}
        <button
          className="flex items-center gap-2 px-2 py-1"
          style={{ fontSize: '14px', lineHeight: '24px', fontWeight: 500, color: "#000000" }}
          onClick={() => onPageChange(Math.min(totalPages, safePage + 1))}
          disabled={safePage === totalPages}
        >
          <span>Next</span>
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  )
};

export default CallsPanel;

