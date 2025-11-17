import React from "react";
import { RoomStatus } from "../../types/dashboard";

interface RoomStatusCardProps {
  roomStatus: RoomStatus[];
}

const RoomStatusCard: React.FC<RoomStatusCardProps> = ({ roomStatus }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm" style={{ width:'411px', height: '361px', padding: '20px 27px 20px 20px' }}>
      <h2 style={{ fontFamily: 'Inter', fontWeight: 500, fontSize: '16px', color: '#000000'}} className='mb-4'>
        Status de salas
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr style={{ borderBottom: '2px solid #4F5F5', backgroundColor: '#F0F0F0'}}>
              <th className="text-left py-2" style={{ fontFamily: 'Inter', fontWeight: 500, fontSize: '13px', lineHeight: '24px', color: '#000000', paddingLeft: '45px', paddingRight: '0px'}}>
                Prioridade
              </th>
              <th className="text-left py-2" style={{ fontFamily: 'Inter', fontWeight: 500, fontSize: '13px', lineHeight: '24px', color: '#000000', paddingLeft: '0px', paddingRight: '80px'}}>
                Nome
              </th>
            </tr>
          </thead>
          <tbody>
            {roomStatus.map((room, index) => (
              <tr key={index} className="transition-colors duration-200 hover:bg-gray-50 cursor-pointer" style={{ borderBottom: index < roomStatus.length  - 1 ? '2px solid #F4F5F5': 'none'}}>
                <td className="py-3" style={{ paddingLeft: '45px', paddingRight: '0px'}}>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-medium text-white ${!room.priorityColorHex ? room.priorityColor: ''}`}
                    style={room.priorityColorHex ? { backgroundColor: room.priorityColorHex }: {}}
                  >
                    {room.priority}
                  </span>
                </td>
                <td className="py-3" style={{ fontFamily: "Inter", fontWeight: 400, fontSize: '13px', lineHeight: '24px', color: '000000', paddingLeft: '0px'}}>
                  {room.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
};

export default RoomStatusCard;

