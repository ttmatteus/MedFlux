import React, { createContext, useContext, useState } from 'react';
import type { TicketDTO } from '../types/ticket';
import { PriorityResult } from '../utils/triageLogic';

export interface TriageFormData {
  nomeCompleto: string;
  dia: string;
  mes: string;
  ano: string;
  pressao: string;
  bpm: string;
  temperatura: string;
  queixaPrincipal: string;
  descricaoSintomas: string;
  sintomas: {
    dorIntensa: boolean;
    febreAlta: boolean;
    dorLeve: boolean;
    queixasLeves: boolean;
  };
}

export interface TriageSnapshot {
  formData: TriageFormData;
  priority: PriorityResult;
  timestamp: Date;
  ticket?: TicketDTO;
}

interface TriageContextValue {
  latestSnapshot: TriageSnapshot | null;
  setLatestSnapshot: (snapshot: TriageSnapshot | null) => void;
}

const TriageContext = createContext<TriageContextValue | undefined>(undefined);

export const useTriageContext = (): TriageContextValue => {
  const ctx = useContext(TriageContext);
  if (!ctx) {
    throw new Error('useTriageContext must be used within TriageProvider');
  }
  return ctx;
};

export const TriageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [latestSnapshot, setLatestSnapshot] = useState<TriageSnapshot | null>(null);

  return (
    <TriageContext.Provider value={{ latestSnapshot, setLatestSnapshot }}>
      {children}
    </TriageContext.Provider>
  );
};

