export interface Call {
  id: string;
  name: string;
  priority: string;
  priorityColor: string;
  priorityColorHex?: string;
  image: boolean;
}

export interface RoomStatus {
  priority: string;
  priorityColor: string;
  priorityColorHex?: string;
  status: string;
}

export interface PasswordCard {
  type: "próxima" | "última";
  password: string;
  patientName: string;
}

