import type { PriorityLevel } from "../constants/priority";
import type { TicketDTO } from "./ticket";

export type Call = TicketDTO;

export interface RoomStatus {
  priority: PriorityLevel;
  status: string;
}

export interface PasswordCard {
  type: "próxima" | "última";
  password: string;
  patientName: string;
}

